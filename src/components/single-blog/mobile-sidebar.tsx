'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PanelLeft } from 'lucide-react';
import Sidebar from './sidebar';

const triggerVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 100 },
    visible: { 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: { delay: 0.5, duration: 0.5, ease: 'easeOut' }
    },
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.9 }
};

export default function MobileSidebar({ currentPostId, category }: { currentPostId: string; category: string; }) {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <motion.button
                    variants={triggerVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-lg"
                >
                    <PanelLeft className="w-8 h-8" />
                </motion.button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[85%] max-w-sm">
                <div className="bg-[#FEF9F2] h-full overflow-y-auto p-6 pt-12">
                   <Sidebar currentPostId={currentPostId} category={category} />
                </div>
            </SheetContent>
        </Sheet>
    );
}
