
'use client';

import { motion } from 'framer-motion';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Send, Facebook, Linkedin, XIcon, MessageCircle, Copy } from 'lucide-react';
import MagneticButton from '../magnetic-button';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      type: 'spring',
      stiffness: 80,
    },
  }),
};

const SocialIcon = ({ href, icon: Icon, onClick }: { href?: string; icon: React.ElementType; onClick?: () => void; }) => {
  const Component = href ? 'a' : 'button';
  return (
    <Component
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick })}
      className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black hover:bg-yellow-500 transition-colors"
    >
      <Icon className="w-5 h-5" />
    </Component>
  );
};

export default function Sidebar({ currentPostId, slug, category }: { currentPostId: string; slug: string; category: string; }) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [blogUrl, setBlogUrl] = useState('');

  useEffect(() => {
    setBlogUrl(`${window.location.origin}/blogs/${slug}`);
  }, [slug]);

  const relatedQuery = useMemoFirebase(
    () => {
      if (!firestore || !category) return null;
      // Note: We query by category to get related posts. 
      // Firestore doesn't support "!=" in many cases with other filters, so we filter out currentPostId in the component.
      return query(
        collection(firestore, 'blog_posts'),
        where('published', '==', true),
        where('category', '==', category),
        limit(5)
      );
    },
    [firestore, category]
  );

  const { data: relatedPosts, isLoading } = useCollection<BlogPost>(relatedQuery);

  const articles = relatedPosts?.filter((p) => p.id !== currentPostId).slice(0, 3) || [];

  const shareOnWhatsApp = () => {
    if (!blogUrl) return;
    window.open(`https://wa.me/?text=${encodeURIComponent(blogUrl)}`, '_blank');
  };

  const copyToClipboard = async () => {
    if (!blogUrl) return;
    try {
      await navigator.clipboard.writeText(blogUrl);
      toast({ title: 'Link copied', description: 'Blog link copied to clipboard.' });
    } catch {
      toast({ title: 'Copy failed', variant: 'destructive' });
    }
  };

  return (
    <div className="sticky top-28 space-y-8">
      <motion.div custom={0} variants={itemVariants} className="bg-yellow-100/50 rounded-2xl p-6 border border-yellow-200">
        <h3 className="font-bold text-zinc-800 mb-4 text-lg">Related Articles</h3>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : articles.length > 0 ? (
          <ul className="space-y-4">
            {articles.map((post) => (
              <li key={post.id} className="border-b border-yellow-300 pb-2 last:border-b-0">
                <Link href={`/blogs/${post.slug || post.id}`} className="text-zinc-700 hover:text-black hover:underline transition-colors font-medium">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500">No related articles found.</p>
        )}
      </motion.div>

      <motion.div custom={1} variants={itemVariants} className="bg-yellow-100/50 rounded-2xl p-6 border border-yellow-200">
        <h3 className="text-xl text-zinc-800 font-medium">Stay updated with our newsletter</h3>
        <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-zinc-200 mt-4">
          <Input type="email" placeholder="Enter Email" className="border-none focus-visible:ring-0 bg-transparent text-sm flex-grow" />
          <Button type="submit" size="icon" className="rounded-full bg-cyan-200 text-black">
            <Send className="w-4 h-4 -rotate-45" />
          </Button>
        </div>
      </motion.div>

      <motion.div custom={2} variants={itemVariants} className="space-y-4">
        <div className="bg-white rounded-2xl p-8 border text-center moving-gradient-border shadow-md">
          <h3 className="text-2xl font-semibold text-zinc-900">Need Expert Help?</h3>
          <div className="my-4">
            <MagneticButton>
              <span className="text-button font-medium px-4">Talk to an Expert</span>
            </MagneticButton>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <span className="text-xs font-bold tracking-widest text-zinc-400">SHARE</span>
          <SocialIcon href={blogUrl ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}` : undefined} icon={XIcon} />
          <SocialIcon href={blogUrl ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}` : undefined} icon={Facebook} />
          <SocialIcon href={blogUrl ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}` : undefined} icon={Linkedin} />
          <SocialIcon icon={MessageCircle} onClick={shareOnWhatsApp} />
          <SocialIcon icon={Copy} onClick={copyToClipboard} />
        </div>
      </motion.div>
    </div>
  );
}
