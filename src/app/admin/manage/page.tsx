'use client';

import { useState, useEffect } from 'react';
import { useUser, useAuth, useCollection, useMemoFirebase } from '@/firebase';
import AdminHeader from '@/components/admin/admin-header';
import AdminLayout from '@/components/admin/admin-layout';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore }from '@/firebase';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, BarChart3, Cloud, Eye, GitBranch, Clock, PowerOff, Power } from 'lucide-react';
import { format } from 'date-fns';

type Provider = {
    id: string;
    name: string;
    logoUrl: string;
    createdAt: { seconds: number; nanoseconds: number; } | null;
    published?: boolean;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 80,
    },
  },
};


export default function ManageProvidersPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  const memoizedQuery = useMemoFirebase(
    () => {
        if (!firestore) return null;
        return query(collection(firestore, 'providers'), orderBy('createdAt', 'desc'));
    },
    [firestore]
  );
  
  const { data: providers, isLoading: areProvidersLoading } = useCollection<Provider>(memoizedQuery);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = () => {
    if (auth) {
      signOut(auth);
    }
  };

  if (isUserLoading || !user || areProvidersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FEF9F2]">
        <p>Loading Providers...</p>
      </div>
    );
  }

  return (
    <AdminLayout onLogout={handleLogout}>
      <div className="p-4 sm:p-8 md:p-12">
        <AdminHeader userName="Faizan" />
        <div className="mt-12">
            <AnimatePresence>
                 <motion.div
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {providers && providers.map(provider => (
                        <motion.div
                            key={provider.id}
                            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-zinc-200/50 overflow-hidden p-6"
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="relative w-48 h-24 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-100 flex-shrink-0">
                                    <Image src={provider.logoUrl} alt={`${provider.name} logo`} fill className="object-contain p-2" />
                                </div>
                                <div className="flex-grow text-center sm:text-left">
                                    <h3 className="text-2xl font-bold font-headline text-zinc-800">{provider.name}</h3>
                                    {provider.createdAt && (
                                        <p className="text-sm text-zinc-500 mt-1">
                                            Published on: {format(new Date(provider.createdAt.seconds * 1000), 'MMMM d, yyyy')}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 flex-wrap justify-center">
                                    <Button size="sm" variant="outline" className="rounded-full"><Edit className="w-4 h-4 mr-2" />Edit</Button>
                                    <Button size="sm" variant="destructive" className="rounded-full"><Trash2 className="w-4 h-4 mr-2" />Delete</Button>
                                    <Button size="sm" variant="secondary" className="rounded-full"><BarChart3 className="w-4 h-4 mr-2" />Stats</Button>
                                    <Button size="sm" variant={provider.published === false ? 'outline' : 'default'} className="rounded-full bg-green-500 hover:bg-green-600 text-white">
                                        {provider.published === false ? <PowerOff className="w-4 h-4 mr-2" /> : <Power className="w-4 h-4 mr-2" />}
                                        {provider.published === false ? 'Unpublished' : 'Published'}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
            {providers && providers.length === 0 && (
                <div className="text-center py-20">
                    <Cloud className="mx-auto h-16 w-16 text-zinc-400" />
                    <h3 className="mt-4 text-xl font-semibold text-zinc-800">No Providers Found</h3>
                    <p className="mt-2 text-zinc-500">Get started by uploading your first provider.</p>
                </div>
            )}
        </div>
      </div>
    </AdminLayout>
  );
}
