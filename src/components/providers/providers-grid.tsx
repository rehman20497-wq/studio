
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
import { Search } from 'lucide-react';

const providers = [
  {
    name: 'Provider A',
    logo: 'https://picsum.photos/seed/providerA/200/100',
    solution: 'cloud',
    hint: 'abstract logo'
  },
  {
    name: 'Provider B',
    logo: 'https://picsum.photos/seed/providerB/200/100',
    solution: 'communications',
    hint: 'abstract logo'
  },
  {
    name: 'Provider C',
    logo: 'https://picsum.photos/seed/providerC/200/100',
    solution: 'ai',
    hint: 'abstract logo'
  },
  {
    name: 'Provider D',
    logo: 'https://picsum.photos/seed/providerD/200/100',
    solution: 'connectivity',
    hint: 'abstract logo'
  },
  {
    name: 'Provider E',
    logo: 'https://picsum.photos/seed/providerE/200/100',
    solution: 'cloud',
    hint: 'abstract logo'
  },
  {
    name: 'Provider F',
    logo: 'https://picsum.photos/seed/providerF/200/100',
    solution: 'ai',
    hint: 'abstract logo'
  },
];

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
            staggerChildren: 0.1,
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
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [searchTerm, setSearchTerm] = useState('');
  const [solutionFilter, setSolutionFilter] = useState('all');

  const filteredProviders = providers.filter(
    (provider) =>
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (solutionFilter === 'all' || provider.solution === solutionFilter)
  );

  return (
    <motion.section
      ref={ref}
      className="bg-[#FCFBF8] py-24 px-[4%]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.div
        className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-12"
        variants={filterVariants}
      >
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search providers..."
            className="pl-10 h-12 rounded-full bg-white border-zinc-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select onValueChange={setSolutionFilter} defaultValue="all">
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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        variants={gridContainerVariants}
      >
        {filteredProviders.map((provider) => (
          <motion.div key={provider.name} variants={cardVariants}>
            <Link href="#" className="block group">
              <div className="bg-white rounded-2xl p-8 flex items-center justify-center h-48 shadow-md border border-zinc-100 transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-yellow-400 group-hover:-translate-y-2">
                <Image
                  src={provider.logo}
                  alt={provider.name}
                  width={150}
                  height={60}
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={provider.hint}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
