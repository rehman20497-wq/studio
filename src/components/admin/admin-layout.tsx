'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, Upload, Settings, LogOut } from 'lucide-react';
import AdminPanel from './admin-panel';

const sidebarVariants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const navItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const navContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.5
        }
    }
}

const NavLink = ({ href, icon: Icon, children }: { href: string; icon: React.ElementType; children: React.ReactNode }) => {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.a
            href={href}
            onClick={(e) => {
                e.preventDefault();
                scrollToSection(href.substring(1));
            }}
            variants={navItemVariants}
            className="flex items-center gap-3 px-4 py-3 text-zinc-300 hover:bg-zinc-700/50 hover:text-white rounded-lg transition-colors duration-200"
            whileHover={{ x: 5 }}
        >
            <Icon className="w-5 h-5" />
            <span>{children}</span>
        </motion.a>
    )
};

export default function AdminLayout({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="flex min-h-screen">
      <motion.aside
        className="w-64 bg-zinc-800 text-white p-6 flex flex-col fixed h-full"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-2xl font-bold font-headline mb-12">Admin</div>
        <motion.nav 
            className="flex-grow space-y-4"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
        >
          <NavLink href="#dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
          <NavLink href="#upload-provider" icon={Upload}>Upload Provider</NavLink>
          <NavLink href="#upload-blog" icon={Upload}>Upload Blog</NavLink>
          <NavLink href="#manage-providers" icon={Settings}>Manage</NavLink>
        </motion.nav>
        <motion.button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 text-zinc-300 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors duration-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.2 } }}
          whileHover={{ x: 5 }}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>
      </motion.aside>

      <main className="flex-1 ml-64 bg-[#FEF9F2] overflow-y-auto">
        <AdminPanel />
      </main>
    </div>
  );
}
