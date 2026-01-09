
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

const filterVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

interface ProviderFilterProps {
    initialSolution?: string;
    searchTerm?: string;
    onSearchTermChange?: (term: string) => void;
    onCurrentPageChange?: (page: number) => void;
}

export default function ProviderFilter({ 
    initialSolution, 
    searchTerm, 
    onSearchTermChange, 
    onCurrentPageChange 
}: ProviderFilterProps) {
    const router = useRouter();

    const handleFilterChange = (value: string) => {
        if (value === 'all') {
            router.push('/providers');
        } else {
            const slug = value.toLowerCase().replace(/ /g, '-');
            router.push(`/providers/${slug}`);
        }
    };
    
    const solutionValue = initialSolution === 'all' || !initialSolution ? 'all' : initialSolution.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
        <motion.div
            className="mx-auto flex flex-col md:flex-row gap-4 mb-12"
            variants={filterVariants}
        >
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                <Input
                    type="text"
                    placeholder="Search providers..."
                    className="pl-10 h-12 rounded-full bg-white border-zinc-200 w-full"
                    value={searchTerm}
                    onChange={(e) => {
                        onSearchTermChange?.(e.target.value);
                        onCurrentPageChange?.(0);
                    }}
                />
            </div>
            <Select onValueChange={handleFilterChange} value={solutionValue}>
                <SelectTrigger className="w-full md:w-[280px] h-12 rounded-full bg-white border-zinc-200">
                    <SelectValue placeholder="Filter by solution" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Solutions</SelectItem>
                    <SelectItem value="Cloud Solutions">Cloud Solutions</SelectItem>
                    <SelectItem value="Communications">Communications</SelectItem>
                    <SelectItem value="AI Solutions">AI Solutions</SelectItem>
                    <SelectItem value="Connectivity">Connectivity</SelectItem>
                </SelectContent>
            </Select>
        </motion.div>
    );
}
