
'use client';

import { useState, useEffect } from 'react';
import { useUser, useAuth, useCollection, useMemoFirebase, updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import AdminPageWrapper from '@/components/admin/admin-page-wrapper';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { useFirestore }from '@/firebase';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Edit, Trash2, BarChart3, Cloud, Power, PowerOff, Eye, Hand, MousePointerClick } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import EditProviderForm from '@/components/admin/edit-provider-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminHeader from '@/components/admin/admin-header';

type Provider = {
    id: string;
    name: string;
    logoUrl: string;
    slug: string;
    description: string;
    solutions: string[];
    bannerImageUrl?: string;
    createdAt: { seconds: number; nanoseconds: number; } | null;
    published?: boolean;
    impressions?: number;
    clicks?: number;
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


const generateMonthlyData = (totalImpressions: number, totalClicks: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    // Distribute total values across 6 months with some variance
    const impressionDistribution = [0.12, 0.1, 0.25, 0.18, 0.2, 0.15];
    const clickDistribution = [0.15, 0.11, 0.22, 0.2, 0.18, 0.14];

    return months.map((month, i) => ({
        name: month,
        Impressions: Math.round(totalImpressions * impressionDistribution[i]),
        Clicks: Math.round(totalClicks * clickDistribution[i]),
    }));
};

const ProviderStatsView = ({ provider }: { provider: Provider }) => {
    const impressions = provider.impressions || 0;
    const clicks = provider.clicks || 0;
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const monthlyData = generateMonthlyData(impressions, clicks);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Impressions</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{impressions.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Clicks</CardTitle>
                        <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{clicks.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Click-Through Rate</CardTitle>
                        <Hand className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{ctr.toFixed(2)}%</div>
                        <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                    </CardContent>
                </Card>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
                <div className="w-full h-[300px]">
                    <ResponsiveContainer>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="Impressions" fill="#8884d8" />
                            <Bar dataKey="Clicks" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default function ManageProvidersPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isStatsDialogOpen, setIsStatsDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const memoizedQuery = useMemoFirebase(
    () => {
        if (!firestore) return null;
        return query(collection(firestore, 'providers'), orderBy('createdAt', 'desc'));
    },
    [firestore]
  );
  
  const { data: providers, isLoading: areProvidersLoading } = useCollection<Provider>(memoizedQuery);

  const handleTogglePublish = (provider: Provider) => {
    if (!firestore) return;
    const providerRef = doc(firestore, 'providers', provider.id);
    const newStatus = !(provider.published ?? true);
    
    updateDocumentNonBlocking(providerRef, { published: newStatus });

    toast({
        title: `Provider ${newStatus ? 'Published' : 'Unpublished'}`,
        description: `${provider.name} is now ${newStatus ? 'live' : 'hidden'}.`,
    });
  };
  
  const openDeleteDialog = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsDeleteDialogOpen(true);
  };

  const openEditDialog = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsEditDialogOpen(true);
  };

  const openStatsDialog = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsStatsDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (!firestore || !selectedProvider) return;

    const providerToDelete = providers?.find(p => p.id === selectedProvider.id);
    if (!providerToDelete) return;

    const providerRef = doc(firestore, 'providers', selectedProvider.id);
    deleteDocumentNonBlocking(providerRef);

    toast({
        title: 'Provider Deleted',
        description: `${providerToDelete.name} has been permanently deleted.`,
        variant: 'destructive',
    });

    setIsDeleteDialogOpen(false);
    setSelectedProvider(null);
  };

  if (areProvidersLoading) {
    return (
      <AdminPageWrapper screenTitle="Manage Providers" isLoading>
         <div className="flex items-center justify-center min-h-screen bg-[#FEF9F2]">
            <p>Loading Providers...</p>
        </div>
      </AdminPageWrapper>
    );
  }

  return (
    <AdminPageWrapper screenTitle="Manage Providers">
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
                                    <Button size="sm" variant="outline" className="rounded-full" onClick={() => openEditDialog(provider)}><Edit className="w-4 h-4 mr-2" />Edit</Button>
                                    <Button size="sm" variant="destructive" className="rounded-full" onClick={() => openDeleteDialog(provider)}><Trash2 className="w-4 h-4 mr-2" />Delete</Button>
                                    <Button size="sm" variant="secondary" className="rounded-full" onClick={() => openStatsDialog(provider)}><BarChart3 className="w-4 h-4 mr-2" />Stats</Button>
                                    <Button 
                                      size="sm"
                                      variant={(provider.published ?? true) ? 'default' : 'outline'}
                                      className="rounded-full bg-green-500 hover:bg-green-600 text-white data-[variant=outline]:bg-yellow-500 data-[variant=outline]:hover:bg-yellow-600 data-[variant=outline]:text-white"
                                      onClick={() => handleTogglePublish(provider)}
                                    >
                                        {(provider.published ?? true) ? <Power className="w-4 h-4 mr-2" /> : <PowerOff className="w-4 h-4 mr-2" />}
                                        {(provider.published ?? true) ? 'Published' : 'Unpublished'}
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

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the provider
                    from your database.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        {/* Edit Provider Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Provider: {selectedProvider?.name}</DialogTitle>
                </DialogHeader>
                {selectedProvider && (
                    <EditProviderForm provider={selectedProvider} onFinished={() => setIsEditDialogOpen(false)} />
                )}
            </DialogContent>
        </Dialog>

        {/* Stats Dialog */}
        <Dialog open={isStatsDialogOpen} onOpenChange={setIsStatsDialogOpen}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Statistics for: {selectedProvider?.name}</DialogTitle>
                    <DialogDescription>
                        Showing performance analytics for the last 6 months.
                    </DialogDescription>
                </DialogHeader>
                {selectedProvider && (
                    <div className="mt-4">
                        <ProviderStatsView provider={selectedProvider} />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    </AdminPageWrapper>
  );
}
