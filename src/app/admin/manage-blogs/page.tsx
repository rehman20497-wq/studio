
'use client';

import { useState } from 'react';
import AdminPageWrapper from '@/components/admin/admin-page-wrapper';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, BarChart3, Power, PowerOff, Eye, PlusCircle, LayoutGrid, List } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import { useCollection, useFirestore, useMemoFirebase, updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

type BlogPost = {
  id: string;
  title: string;
  authorName: string;
  category: string;
  published: boolean;
  createdAt: { seconds: number; nanoseconds: number; };
  featuredImageUrl: string;
  views: number;
  comments: number;
  shares: number;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export default function ManageBlogsPage() {
    const { toast } = useToast();
    const firestore = useFirestore();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    const memoizedQuery = useMemoFirebase(
      () => {
          if (!firestore) return null;
          return query(collection(firestore, 'blog_posts'), orderBy('createdAt', 'desc'));
      },
      [firestore]
    );

    const { data: posts, isLoading } = useCollection<BlogPost>(memoizedQuery);

    const togglePublish = (post: BlogPost) => {
        if (!firestore) return;
        const postRef = doc(firestore, 'blog_posts', post.id);
        const newStatus = !post.published;
        
        updateDocumentNonBlocking(postRef, { published: newStatus });

        toast({
            title: `Post ${newStatus ? 'Published' : 'Unpublished'}`,
            description: `"${post.title}" is now ${newStatus ? 'live' : 'a draft'}.`,
        });
    };

    const openDeleteDialog = (post: BlogPost) => {
      setSelectedPost(post);
      setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!firestore || !selectedPost) return;

        const postRef = doc(firestore, 'blog_posts', selectedPost.id);
        deleteDocumentNonBlocking(postRef);

        toast({
            title: 'Post Deleted',
            description: `"${selectedPost.title}" has been permanently deleted.`,
            variant: 'destructive',
        });

        setIsDeleteDialogOpen(false);
        setSelectedPost(null);
    };

    if (isLoading) {
        return (
            <AdminPageWrapper screenTitle="Manage Blogs" isLoading>
                <div className="flex items-center justify-center h-screen">
                    <p>Loading blog posts...</p>
                </div>
            </AdminPageWrapper>
        );
    }

  return (
    <AdminPageWrapper screenTitle="Manage Blogs">
      <div className="p-4 sm:p-8 md:p-12">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline text-zinc-900">Blog Posts</h1>
                <p className="text-zinc-500">Edit, publish, and analyze your content.</p>
            </div>
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-zinc-200' : ''}>
                    <List className="w-5 h-5"/>
                </Button>
                <Button variant="outline" size="icon" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-zinc-200' : ''}>
                    <LayoutGrid className="w-5 h-5"/>
                </Button>
                <Button className="rounded-full bg-zinc-800 text-white hover:bg-zinc-700">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    New Post
                </Button>
            </div>
        </div>

        <AnimatePresence>
            <motion.div
                key={viewMode}
                className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
            >
                {posts && posts.map(post => (
                    <motion.div
                        key={post.id}
                        variants={itemVariants}
                        layout
                        className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-zinc-200/50 overflow-hidden"
                    >
                        <div className="relative h-48">
                            <Image src={post.featuredImageUrl} alt={post.title} fill className="object-cover" />
                             <div className="absolute top-2 right-2 px-3 py-1 text-xs font-bold text-white bg-black/50 rounded-full">{post.category}</div>
                        </div>
                        <div className="p-5">
                            <h3 className="text-xl font-bold font-headline text-zinc-800 truncate">{post.title}</h3>
                            <p className="text-sm text-zinc-500 mt-1">by {post.authorName} on {format(new Date(post.createdAt.seconds * 1000), 'MMMM d, yyyy')}</p>
                            
                            <div className="flex justify-between items-center mt-4 text-sm text-zinc-600">
                                <div className="flex items-center gap-1"><Eye className="w-4 h-4"/> {post.views.toLocaleString()}</div>
                            </div>
                            
                            <div className="flex items-center gap-2 mt-6 flex-wrap">
                                <Button size="sm" variant="outline" className="rounded-full"><Edit className="w-4 h-4 mr-2" />Edit</Button>
                                <Button size="sm" variant="destructive" className="rounded-full" onClick={() => openDeleteDialog(post)}><Trash2 className="w-4 h-4 mr-2" />Delete</Button>
                                <Button size="sm" variant="secondary" className="rounded-full"><BarChart3 className="w-4 h-4 mr-2" />Stats</Button>
                                <Button 
                                  size="sm"
                                  variant={post.published ? 'default' : 'outline'}
                                  className="rounded-full bg-green-500 hover:bg-green-600 text-white data-[variant=outline]:bg-yellow-500 data-[variant=outline]:hover:bg-yellow-600 data-[variant=outline]:text-white"
                                  onClick={() => togglePublish(post)}
                                >
                                    {post.published ? <Power className="w-4 h-4 mr-2" /> : <PowerOff className="w-4 h-4 mr-2" />}
                                    {post.published ? 'Published' : 'Draft'}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </AnimatePresence>
      </div>

       {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the blog post
                    from your database.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </AdminPageWrapper>
  );
}

    