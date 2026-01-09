
'use client';

import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { useAuth, useUser } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import AdminLayout from '@/components/admin/admin-layout';
import LoginScreen from '@/components/admin/login-screen';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeScreen from '@/components/admin/welcome-screen';
import { signOut } from 'firebase/auth';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

type AdminPageWrapperProps = {
    children: ReactNode;
    screenTitle: string;
    isLoading?: boolean;
};

export default function AdminPageWrapper({ children, screenTitle, isLoading = false }: AdminPageWrapperProps) {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const welcomeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogout = useCallback(() => {
    if (auth) {
      signOut(auth);
    }
  }, [auth]);

  const handleAuthentication = useCallback(() => {
    if (auth) {
      initiateAnonymousSignIn(auth);
    }
  }, [auth]);

  // Show welcome screen ONCE when user logs in or page loads while logged in
  useEffect(() => {
    if (user && !isLoading) {
      setShowWelcome(true);

      if (welcomeTimerRef.current) {
        clearTimeout(welcomeTimerRef.current);
      }

      welcomeTimerRef.current = setTimeout(() => {
        setShowWelcome(false);
      }, 4000); // Welcome screen duration
    } else {
        // If user logs out or is loading, don't show welcome
        setShowWelcome(false);
    }

    return () => {
      if (welcomeTimerRef.current) {
        clearTimeout(welcomeTimerRef.current);
      }
    };
  }, [user, isLoading]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    if (user) {
      inactivityTimerRef.current = setTimeout(() => {
        handleLogout();
      }, INACTIVITY_TIMEOUT);
    }
  }, [user, handleLogout]);

  // Attach inactivity listeners
  useEffect(() => {
    if (!user) return;

    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetInactivityTimer));
    resetInactivityTimer();

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
       events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
    };
  }, [user, resetInactivityTimer]);

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FEF9F2]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FEF9F2] min-h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          {!user ? (
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
                {showWelcome || isLoading ? (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        >
                        <WelcomeScreen name={screenTitle} />
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
  );
}
