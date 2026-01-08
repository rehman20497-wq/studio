
'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import LoginScreen from '@/components/admin/login-screen';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeScreen from '@/components/admin/welcome-screen';
import AdminPanel from '@/components/admin/admin-panel';
import AdminHeader from '@/components/admin/admin-header';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  let inactivityTimer: NodeJS.Timeout;

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    setShowWelcome(true);
    setTimeout(() => {
      setShowWelcome(false);
    }, 4000); // Show welcome screen for 4 seconds
  };

  const resetInactivityTimer = useCallback(() => {
    clearTimeout(inactivityTimer);
    if (isAuthenticated) {
      inactivityTimer = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
    }
  }, [isAuthenticated, handleLogout]);

  useEffect(() => {
    if (isAuthenticated) {
      window.addEventListener('mousemove', resetInactivityTimer);
      window.addEventListener('keydown', resetInactivityTimer);
      resetInactivityTimer();
    }

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
    };
  }, [isAuthenticated, resetInactivityTimer]);


  return (
    <div className="bg-[#FEF9F2] min-h-screen overflow-hidden">
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
