'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const Word = ({ children, progress, range }: { children: React.ReactNode, progress: any, range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return <motion.span style={{ opacity }} className="relative">{children}</motion.span>
}

export default function QuoteSection({ quote }: { quote: string }) {
    const container = useRef(null);
    const isInView = useInView(container, { once: true, amount: 0.4 });
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start 0.9', 'start 0.25']
    });

    const words = quote.split(" ");

    return (
        <motion.div 
            ref={container}
            className="relative p-[8%] my-12 rounded-2xl overflow-hidden wavy-gradient-background"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        >
            <div className="absolute top-4 left-4">
                <Image src="/doub.gif" alt="Opening quote" width={40} height={40} unoptimized />
            </div>
            
            <p className="text-3xl font-semibold text-zinc-800 leading-normal text-center flex flex-wrap justify-center gap-x-2">
                {words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + (1 / words.length);
                    return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
                })}
            </p>

            <div className="absolute bottom-4 right-4">
                <Image src="/doubn.gif" alt="Closing quote" width={40} height={40} unoptimized />
            </div>
        </motion.div>
    )
}
