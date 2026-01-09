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
import { usePathname } from 'next/navigation';

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
    onSolutionChange?: (solution: string) => void;
}

export default function ProviderFilter({ 
    initialSolution, 
    searchTerm, 
    onSearchTermChange,
    onSolutionChange
}: ProviderFilterProps) {
    const router = useRouter();
    const pathname = usePathname();
    const isSingleProviderPage = pathname.includes('/providers/') && pathname.length > '/providers/'.length && !pathname.includes('?');

    const handleFilterChange = (value: string) => {
        const slug = value.toLowerCase().replace(/ /g, '-');
        
        if (isSingleProviderPage) {
            if (value === 'all') {
                router.push('/providers');
            } else {
                router.push(`/providers?solution=${slug}`);
            }
        } else {
            onSolutionChange?.(slug);
        }
    };
    
    const formatSolutionForDisplay = (solution: string | undefined): string | undefined => {
        if (!solution || solution === 'all') return 'all';
        if (solution === 'cloud') return 'Cloud Solutions';
        if (solution === 'communications') return 'Communications';
        if (solution === 'ai') return 'AI Solutions';
        if (solution === 'connectivity') return 'Connectivity';
        return solution.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };
    
    const defaultValue = formatSolutionForDisplay(initialSolution) || 'all';

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
                    onChange={(e) => onSearchTermChange?.(e.target.value)}
                    disabled={isSingleProviderPage}
                />
            </div>
            <Select onValueChange={handleFilterChange} value={defaultValue}>
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
