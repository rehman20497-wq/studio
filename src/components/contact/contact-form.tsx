
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Building, MessageSquare, ArrowRight, ArrowLeft, Send, Check, Home, Info, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sendContactConfirmation } from '@/app/actions/send-contact-confirmation';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const steps = [
    { id: 'Step 1', name: 'Personal Info', fields: ['name', 'email'] },
    { id: 'Step 2', name: 'Company Details', fields: ['companyName', 'service'] },
    { id: 'Step 3', name: 'Your Message', fields: ['message'] },
    { id: 'Step 4', name: 'Confirmation' },
];

const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    companyName: z.string().optional(),
    service: z.string().min(1, 'Please select a service'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof contactSchema>;

const StepProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
    const progress = (currentStep / (totalSteps -1)) * 100;
    return (
        <div className="relative h-10 w-full bg-zinc-200 rounded-full overflow-hidden">
            <motion.div 
                className="absolute h-full rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                <motion.div 
                    className="absolute inset-0 opacity-50 blur-md bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600" 
                    animate={{ x: ['-100%', '100%']}}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />
            </motion.div>
        </div>
    );
};

export default function ContactForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [previousStep, setPreviousStep] = useState(0);
    const { toast } = useToast();

    const buttonRef = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springConfig = { stiffness: 300, damping: 20 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const methods = useForm<FormValues>({
        resolver: zodResolver(contactSchema),
        mode: 'onChange',
    });

    const { handleSubmit, trigger, formState: { errors, isValid, dirtyFields } } = methods;

    const isStepDirty = () => {
        const currentFields = steps[currentStep].fields as (keyof FormValues)[] | undefined;
        if (!currentFields) return false;
        return currentFields.some(field => dirtyFields[field]);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const canSubmit = isValid || isStepDirty();
        if (canSubmit || !buttonRef.current) {
            x.set(0);
            y.set(0);
            return;
        };
    
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


    const next = async () => {
        const fields = steps[currentStep].fields;
        const output = await trigger(fields as (keyof FormValues)[], { shouldFocus: true });
        
        if (!output) return;

        if (currentStep < steps.length - 1) {
            setPreviousStep(currentStep);
            setCurrentStep(step => step + 1);
        }
    };

    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep);
            setCurrentStep(step => step - 1);
        }
    };

    const onSubmit = async (data: FormValues) => {
        try {
            await sendContactConfirmation(data);
            next();
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Failed to send message",
                description: "There was a problem sending your message. Please try again later.",
            });
        }
    };
    
    const delta = currentStep - previousStep;
    const canProceed = isStepDirty() || isValid;

    return (
        <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-zinc-200/50 wavy-gradient-background">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} onMouseMove={handleMouseMove} className="space-y-6 max-w-2xl mx-auto">
                    <div className="mb-8">
                        <StepProgressBar currentStep={currentStep} totalSteps={steps.length} />
                    </div>
                    
                    <div className="overflow-hidden relative h-[300px]">
                        <AnimatePresence initial={false} custom={delta}>
                            <motion.div
                                key={currentStep}
                                custom={delta}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={{
                                    enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
                                    center: { x: '0%', opacity: 1 },
                                    exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="absolute w-full h-full"
                            >
                                {currentStep === 0 && (
                                    <div className="space-y-6">
                                        <div className="relative">
                                            <Label htmlFor="name" className="text-lg font-medium">Your Name</Label>
                                            <User className="absolute left-3 top-1/2 -translate-y-[-10px] w-5 h-5 text-zinc-400" />
                                            <Input id="name" {...methods.register('name')} placeholder="e.g., Jane Doe" className="pl-10 h-12 text-base" />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                        </div>
                                        <div className="relative">
                                            <Label htmlFor="email" className="text-lg font-medium">Email Address</Label>
                                            <Send className="absolute left-3 top-1/2 -translate-y-[-10px] w-5 h-5 text-zinc-400" />
                                            <Input id="email" {...methods.register('email')} placeholder="e.g., jane.doe@example.com" className="pl-10 h-12 text-base" />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                        </div>
                                    </div>
                                )}
                                {currentStep === 1 && (
                                     <div className="space-y-6">
                                         <div className="relative">
                                             <Label htmlFor="companyName" className="text-lg font-medium">Company Name</Label>
                                             <Building className="absolute left-3 top-1/2 -translate-y-[-10px] w-5 h-5 text-zinc-400" />
                                             <Input id="companyName" {...methods.register('companyName')} placeholder="e.g., Acme Inc." className="pl-10 h-12 text-base" />
                                         </div>
                                         <div>
                                            <Label htmlFor="service" className="text-lg font-medium">Service of Interest</Label>
                                            <Select onValueChange={(value) => methods.setValue('service', value, { shouldValidate: true })}>
                                                <SelectTrigger className="h-12 text-base">
                                                    <SelectValue placeholder="Select a service" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="UCaaS, CcaaS and CX">UCaaS, CcaaS and CX</SelectItem>
                                                    <SelectItem value="Security Solutions">Security Solutions</SelectItem>
                                                    <SelectItem value="Cloud Solutions">Cloud Solutions</SelectItem>
                                                    <SelectItem value="Ai Solutions"> Ai Solutions</SelectItem>
                                                    <SelectItem value="Connectivity"> Connectivity</SelectItem>
                                                    <SelectItem value="Others"> Others</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>}
                                        </div>
                                     </div>
                                )}
                                {currentStep === 2 && (
                                    <div className="relative">
                                        <Label htmlFor="message" className="text-lg font-medium">Your Message</Label>
                                        <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-zinc-400" />
                                        <Textarea id="message" {...methods.register('message')} placeholder="How can we help you?" className="pl-10 text-base" rows={7} />
                                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                                    </div>
                                )}
                                {currentStep === 3 && (
                                    <motion.div
                                        className="text-center"
                                        variants={{
                                            center: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
                                        }}
                                    >
                                        <motion.div
                                            initial={{ scale: 0, rotate: -90 }}
                                            animate={{ scale: 1, rotate: 0, transition: { delay: 0.2, type: 'spring', stiffness: 150 } }}
                                        >
                                            <Check className="w-20 h-20 mx-auto bg-green-100 text-green-600 rounded-full p-3" />
                                        </motion.div>
                                        <motion.h2 className="text-3xl font-bold mt-4 font-headline" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>Message Sent!</motion.h2>
                                        <motion.p className="text-zinc-600 mt-2" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}>Thank you for reaching out. We'll be in touch shortly. In the meantime, feel free to explore our site.</motion.p>
                                        
                                        <motion.div
                                            className="mt-8 flex justify-center gap-4"
                                            variants={{
                                                center: { transition: { staggerChildren: 0.2, delayChildren: 0.6 } }
                                            }}
                                        >
                                            <motion.div variants={{ enter: { y: 20, opacity: 0 }, center: { y: 0, opacity: 1 } }}>
                                                <Link href="/" className="flex flex-col items-center gap-2 group">
                                                    <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-200 transition-colors"><Home /></div>
                                                    <span className="text-sm font-medium text-zinc-700">Home</span>
                                                </Link>
                                            </motion.div>
                                            <motion.div variants={{ enter: { y: 20, opacity: 0 }, center: { y: 0, opacity: 1 } }}>
                                                <Link href="/about" className="flex flex-col items-center gap-2 group">
                                                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 group-hover:bg-pink-200 transition-colors"><Info /></div>
                                                    <span className="text-sm font-medium text-zinc-700">About Us</span>
                                                </Link>
                                            </motion.div>
                                            <motion.div variants={{ enter: { y: 20, opacity: 0 }, center: { y: 0, opacity: 1 } }}>
                                                <Link href="/blogs" className="flex flex-col items-center gap-2 group">
                                                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-200 transition-colors"><BookOpen /></div>
                                                    <span className="text-sm font-medium text-zinc-700">Our Blog</span>
                                                </Link>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="pt-2 flex justify-end">
                        {currentStep > 0 && currentStep < steps.length -1 && (
                            <Button type="button" onClick={prev} variant="outline" size="lg" className="rounded-full mr-auto">
                                <ArrowLeft className="mr-2" />
                                Back
                            </Button>
                        )}
                        {currentStep < steps.length - 2 && (
                             <motion.button
                                ref={buttonRef}
                                type="button"
                                onClick={next}
                                style={{ x: springX, y: springY }}
                                whileTap={{ scale: canProceed ? 0.95 : 1 }}
                                className={cn(
                                    "rounded-full px-6 py-2.5 text-lg font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-yellow-300 flex items-center",
                                    !canProceed
                                    ? 'bg-zinc-400 text-zinc-100 cursor-not-allowed'
                                    : 'bg-zinc-900 text-white hover:bg-zinc-800'
                                )}
                                disabled={!canProceed}
                             >
                                Next
                                <ArrowRight className="ml-2" />
                            </motion.button>
                        )}
                        {currentStep === steps.length - 2 && (
                            <motion.button
                                ref={buttonRef}
                                type="submit"
                                style={{ x: springX, y: springY }}
                                whileTap={{ scale: canProceed ? 0.95 : 1 }}
                                className={cn(
                                    "rounded-full px-6 py-2.5 text-lg font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-yellow-300 flex items-center",
                                    !canProceed
                                    ? 'bg-zinc-400 text-zinc-100 cursor-not-allowed'
                                    : 'bg-zinc-900 text-white hover:bg-zinc-800'
                                )}
                                disabled={!canProceed}
                            >
                                Submit
                                <Send className="ml-2" />
                            </motion.button>
                        )}
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
    