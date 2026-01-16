
'use client';

import { useState, useEffect, useCallback, useRef, type ReactNode, createContext, useContext } from 'react';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import AdminLayout from '@/components/admin/admin-layout';
import LoginScreen from '@/components/admin/login-screen';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeScreen from '@/components/admin/welcome-screen';
import { signOut } from 'firebase/auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { ShieldAlert } from 'lucide-react';
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

type AdminPageWrapperProps = {
    children: ReactNode;
    screenTitle: string;
    isLoading?: boolean;
};

// --- Start: Define Context and User types here for use across the admin panel ---
type Role = {
    id: string;
    name: string;
    permissions: { [key: string]: { [key: string]: boolean } };
};
type User = {
    id: string;
    name: string;
    roleId: string;
    passkey: string;
};
export type AdminUserSession = {
    user: User;
    role: Role;
};
interface AdminUserContextType {
    session: AdminUserSession | null;
    hasPermission: (pageId: string, permission: 'view' | 'create' | 'edit' | 'delete') => boolean;
}
const AdminUserContext = createContext<AdminUserContextType | undefined>(undefined);

export const useAdminUser = () => {
    const context = useContext(AdminUserContext);
    if (context === undefined) {
        throw new Error('useAdminUser must be used within an AdminPageWrapper');
    }
    return context;
};

const AccessDenied = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-8">
        <ShieldAlert className="w-24 h-24 text-red-500 mb-4" />
        <h1 className="text-4xl font-bold font-headline text-zinc-800">Access Denied</h1>
        <p className="text-zinc-600 mt-2 text-lg">You do not have permission to view this page.</p>
        <p className="text-zinc-500 mt-1 text-sm">Please contact your administrator if you believe this is an error.</p>
    </div>
);

export const PermissionGuard = ({ pageId, children }: { pageId: string, children: React.ReactNode }) => {
    const { hasPermission } = useAdminUser();

    if (!hasPermission(pageId, 'view')) {
        return <AccessDenied />;
    }

    return <>{children}</>;
};

// --- End: Context and Guard ---


export default function AdminPageWrapper({ children, screenTitle, isLoading = false }: AdminPageWrapperProps) {
  const { user: firebaseUser, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const isMobile = useIsMobile();
  const [session, setSession] = useState<AdminUserSession | null>(null);

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const hasPermission = useCallback((pageId: string, permission: 'view' | 'create' | 'edit' | 'delete'): boolean => {
    if (!session) return false;
    // Super Admins have all permissions
    if (session.role.name === 'Super Admin') return true;
    return session.role.permissions?.[pageId]?.[permission] || false;
  }, [session]);
  
  const handleLogout = useCallback(() => {
    if (auth && auth.currentUser && firestore) {
      // Delete the session document on logout
      const sessionRef = doc(firestore, 'admin_sessions', auth.currentUser.uid);
      deleteDoc(sessionRef).catch(console.error); // fire-and-forget deletion
    }
    if (auth) {
      signOut(auth);
    }
    setSession(null);
  }, [auth, firestore]);

  const handleAuthentication = useCallback((loggedInSession: AdminUserSession) => {
    if (auth) {
      initiateAnonymousSignIn(auth); 
      setSession(loggedInSession);
    }
  }, [auth]);

  // Effect to sync custom session with Firestore session doc for security rules
  useEffect(() => {
    if (firebaseUser && session && firestore) {
      const sessionRef = doc(firestore, 'admin_sessions', firebaseUser.uid);
      setDoc(sessionRef, {
        roleId: session.user.roleId,
        userId: session.user.id,
        createdAt: serverTimestamp(),
      });
    }
  }, [firebaseUser, session, firestore]);


  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    if (session) { // Use our custom session to track inactivity
      inactivityTimerRef.current = setTimeout(() => {
        handleLogout();
      }, INACTIVITY_TIMEOUT);
    }
  }, [session, handleLogout]);

  // Attach inactivity listeners
  useEffect(() => {
    if (!session) return;

    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetInactivityTimer));
    resetInactivityTimer();

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
       events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
    };
  }, [session, resetInactivityTimer]);

  if (isUserLoading || isMobile === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FEF9F2]">
        <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500"></div>
            <p className="text-lg text-zinc-600">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }
  
  const isAuthenticated = firebaseUser && session;

  return (
    <AdminUserContext.Provider value={{ session, hasPermission }}>
        <div className="bg-[#FEF9F2] min-h-screen overflow-x-hidden">
            <AnimatePresence mode="wait">
            {!isAuthenticated ? (
                <motion.div
                key="login"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                >
                <LoginScreen onAuthenticated={handleAuthentication} />
                </motion.div>
            ) : (
                <AdminLayout onLogout={handleLogout}>
                    {isLoading ? (
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center min-h-screen"
                            >
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500"></div>
                                <p className="text-lg text-zinc-600">{screenTitle}...</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="panel"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    )}
                </AdminLayout>
            )}
            </AnimatePresence>
        </div>
    </AdminUserContext.Provider>
  );
}
