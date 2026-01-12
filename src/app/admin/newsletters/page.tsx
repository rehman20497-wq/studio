
'use client';

import { useState } from 'react';
import AdminPageWrapper from '@/components/admin/admin-page-wrapper';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { format } from 'date-fns';
import { Newspaper, Search, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import AdminHeader from '@/components/admin/admin-header';
import { Button } from '@/components/ui/button';
import ComposeNewsletterDialog from '@/components/admin/compose-newsletter-dialog';

type Subscriber = {
  id: string;
  email: string;
  createdAt: { seconds: number };
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export default function NewslettersPage() {
  const firestore = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const memoizedQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'newsletter_subscribers'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: subscribers, isLoading, error } = useCollection<Subscriber>(memoizedQuery);

  const filteredSubscribers = subscribers?.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <AdminPageWrapper screenTitle="Loading Subscribers..." isLoading>
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      </AdminPageWrapper>
    );
  }

  if (error) {
    return (
        <AdminPageWrapper screenTitle="Error">
            <div className="p-8">
                <AdminHeader userName="Admin" />
                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold text-red-600">Failed to Load Subscribers</h2>
                    <p className="text-zinc-600 mt-2">There was a permission error while fetching the data.</p>
                    <pre className="mt-4 text-left bg-zinc-100 p-4 rounded-md overflow-x-auto text-sm">
                        <code>{error.message}</code>
                    </pre>
                </div>
            </div>
        </AdminPageWrapper>
    )
}

  return (
    <AdminPageWrapper screenTitle="Newsletter Subscribers">
      <div className="p-4 sm:p-8 md:p-12">
        <AdminHeader userName="Faizan" />
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold font-headline text-zinc-900">Subscribers</h1>
              <p className="text-zinc-500">A list of all the users who have subscribed to your newsletter.</p>
            </div>
            <div className='flex gap-4 w-full sm:w-auto'>
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <Input
                        placeholder="Search by email..."
                        className="pl-12 h-12 text-base rounded-full bg-white border-2 border-zinc-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button 
                  size="lg" 
                  className="rounded-full h-12 bg-zinc-800 hover:bg-zinc-700"
                  onClick={() => setIsComposeOpen(true)}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Compose
                </Button>
            </div>
          </div>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredSubscribers && filteredSubscribers.length > 0 ? (
              filteredSubscribers.map((sub, index) => (
                <motion.div
                  key={sub.id}
                  variants={itemVariants}
                  className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-lg border border-zinc-200/60 flex justify-between items-center"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Newspaper className="w-6 h-6 text-blue-600"/>
                        </div>
                        <div>
                            <p className="font-semibold text-lg text-zinc-800">{sub.email}</p>
                            <p className="text-sm text-zinc-500">
                                Subscribed on: {format(new Date(sub.createdAt.seconds * 1000), 'MMMM d, yyyy')}
                            </p>
                        </div>
                    </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-zinc-800">No subscribers found</h3>
                <p className="mt-2 text-zinc-500">Your subscriber list will appear here.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <ComposeNewsletterDialog isOpen={isComposeOpen} onOpenChange={setIsComposeOpen} />
    </AdminPageWrapper>
  );
}
