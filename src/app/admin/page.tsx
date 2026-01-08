'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import LoginScreen from '@/components/admin/login-screen';
import { AnimatePresence, motion } from 'framer-motion';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let inactivityTimer: NodeJS.Timeout;

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

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
    <div className="bg-[#FEF9F2] min-h-screen">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <LoginScreen onAuthenticated={() => setIsAuthenticated(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <AdminLayout onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
