
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { useCollection, useFirestore, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import type { AdminUserSession } from '@/components/admin/admin-page-wrapper';

type User = AdminUserSession['user'];
type Role = AdminUserSession['role'];


const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};


export default function LoginScreen({ onAuthenticated }: { onAuthenticated: (session: AdminUserSession) => void }) {
  const [passkey, setPasskey] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const firestore = useFirestore();
  const usersQuery = useMemoFirebase(() => firestore ? collection(firestore, 'admin_users') : null, [firestore]);
  const { data: users, isLoading: usersLoading, error: usersError } = useCollection<User>(usersQuery);
  const rolesQuery = useMemoFirebase(() => firestore ? collection(firestore, 'admin_roles') : null, [firestore]);
  const { data: roles, isLoading: rolesLoading, error: rolesError } = useCollection<Role>(rolesQuery);
  
  const hasSeededRoles = useRef(false);
  const hasSeededUsers = useRef(false);

  useEffect(() => {
    if (!firestore || rolesLoading || roles === null || hasSeededRoles.current) return;
    if (roles.length === 0) {
        hasSeededRoles.current = true;

        const pages = [
            { id: 'dashboard', name: 'Dashboard' },
            { id: 'upload-provider', name: 'Upload Provider' },
            { id: 'manage-providers', name: 'Manage Providers' },
            { id: 'upload-blog', name: 'Upload Blog' },
            { id: 'manage-blogs', name: 'Manage Blogs' },
            { id: 'newsletters', name: 'Newsletters' },
            { id: 'debug', name: 'Debug' },
            { id: 'manage-users', name: 'Manage Users' },
        ];
        
        const allPermissions = pages.reduce((acc, page) => {
            acc[page.id] = { view: true, create: true, edit: true, delete: true };
            return acc;
        }, {} as Role['permissions']);
      
        const initialRoles: Omit<Role, 'id'>[] = [
            { name: 'Super Admin', permissions: allPermissions },
            { name: 'Editor', permissions: { 'manage-blogs': { view: true, edit: true, create: true }, 'upload-blog': { view: true, create: true } } },
            { name: 'Moderator', permissions: { 'manage-providers': { view: true, edit: true } } },
            { name: 'Content Writer', permissions: { 'upload-blog': { view: true, create: true } } },
        ];
        
        const rolesCollection = collection(firestore, 'admin_roles');
        initialRoles.forEach(role => addDocumentNonBlocking(rolesCollection, role));
        toast({ title: 'Seeding Roles', description: 'Initial admin roles are being created.' });
    }
  }, [firestore, roles, rolesLoading, toast]);

  useEffect(() => {
    if (!firestore || usersLoading || users === null || rolesLoading || roles === null || hasSeededUsers.current) return;
    
    const superAdminRole = roles.find(r => r.name === 'Super Admin');
    if (users.length === 0 && superAdminRole) {
        hasSeededUsers.current = true;
        const adminUser = {
            name: 'Faizan',
            roleId: superAdminRole.id,
            passkey: 'F@izan&1122'
        };
        addDocumentNonBlocking(collection(firestore, 'admin_users'), adminUser);
        toast({ title: 'Seeding Admin', description: 'Default admin user "Faizan" has been created.' });
    }
  }, [firestore, users, usersLoading, roles, rolesLoading, toast]);


  const isLoading = usersLoading || rolesLoading;
  
  const handleLogin = () => {
    if (isLoading || isChecking || !users || !roles) return;
    
    setIsChecking(true);

    if (passkey === 'F@izan&1122') {
        const superAdminRole = roles.find(r => r.name === 'Super Admin');
        if (superAdminRole) {
            const adminUser: User = {
                id: users.find(u => u.name === 'Faizan')?.id || 'super-admin-faizan', // A static ID for this special user
                name: 'Faizan',
                roleId: superAdminRole.id,
                passkey: 'F@izan&1122'
            };
            onAuthenticated({ user: adminUser, role: superAdminRole });
        } else {
            toast({ title: 'Login Error', description: 'Super Admin role not found. Please wait a moment for roles to seed and try again.', variant: 'destructive' });
            setIsChecking(false);
        }
        return;
    }
    
    const matchedUser = users.find(u => u.passkey === passkey);

    if (matchedUser) {
      const matchedRole = roles.find(r => r.id === matchedUser.roleId);
      if (matchedRole) {
        onAuthenticated({ user: matchedUser, role: matchedRole });
      } else {
        toast({ title: 'Login Error', description: `User '${matchedUser.name}' has an invalid role assigned.`, variant: 'destructive' });
        setIsChecking(false);
      }
    } else {
      toast({ title: 'Login Failed', description: 'The passkey you entered is incorrect.', variant: 'destructive' });
      setIsChecking(false);
    }
  };
  
  if (usersError || rolesError) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-700 p-4">
              <div>
                <h2 className="text-xl font-bold">Database Connection Error</h2>
                <p>Could not fetch user data. Please check your Firestore permissions.</p>
                <pre className="mt-4 text-xs bg-red-100 p-2 rounded">{(usersError || rolesError)?.message}</pre>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEF9F2] px-4">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border-2 border-yellow-200/50"
          variants={itemVariants}
        >
          <div className="text-center">
            <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-3xl font-bold font-headline text-zinc-900">
              Admin Access
            </h1>
            <p className="mt-2 text-zinc-600">
              Please enter the passkey to proceed.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="relative">
              <Input
                type="password"
                placeholder="Enter Passkey"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleLogin()}}
                className={'h-12 text-lg text-center tracking-widest'}
              />
            </div>

            <motion.button
              onClick={handleLogin}
              className={cn(
                'w-full py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-yellow-300 flex items-center justify-center',
                'bg-zinc-900 text-white hover:bg-zinc-800',
                (isLoading || isChecking) && 'cursor-not-allowed bg-zinc-400'
              )}
              disabled={isLoading || isChecking}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? 'Loading...' : isChecking ? <Loader2 className="w-6 h-6 animate-spin"/> : 'Login'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
