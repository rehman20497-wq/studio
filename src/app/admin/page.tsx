'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth, useUser } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import AdminLayout from '@/components/admin/admin-layout';
import LoginScreen from '@/components/admin/login-screen';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeScreen from '@/components/admin/welcome-screen';
import AdminPanel from '@/components/admin/admin-panel';
import AdminHeader from '@/components/admin/admin-header';
import { signOut } from 'firebase/auth';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export default function AdminDashboardPage() {
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

  // Show welcome screen ONCE when user logs in
  useEffect(() => {
    if (user) {
      setShowWelcome(true);

      if (welcomeTimerRef.current) {
        clearTimeout(welcomeTimerRef.current);
      }

      welcomeTimerRef.current = setTimeout(() => {
        setShowWelcome(false);
      }, 4000);
    }

    return () => {
      if (welcomeTimerRef.current) {
        clearTimeout(welcomeTimerRef.current);
      }
    };
  }, [user]);

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

    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    window.addEventListener('click', resetInactivityTimer);
    window.addEventListener('scroll', resetInactivityTimer);

    resetInactivityTimer();

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
      window.removeEventListener('click', resetInactivityTimer);
      window.removeEventListener('scroll', resetInactivityTimer);
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
        ) : showWelcome ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WelcomeScreen name="Faizan" />
          </motion.div>
        ) : (
          <motion.div
            key="panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <AdminLayout onLogout={handleLogout}>
              <div className="p-4 sm:p-8 md:p-12">
                <AdminHeader userName="Faizan" />
                <div className="mt-12">
                  <AdminPanel />
                </div>
              </div>
            </AdminLayout>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
