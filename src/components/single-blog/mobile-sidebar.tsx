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
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
};

export default function MobileSidebar({ currentPostId, slug, category }: { currentPostId: string; slug: string; category: string; }) {
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
                    className="fixed bottom-6 right-1 z-40 h-14 px-6 rounded-full bg-zinc-900 text-white flex items-center justify-center gap-2 shadow-lg"
                >
                    <PanelLeft className="w-6 h-6" />
                    <span className="font-medium">More Articles</span>
                </motion.button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[85%] max-w-sm">
                <div className="bg-[#FEF9F2] h-full overflow-y-auto p-6 pt-12">
                   <Sidebar currentPostId={currentPostId} slug={slug} category={category} />
                </div>
            </SheetContent>
        </Sheet>
    );
}
