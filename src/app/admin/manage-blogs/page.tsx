'use client';

import { useState } from 'react';
import AdminPageWrapper, { PermissionGuard } from '@/components/admin/admin-page-wrapper';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, BarChart3, PlusCircle, LayoutGrid, List, Eye, Power, PowerOff, MessageSquare, Share2 } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import { useCollection, useFirestore, useMemoFirebase, deleteDocumentNonBlocking, updateDocumentNonBlocking, useAdminUser } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import AdminHeader from '@/components/admin/admin-header';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EditBlogForm from '@/components/admin/edit-blog-form';

type BlogPost = {
  id: string;
  title: string;
  authorName: string;
  authorImageUrl: string;
  category: string;
  content: string;
  quote?: string | null;
  createdAt: { seconds: number; nanoseconds: number; };
  featuredImageUrl: string;
  views: number;
  comments: number;
  shares: number;
  published?: boolean;
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

const generateMonthlyData = (totalViews: number, totalComments: number, totalShares: number) => {
    const now = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const months = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
        return monthNames[d.getMonth()];
    });

    // Simple growth distribution
    const distribution = [0.05, 0.1, 0.15, 0.2, 0.25, 0.25];

    return months.map((month, i) => ({
        name: month,
        Views: Math.round(totalViews * distribution[i]),
        Comments: Math.round(totalComments * distribution[i]),
        Shares: Math.round(totalShares * distribution[i]),
    }));
};

