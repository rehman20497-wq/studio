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
  hidden: { opacity: 0, x: -50 },
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
};

const addressBoxVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: 1.5,
            type: 'spring',
            stiffness: 120,
            damping: 15,
        }
    }
}


const InfoCard = ({ icon: Icon, title, value, href }: { icon: React.ElementType, title: string, value: string, href: string }) => (
    <motion.div variants={itemVariants}>
        <a href={href} className="flex items-center gap-4 group">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex-shrink-0 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-200 transition-colors">
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
      className="grid md:grid-cols-2 gap-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="space-y-12">
        <InfoCard icon={Mail} title="Email Us" value="Info@telsysinc.com" href="mailto:Info@telsysinc.com" />
        <InfoCard icon={Phone} title="Call Us" value="(555) 123-4567" href="tel:5551234567" />
        <InfoCard icon={MapPin} title="Visit Us" value="1531 E Bradford Pkwy, Springfield MO 65804" href="https://maps.app.goo.gl/ap66WSKYBUC6tZpU8" />
      </div>

      <motion.div 
        className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl border-4 border-yellow-200 mr-[10%]"
        variants={mapVariants}
      >
        <Image 
            src="/map.png"
            alt="World Map"
            fill
            className="object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
                className="w-8 h-8 bg-yellow-400 rounded-full border-4 border-white"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>
        
        <motion.div 
className="absolute top-20 right-28 w-[60%]"
variants={addressBoxVariants}
        >
            <div className="relative bg-white/90 backdrop-blur-md rounded-xl p-4 border-2 border-yellow-300 shadow-2xl">
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-inherit border-b-2 border-r-2 border-yellow-300 rotate-45" />
                <p className="font-bold text-zinc-800 text-center">Telesys Headquarters</p>
                <p className="text-sm text-zinc-600 text-center mt-1">1531 E Bradford Pkwy, Springfield MO 65804</p>
                <p className="text-sm text-zinc-600 text-center">(555) 123-4567</p>
            </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
