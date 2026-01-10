
'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { useMemo } from 'react';

type BlogPost = {
  category: string;
};

const filterVariants = {
  hidden: { opacity: 0, y: -30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

interface BlogFilterProps {
    initialCategory?: string;
    searchTerm?: string;
    onSearchTermChange?: (term: string) => void;
    onCategoryChange?: (category: string) => void;
}

export default function BlogFilter({ 
    initialCategory, 
    searchTerm, 
    onSearchTermChange,
    onCategoryChange,
}: BlogFilterProps) {
    const router = useRouter();

    const firestore = useFirestore();
    const blogQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(
          collection(firestore, 'blog_posts'),
          where('published', '==', true)
        );
      }, [firestore]);
    const { data: posts } = useCollection<BlogPost>(blogQuery);

    const allCategories = useMemo(() => {
        if (!posts) return [];
        const categories = new Set(posts.map(p => p.category));
        return ['all', ...Array.from(categories)];
    }, [posts]);

    const handleFilterChange = (value: string) => {
        const slug = value.toLowerCase().replace(/ /g, '-');
        onCategoryChange?.(slug);

        const newUrl = value === 'all' ? '/blogs' : `/blogs?category=${slug}`;
        router.push(newUrl, { scroll: false });
    };
    
    return (
        <motion.div
            className="mx-auto flex flex-col md:flex-row gap-4 pb-6"
            variants={filterVariants}
        >
            <div className="relative flex-grow group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5 pointer-events-none z-10" />
                <Input
                    type="text"
                    placeholder="Search blog posts..."
                    className="pl-12 h-14 text-base rounded-full bg-white border-2 border-zinc-200 focus-visible:ring-transparent focus-visible:border-transparent w-full transition-shadow duration-300 shadow-sm hover:shadow-md focus:shadow-lg focus:outline-none relative"
                    value={searchTerm}
                    onChange={(e) => onSearchTermChange?.(e.target.value)}
                />
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-md -z-10" />
            </div>
            <Select onValueChange={handleFilterChange} value={initialCategory || 'all'}>
                <SelectTrigger className="w-full md:w-[280px] h-14 text-base rounded-full bg-white border-2 border-zinc-200 focus:ring-yellow-400 focus:border-yellow-400 transition-shadow duration-300 shadow-sm hover:shadow-md focus:shadow-lg">
                    <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="bg-white/80 backdrop-blur-sm">
                    {allCategories.map((category) => (
                        <SelectItem 
                            key={category} 
                            value={category}
                            className="text-base"
                        >
                            {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </motion.div>
    );
}