const BlogPostStatsView = ({ post }: { post: BlogPost }) => {
    const views = post.views || 0;
    const comments = post.comments || 0;
    const shares = post.shares || 0;
    const monthlyData = generateMonthlyData(views, comments, shares);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{views.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Total all-time views</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Comments</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{comments.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Total all-time comments</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Shares</CardTitle>
                        <Share2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{shares.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Total all-time shares</p>
                    </CardContent>
                </Card>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4">Monthly Engagement</h3>
                <div className="w-full h-[300px]">
                    <ResponsiveContainer>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="Views" fill="#8884d8" />
                            <Bar dataKey="Comments" fill="#82ca9d" />
                            <Bar dataKey="Shares" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

function ManageBlogsContent() {
    const { toast } = useToast();
    const firestore = useFirestore();
    const router = useRouter();
    const { session, hasPermission } = useAdminUser();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isStatsDialogOpen, setIsStatsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    const memoizedQuery = useMemoFirebase(
      () => {
          if (!firestore) return null;
          return query(collection(firestore, 'blog_posts'), orderBy('createdAt', 'desc'));
      },
      [firestore]
    );

    const { data: posts, isLoading, error } = useCollection<BlogPost>(memoizedQuery);

    const openDeleteDialog = (post: BlogPost) => {
      setSelectedPost(post);
      setIsDeleteDialogOpen(true);
    };

    const openStatsDialog = (post: BlogPost) => {
        setSelectedPost(post);
        setIsStatsDialogOpen(true);
    };

    const openEditDialog = (post: BlogPost) => {
        setSelectedPost(post);
        setIsEditDialogOpen(true);
    };
    
    const handleTogglePublish = (post: BlogPost) => {
      if (!firestore || !hasPermission('manage-blogs', 'edit')) {
        toast({ title: 'Permission Denied', description: 'You do not have permission to edit posts.', variant: 'destructive' });
        return;
      }
      const postRef = doc(firestore, 'blog_posts', post.id);
      const newStatus = !(post.published ?? false);
      
      updateDocumentNonBlocking(postRef, { published: newStatus });
  
      toast({
          title: `Post ${newStatus ? 'Published' : 'Unpublished'}`,
          description: `"${post.title}" is now ${newStatus ? 'live to the public' : 'hidden from the public'}.`,
      });
    };

    const confirmDelete = () => {
        if (!firestore || !selectedPost || !hasPermission('manage-blogs', 'delete')) {
            toast({ title: 'Permission Denied', description: 'You do not have permission to delete posts.', variant: 'destructive' });
            return;
        }

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
            <div className="p-8">
                <AdminHeader userName={session?.user.name || 'Admin'} />
                <div className="mt-12 text-center">
                    <p>Loading blog posts...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="p-8">
                <AdminHeader userName={session?.user.name || 'Admin'} />
                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold text-red-600">Failed to Load Blog Posts</h2>
                    <p className="text-zinc-600 mt-2">There was a permission error while fetching the blog posts.</p>
                    <pre className="mt-4 text-left bg-zinc-100 p-4 rounded-md overflow-x-auto text-sm">
                        <code>{error.message}</code>
                    </pre>
                </div>
            </div>
        )
    }

  return (
    <PermissionGuard pageId="manage-blogs">
      <div className="p-4 sm:p-8 md:p-12">
        <AdminHeader userName={session?.user.name || 'Admin'} />
        <div className="flex justify-between items-center my-8">
            <div>
                <h1 className="text-3xl font-bold font-headline text-zinc-900">Blog Posts</h1>
                <p className="text-zinc-500">Edit, delete, and analyze your content.</p>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-zinc-200' : ''}>
                    <List className="w-5 h-5"/>
                </Button>
                <Button variant="outline" size="icon" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-zinc-200' : ''}>
                    <LayoutGrid className="w-5 h-5"/>
                </Button>
                <Button 
                  className="rounded-full bg-zinc-800 text-white hover:bg-zinc-700"
                  onClick={() => router.push('/admin/upload-blog')}
                  disabled={!hasPermission('manage-blogs', 'create')}
                >
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
                                <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="rounded-full" 
                                    onClick={() => openEditDialog(post)}
                                    disabled={!hasPermission('manage-blogs', 'edit')}
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                                <Button size="sm" variant="destructive" className="rounded-full" onClick={() => openDeleteDialog(post)} disabled={!hasPermission('manage-blogs', 'delete')}><Trash2 className="w-4 h-4 mr-2" />Delete</Button>
                                <Button size="sm" variant="secondary" className="rounded-full" onClick={() => openStatsDialog(post)}><BarChart3 className="w-4 h-4 mr-2" />Stats</Button>
                                <Button 
                                  size="sm"
                                  variant={(post.published ?? false) ? 'default' : 'outline'}
                                  className="rounded-full bg-green-500 hover:bg-green-600 text-white data-[variant=outline]:bg-yellow-500 data-[variant=outline]:hover:bg-yellow-600 data-[variant=outline]:text-white"
                                  onClick={() => handleTogglePublish(post)}
                                  disabled={!hasPermission('manage-blogs', 'edit')}
                                >
                                    {(post.published ?? false) ? <Power className="w-4 h-4 mr-2" /> : <PowerOff className="w-4 h-4 mr-2" />}
                                    {(post.published ?? false) ? 'Published' : 'Unpublished'}
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

        {/* Stats Dialog */}
        <Dialog open={isStatsDialogOpen} onOpenChange={setIsStatsDialogOpen}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Statistics for: {selectedPost?.title}</DialogTitle>
                    <DialogDescription>
                        Showing performance analytics for the last 6 months (sample data).
                    </DialogDescription>
                </DialogHeader>
                {selectedPost && (
                    <div className="mt-4">
                        <BlogPostStatsView post={selectedPost} />
                    </div>
                )}
            </DialogContent>
        </Dialog>

        {/* Edit Blog Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Blog Post: {selectedPost?.title}</DialogTitle>
                </DialogHeader>
                {selectedPost && (
                    <EditBlogForm post={selectedPost} onFinished={() => setIsEditDialogOpen(false)} />
                )}
            </DialogContent>
        </Dialog>
    </PermissionGuard>
  );
}


export default function ManageBlogsPage() {
  return (
    <AdminPageWrapper screenTitle="Manage Blogs">
      <ManageBlogsContent />
    </AdminPageWrapper>
  );
}
