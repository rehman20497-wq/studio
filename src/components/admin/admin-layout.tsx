
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Upload, Settings, LogOut, FileText, BookOpen, Bug, X, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';


const sidebarVariants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: {
        duration: 0.4,
        ease: [0.5, 0, 0.25, 0],
    }
  }
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
            delayChildren: 0.3
        }
    }
}

const NavLink = ({ href, icon: Icon, children, onClick }: { href: string; icon: React.ElementType; children: React.ReactNode, onClick?: () => void }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <motion.div variants={navItemVariants}>
            <Link
                href={href}
                onClick={onClick}
                className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200",
                    isActive 
                        ? "bg-zinc-700 text-white" 
                        : "text-zinc-300 hover:bg-zinc-700/50 hover:text-white"
                )}
            >
                <Icon className="w-5 h-5" />
                <span>{children}</span>
            </Link>
        </motion.div>
    )
};

const SidebarContent = ({ onLogout, onLinkClick }: { onLogout: () => void; onLinkClick: () => void; }) => (
    <>
        <div className="text-2xl font-bold font-headline mb-12">Admin Panel</div>
        <motion.nav 
            className="flex-grow space-y-4"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
        >
          <NavLink href="/admin" icon={LayoutDashboard} onClick={onLinkClick}>Dashboard</NavLink>
          <NavLink href="/admin/upload" icon={Upload} onClick={onLinkClick}>Upload Provider</NavLink>
          <NavLink href="/admin/manage" icon={Settings} onClick={onLinkClick}>Manage Providers</NavLink>
          <NavLink href="/admin/upload-blog" icon={BookOpen} onClick={onLinkClick}>Upload Blog</NavLink>
          <NavLink href="/admin/manage-blogs" icon={FileText} onClick={onLinkClick}>Manage Blogs</NavLink>
          <NavLink href="/admin/debug" icon={Bug} onClick={onLinkClick}>Debug</NavLink>
        </motion.nav>
        <motion.button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 text-zinc-300 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors duration-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1 } }}
          whileHover={{ x: 5 }}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>
    </>
);


export default function AdminLayout({ 
    children,
    onLogout 
}: { 
    children: React.ReactNode;
    onLogout: () => void;
}) {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isMobile === undefined) {
      return null;
  }

  return (
    <div className="flex min-h-screen">
      {isMobile ? (
          <>
            <motion.button
                onClick={() => setIsSidebarOpen(true)}
                className="fixed top-4 left-4 z-50 p-2 bg-zinc-800 text-white rounded-full shadow-lg"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Menu className="w-6 h-6" />
            </motion.button>

            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div 
                            className="fixed inset-0 bg-black/60 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                        />
                        <motion.aside
                            className="w-64 bg-zinc-800 text-white p-6 flex flex-col fixed h-full z-50"
                            variants={sidebarVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                           <SidebarContent onLogout={onLogout} onLinkClick={() => setIsSidebarOpen(false)} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
            <main className="flex-1 bg-[#FEF9F2] overflow-y-auto">
                {children}
            </main>
          </>
      ) : (
        <>
            <motion.aside
                className="w-64 bg-zinc-800 text-white p-6 flex flex-col fixed h-full"
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
            >
                <SidebarContent onLogout={onLogout} onLinkClick={() => {}} />
            </motion.aside>

            <main className="flex-1 ml-64 bg-[#FEF9F2] overflow-y-auto">
                {children}
            </main>
        </>
      )}
    </div>
  );
}
