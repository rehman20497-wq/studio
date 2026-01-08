'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Upload, Book, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
};

const SectionCard = ({ id, title, icon: Icon, children }: { id: string, title: string, icon: React.ElementType, children: React.ReactNode }) => (
  <div id={id} className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-zinc-200/50">
    <div className="p-6 border-b border-zinc-200/80 flex items-center gap-4">
      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-yellow-600" />
      </div>
      <h2 className="text-2xl font-bold font-headline text-zinc-800">{title}</h2>
    </div>
    <div className="p-8">
      {children}
    </div>
  </div>
);

export default function AdminPanel() {
  return (
    <div className="p-4 sm:p-8 md:p-12">
        <h1 className="text-4xl font-bold font-headline text-zinc-900 mb-12">Dashboard</h1>
        <div className="max-w-5xl mx-auto space-y-16">
            <SectionWrapper>
            <SectionCard id="upload-provider" title="Upload New Provider" icon={Upload}>
                <form className="space-y-6">
                <Input placeholder="Provider Name (e.g., Google, Amazon)" />
                <Input type="file" />
                <Button className="w-full">Upload Provider</Button>
                </form>
            </SectionCard>
            </SectionWrapper>

            <SectionWrapper>
            <SectionCard id="upload-blog" title="Upload New Blog Post" icon={Book}>
                <form className="space-y-6">
                <Input placeholder="Blog Title" />
                <Textarea placeholder="Blog content (Markdown supported)..." rows={8} />
                <Input type="file" placeholder="Header Image" />
                <Button className="w-full">Publish Blog Post</Button>
                </form>
            </SectionCard>
            </SectionWrapper>
            
            <SectionWrapper>
            <SectionCard id="manage-providers" title="Manage Providers" icon={Settings}>
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-zinc-50 border">
                            <div className="flex items-center gap-4">
                                <Image src="https://picsum.photos/seed/google/40/40" alt="Provider" width={40} height={40} className="rounded-md" />
                                <span className="font-semibold">Provider Name {i+1}</span>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline">Edit</Button>
                                <Button size="sm" variant="destructive">Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>
            </SectionWrapper>
        </div>
    </div>
  );
}
