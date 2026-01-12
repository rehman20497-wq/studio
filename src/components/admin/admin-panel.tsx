
'use client';

import { motion, useInView, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Upload, BookOpen, Settings, FileText, Newspaper, Users, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import Link from 'next/link';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { format, formatDistanceToNow } from 'date-fns';

const SectionWrapper = ({ children, id }: { children: React.ReactNode, id: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
};

const SectionCard = ({ title, icon: Icon, children, href }: { title: string, icon: React.ElementType, children: React.ReactNode, href: string }) => (
  <Link href={href} className="block group">
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-zinc-200/50 h-full group-hover:border-yellow-400 group-hover:shadow-2xl transition-all duration-300">
      <div className="p-6 border-b border-zinc-200/80 flex items-center gap-4">
        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors duration-300">
          <Icon className="w-6 h-6 text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold font-headline text-zinc-800">{title}</h2>
      </div>
      <div className="p-8">
        {children}
      </div>
    </div>
  </Link>
);


function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const spring = useSpring(0, {
    damping: 20,
    stiffness: 100,
    mass: 1
  });

  if (isInView) {
    spring.set(value);
  }

  spring.on("change", (latest) => {
    if (ref.current) {
      ref.current.textContent = Math.round(latest).toLocaleString();
    }
  });

  return <span ref={ref}>0</span>;
}

const StatCard = ({ title, value, icon: Icon }: { title: string, value: number, icon: React.ElementType }) => (
    <motion.div 
        className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-zinc-200/80 flex items-center gap-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
    >
        <div className="w-14 h-14 bg-gradient-to-tr from-yellow-300 to-pink-300 rounded-full flex items-center justify-center text-zinc-800">
            <Icon className="w-7 h-7" />
        </div>
        <div>
            <div className="text-4xl font-bold font-mono text-zinc-900">
                <AnimatedNumber value={value} />
            </div>
            <p className="text-sm font-medium text-zinc-600">{title}</p>
        </div>
    </motion.div>
);

const RecentSubscriberCard = ({ email, date, index }: { email: string, date: { seconds: number }, index: number }) => (
    <motion.div
        className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-zinc-200"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1, ease: 'easeOut' } }}
    >
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center">
                <Users className="w-5 h-5 text-zinc-500" />
            </div>
            <div>
                <p className="font-semibold text-zinc-800">{email}</p>
                <p className="text-xs text-zinc-500">{formatDistanceToNow(new Date(date.seconds * 1000), { addSuffix: true })}</p>
            </div>
        </div>
    </motion.div>
);

export default function AdminPanel() {
    const firestore = useFirestore();

    const { data: providers } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'providers') : null, [firestore]));
    const { data: blogs } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'blog_posts') : null, [firestore]));
    const { data: newsletters } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'newsletter_subscribers') : null, [firestore]));

    const recentNewsletters = newsletters?.slice().sort((a,b) => b.createdAt.seconds - a.createdAt.seconds).slice(0, 4) || [];

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Providers" value={providers?.length || 0} icon={FileText} />
                <StatCard title="Total Blog Posts" value={blogs?.length || 0} icon={BookOpen} />
                <StatCard title="Newsletter Subs" value={newsletters?.length || 0} icon={Newspaper} />
            </div>

            {/* Management Cards */}
            <div className="grid md:grid-cols-2 gap-12">
                <SectionWrapper id="upload-provider">
                    <SectionCard title="Upload New Provider" icon={Upload} href="/admin/upload">
                        <p className="text-zinc-600">Add a new service provider to your network. Upload their logo, description, and offered solutions.</p>
                    </SectionCard>
                </SectionWrapper>
                
                <SectionWrapper id="manage-providers">
                    <SectionCard title="Manage Providers" icon={Settings} href="/admin/manage">
                        <p className="text-zinc-600">Edit, delete, and manage visibility of existing providers. View performance analytics.</p>
                    </SectionCard>
                </SectionWrapper>
                
                <SectionWrapper id="upload-blog">
                  <SectionCard title="Upload New Blog" icon={BookOpen} href="/admin/upload-blog">
                      <p className="text-zinc-600">Create and publish a new article. Supports rich text, images, and embedded content.</p>
                  </SectionCard>
                </SectionWrapper>
                
                <SectionWrapper id="manage-blogs">
                  <SectionCard title="Manage Blogs" icon={FileText} href="/admin/manage-blogs">
                      <p className="text-zinc-600">Edit, delete, and manage visibility of existing blog posts. View performance analytics.</p>
                  </SectionCard>
                </SectionWrapper>
            </div>

            {/* Recent Subscribers */}
            {newsletters && newsletters.length > 0 && (
                <SectionWrapper id="recent-subscribers">
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-zinc-200/50">
                        <div className="p-6 border-b border-zinc-200/80 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Users className="w-6 h-6 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold font-headline text-zinc-800">Recent Subscribers</h2>
                            </div>
                            <Link href="/admin/newsletters">
                                <Button variant="outline" className="rounded-full">
                                    <Eye className="w-4 h-4 mr-2" />
                                    View All
                                </Button>
                            </Link>
                        </div>
                        <div className="p-6 space-y-4">
                            {recentNewsletters.map((sub, index) => (
                                <RecentSubscriberCard 
                                    key={sub.id} 
                                    email={sub.email} 
                                    date={sub.createdAt} 
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </SectionWrapper>
            )}

        </div>
    );
}
