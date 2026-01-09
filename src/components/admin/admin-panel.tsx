
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Upload, BookOpen, Settings, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import Link from 'next/link';

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

export default function AdminPanel() {
  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
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
  );
}
