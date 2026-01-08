'use client';

import { useState } from 'react';
import AdminPanel from '@/components/admin/admin-panel';
import LoginScreen from '@/components/admin/login-screen';
import { AnimatePresence, motion } from 'framer-motion';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="bg-[#FEF9F2] min-h-screen">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <LoginScreen onAuthenticated={() => setIsAuthenticated(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <AdminPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
