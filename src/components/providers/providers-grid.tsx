'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';

type Provider = {
  id: string;
  name: string;
  logoUrl: string;
  solutions: string[];
  published?: boolean;
};

const ITEMS_PER_PAGE = 12;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

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

const gridContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.05,
        }
    }
}

const cardVariants = {
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

const ProviderCardSkeleton = () => (
  <motion.div variants={cardVariants}>
    <div className="relative bg-white rounded-2xl p-4 h-48 shadow-md border border-zinc-100">
      <Skeleton className="w-full h-full" />
    </div>
  </motion.div>
);


export default function ProvidersGrid({ initialSolution }: { initialSolution?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [solutionFilter, setSolutionFilter] = useState(initialSolution || 'all');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setSolutionFilter(initialSolution || 'all');
    setCurrentPage(0);
  }, [initialSolution]);

  const firestore = useFirestore();

  const providersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'providers'),
      where('published', '==', true)
    );
  }, [firestore]);

  const { data: providers, isLoading } = useCollection<Provider>(providersQuery);

  const filteredProviders = useMemo(() => {
    if (!providers) return [];
    
    let filtered = providers;

    if (solutionFilter !== 'all') {
      const solutionKey = solutionFilter.replace(/-/g, ' ');
      filtered = filtered.filter(provider => provider.solutions.some(s => s.toLowerCase() === solutionKey));
    }
    
    if (searchTerm) {
      filtered = filtered.filter(provider => provider.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    return filtered.sort((a, b) => a.name.localeCompare(b.name));

  }, [providers, searchTerm, solutionFilter]);

  const handleFilterChange = (value: string) => {
    if (value === 'all') {
      router.push('/providers');
    } else {
      const slug = value.toLowerCase().replace(/ /g, '-');
      router.push(`/providers/${slug}`);
    }
  };

  const pageCount = Math.ceil(filteredProviders.length / ITEMS_PER_PAGE);
  const paginatedProviders = filteredProviders.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const filterValue = solutionFilter === 'all' ? 'all' : solutionFilter.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <motion.section
      ref={ref}
      className="bg-[#FCFBF8] pt-[3%] pb-24 px-[3%]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
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
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
          />
        </div>
        <Select onValueChange={handleFilterChange} value={filterValue}>
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

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={gridContainerVariants}
      >
        {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => <ProviderCardSkeleton key={i} />)
        ) : (
            paginatedProviders.map((provider) => (
            <motion.div key={provider.id} variants={cardVariants}>
                <Link href={`/providers/${provider.id}`} className="block group">
                <div className="relative bg-white rounded-2xl p-4 flex items-center justify-center h-48 shadow-md border border-zinc-100 transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-yellow-400 group-hover:-translate-y-2 overflow-hidden">
                    <Image
                    src={provider.logoUrl}
                    alt={provider.name}
                    fill
                    className="object-contain p-4"
                    data-ai-hint="abstract logo"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                </div>
                </Link>
            </motion.div>
            ))
        )}
      </motion.div>
      
      {pageCount > 1 && (
        <motion.div 
            className="flex justify-center items-center gap-4 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
        >
            <Button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 0))}
                disabled={currentPage === 0}
            >
                Previous
            </Button>
            <span className="text-zinc-600">
                Page {currentPage + 1} of {pageCount}
            </span>
            <Button
                onClick={() => setCurrentPage(p => Math.min(p + 1, pageCount - 1))}
                disabled={currentPage === pageCount - 1}
            >
                Next
            </Button>
        </motion.div>
      )}

      {!isLoading && paginatedProviders.length === 0 && (
        <motion.div className="text-center py-20 col-span-full" variants={filterVariants}>
            <h3 className="text-xl font-semibold">No Providers Found</h3>
            <p className="text-zinc-500 mt-2">Try adjusting your search or filter criteria.</p>
        </motion.div>
      )}
    </motion.section>
  );
}