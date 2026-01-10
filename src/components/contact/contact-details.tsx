
'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const mapVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
            delay: 0.8,
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1]
        }
    }
}

const InfoCard = ({ icon: Icon, title, value, href }: { icon: React.ElementType, title: string, value: string, href: string }) => (
    <motion.div variants={itemVariants}>
        <a href={href} className="flex items-center gap-4 group">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 group-hover:bg-yellow-200 transition-colors">
                <Icon className="w-8 h-8" />
            </div>
            <div>
                <h3 className="font-semibold text-zinc-500">{title}</h3>
                <p className="text-lg font-medium text-zinc-900 group-hover:underline">{value}</p>
            </div>
        </a>
    </motion.div>
);

export default function ContactDetails() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="space-y-12"
    >
      <div className="space-y-8">
        <InfoCard icon={Mail} title="Email Us" value="hello@telesys.com" href="mailto:hello@telesys.com" />
        <InfoCard icon={Phone} title="Call Us" value="(555) 123-4567" href="tel:5551234567" />
        <InfoCard icon={MapPin} title="Visit Us" value="401 N Michigan Ave, Chicago, IL" href="#" />
      </div>

      <motion.div 
        className="relative h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-yellow-200"
        variants={mapVariants}
      >
        <Image 
            src="/map.png"
            alt="World Map"
            fill
            className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
                className="w-8 h-8 bg-yellow-400 rounded-full border-4 border-white"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>
      </motion.div>
    </motion.div>
  );
}
