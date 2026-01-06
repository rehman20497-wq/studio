
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

const leadershipTeam = [
  {
    name: 'Emily Slota',
    title: 'President',
    image: '/t.png',
    bgColor: 'bg-pink-100',
  },
  {
    name: 'Orinola Gbadebo-Smith',
    title: 'Chief Executive',
    image: '/t1.png',
    bgColor: 'bg-cyan-100',
  },
  {
    name: 'Simone Bartlett',
    title: 'Chief Operating Officer',
    image: '/t2.png',
    bgColor: 'bg-yellow-100',
  },
  {
    name: 'Niel Harper',
    title: 'Information Security',
    image: '/t3.png',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Travis Low',
    title: 'CX, AI & T&S Practice Leader',
    image: '/t4.png',
    bgColor: 'bg-purple-100',
  },
  {
    name: 'Taire Avbovbo',
    title: 'Pilots & New Client Operations',
    image: '/t5.png',
    bgColor: 'bg-rose-100',
  },
  {
    name: 'Funmi Ajala',
    title: 'Customer Support Operations',
    image: '/t6.png',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Kirill Pesterev',
    title: 'Corporate Development',
    image: '/t7.png',
    bgColor: 'bg-orange-100',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 50,
        duration: 1.5,
      },
    },
  };

const TeamMemberCard = ({
  member,
  index,
}: {
  member: (typeof leadershipTeam)[0];
  index: number;
}) => (
  <motion.div 
    variants={cardVariants} 
    className="flex flex-col w-[268px] h-[310px]"
    whileHover={{ scale: 1.05, y: -10 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div
      className={cn(
        'relative rounded-t-xl overflow-hidden p-4 border-t-2 border-x-2 border-yellow-300',
        member.bgColor
      )}
    >
      <Image
        src={member.image}
        alt={member.name}
        width={250}
        height={180}
        className="w-full h-[180px] object-cover"
      />
    </div>
    <div className="bg-white rounded-b-xl p-4 text-center border-b-2 border-x-2 border-yellow-300 flex-grow flex flex-col justify-center">
      <h3 className="font-bold text-zinc-900">{member.name}</h3>
      <p className="text-sm text-zinc-600 mb-2">{member.title}</p>
      <div className="flex justify-end">
        <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center">
          <Linkedin className="w-3 h-3 text-zinc-800" />
        </div>
      </div>
    </div>
  </motion.div>
);

export default function LeadershipSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-[#FCFBF8] py-24 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          variants={headingVariants}
        >
          <Image
            src="/arrow-right.png"
            alt="plane icon"
            width={40}
            height={40}
          />
          <h2 className="text-4xl font-headline font-medium text-zinc-900">
            Our leadership
          </h2>
        </motion.div>

        <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center"
            variants={containerVariants}
        >
          {leadershipTeam.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
