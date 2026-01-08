'use client';

import { useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

const CORRECT_PASSKEY = 'F@izan&1122';

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function LoginScreen({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [passkey, setPasskey] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isCorrect = passkey === CORRECT_PASSKEY;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isCorrect || !buttonRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    const dx = clientX - (left + width / 2);
    const dy = clientY - (top + height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    const maxMove = 80;
    if (distance < 120) {
      const angle = Math.atan2(dy, dx);
      const moveDistance = ((120 - distance) / 120) * maxMove;
      x.set(-Math.cos(angle) * moveDistance);
      y.set(-Math.sin(angle) * moveDistance);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleLogin = () => {
    if (isCorrect) {
      onAuthenticated();
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEF9F2] px-4" onMouseMove={handleMouseMove}>
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border-2 border-yellow-200/50"
          variants={itemVariants}
        >
          <div className="text-center">
            <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-3xl font-bold font-headline text-zinc-900">
              Admin Access
            </h1>
            <p className="mt-2 text-zinc-600">
              Please enter the passkey to proceed.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="relative">
              <Input
                type="password"
                placeholder="Enter Passkey"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className={cn(
                  'h-12 text-lg text-center tracking-widest',
                  isWrong ? 'animate-shake border-red-500' : ''
                )}
              />
            </div>

            <motion.button
              ref={buttonRef}
              onClick={handleLogin}
              style={{ x: springX, y: springY }}
              className={cn(
                'w-full py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-yellow-300',
                isCorrect
                  ? 'bg-zinc-900 text-white hover:bg-zinc-800'
                  : 'bg-zinc-400 text-zinc-100 cursor-not-allowed'
              )}
              disabled={!isCorrect}
              whileTap={{ scale: isCorrect ? 0.95 : 1 }}
            >
              Login
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
