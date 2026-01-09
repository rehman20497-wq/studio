'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, Upload, Settings, LogOut, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';


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
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <motion.div variants={navItemVariants}>
            <Link
                href={href}
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

export default function AdminLayout({ 
    children,
    onLogout 
}: { 
    children: React.ReactNode;
    onLogout: () => void;
}) {
  return (
    <div className="flex min-h-screen">
      <motion.aside
        className="w-64 bg-zinc-800 text-white p-6 flex flex-col fixed h-full"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-2xl font-bold font-headline mb-12">Admin Panel</div>
        <motion.nav 
            className="flex-grow space-y-4"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
        >
          <NavLink href="/admin" icon={LayoutDashboard}>Dashboard</NavLink>
          <NavLink href="/admin/upload" icon={Upload}>Upload Provider</NavLink>
          <NavLink href="#" icon={FileText}>Upload Blog</NavLink>
          <NavLink href="/admin/manage" icon={Settings}>Manage Providers</NavLink>
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
        {children}
      </main>
    </div>
  );
}
