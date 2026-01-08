'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

const providers = [
  { name: 'Provider A', logo: 'https://picsum.photos/seed/providerA/200/100', solution: 'cloud', hint: 'abstract logo' },
  { name: 'Provider B', logo: 'https://picsum.photos/seed/providerB/200/100', solution: 'communications', hint: 'abstract logo' },
  { name: 'Provider C', logo: 'https://picsum.photos/seed/providerC/200/100', solution: 'ai', hint: 'abstract logo' },
  { name: 'Provider D', logo: 'https://picsum.photos/seed/providerD/200/100', solution: 'connectivity', hint: 'abstract logo' },
  { name: 'Provider E', logo: 'https://picsum.photos/seed/providerE/200/100', solution: 'cloud', hint: 'abstract logo' },
  { name: 'Provider F', logo: 'https://picsum.photos/seed/providerF/200/100', solution: 'ai', hint: 'abstract logo' },
  { name: 'Provider G', logo: 'https://picsum.photos/seed/providerG/200/100', solution: 'communications', hint: 'abstract logo' },
  { name: 'Provider H', logo: 'https://picsum.photos/seed/providerH/200/100', solution: 'connectivity', hint: 'abstract logo' },
  { name: 'Provider I', logo: 'https://picsum.photos/seed/providerI/200/100', solution: 'cloud', hint: 'abstract logo' },
  { name: 'Provider J', logo: 'https://picsum.photos/seed/providerJ/200/100', solution: 'ai', hint: 'abstract logo' },
  { name: 'Provider K', logo: 'https://picsum.photos/seed/providerK/200/100', solution: 'communications', hint: 'abstract logo' },
  { name: 'Provider L', logo: 'https://picsum.photos/seed/providerL/200/100', solution: 'connectivity', hint: 'abstract logo' },
  // Add more to test pagination
  ...Array.from({ length: 15 }, (_, i) => ({
    name: `Provider M${i + 1}`,
    logo: `https://picsum.photos/seed/providerM${i}/200/100`,
    solution: ['cloud', 'ai', 'communications', 'connectivity'][i % 4],
    hint: 'abstract logo'
  })),
];

const ITEMS_PER_PAGE = 20; // 5 rows * 4 items/row

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

export default function ProvidersGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [solutionFilter, setSolutionFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredProviders = providers.filter(
    (provider) =>
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (solutionFilter === 'all' || provider.solution === solutionFilter)
  );

  const pageCount = Math.ceil(filteredProviders.length / ITEMS_PER_PAGE);
  const paginatedProviders = filteredProviders.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

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
              setCurrentPage(0); // Reset to first page on search
            }}
          />
        </div>
        <Select onValueChange={(value) => {
            setSolutionFilter(value);
            setCurrentPage(0); // Reset to first page on filter change
        }} defaultValue="all">
          <SelectTrigger className="w-full md:w-[280px] h-12 rounded-full bg-white border-zinc-200">
            <SelectValue placeholder="Filter by solution" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Solutions</SelectItem>
            <SelectItem value="cloud">Cloud Solutions</SelectItem>
            <SelectItem value="communications">Communications Solutions</SelectItem>
            <SelectItem value="ai">AI Solutions</SelectItem>
            <SelectItem value="connectivity">Connectivity Solutions</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={gridContainerVariants}
      >
        {paginatedProviders.map((provider) => (
          <motion.div key={provider.name} variants={cardVariants}>
            <Link href="#" className="block group">
              <div className="relative bg-white rounded-2xl p-0 flex items-center justify-center h-48 shadow-md border border-zinc-100 transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-yellow-400 group-hover:-translate-y-2 overflow-hidden">
                <Image
                  src={provider.logo}
                  alt={provider.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={provider.hint}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </Link>
          </motion.div>
        ))}
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
    </motion.section>
  );
}
