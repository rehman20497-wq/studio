
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Building, MessageSquare, ArrowRight, ArrowLeft, Send, Check } from 'lucide-react';

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
        <div className="relative h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
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

    const methods = useForm<FormValues>({
        resolver: zodResolver(contactSchema),
        mode: 'onChange',
    });

    const { handleSubmit, trigger, formState: { errors } } = methods;

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

    const onSubmit = (data: FormValues) => {
        console.log(data);
        next();
    };
    
    const delta = currentStep - previousStep;

    return (
        <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-zinc-200/50 wavy-gradient-background">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
                    <div className="mb-8">
                        <StepProgressBar currentStep={currentStep} totalSteps={steps.length} />
                    </div>
                    
                    <div className="overflow-hidden relative h-80">
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
                                className="absolute w-full"
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
                                             <Label htmlFor="companyName" className="text-lg font-medium">Company Name (Optional)</Label>
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
                                                    <SelectItem value="Customer Support">Customer Support</SelectItem>
                                                    <SelectItem value="Digital Operations">Digital Operations</SelectItem>
                                                    <SelectItem value="Trust & Safety">Trust & Safety</SelectItem>
                                                    <SelectItem value="Data & AI">Data & AI</SelectItem>
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
                                    <div className="text-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1, transition: { delay: 0.2, type: 'spring' } }}
                                        >
                                            <Check className="w-24 h-24 mx-auto bg-green-100 text-green-600 rounded-full p-4" />
                                        </motion.div>
                                        <h2 className="text-2xl font-bold mt-4">Thank you!</h2>
                                        <p className="text-zinc-600 mt-2">Your message has been sent. We'll be in touch shortly.</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="pt-5 flex justify-between">
                        {currentStep > 0 && currentStep < steps.length -1 && (
                            <Button type="button" onClick={prev} variant="outline" size="lg" className="rounded-full">
                                <ArrowLeft className="mr-2" />
                                Back
                            </Button>
                        )}
                        <div className="flex-grow" />
                        {currentStep < steps.length - 2 && (
                             <Button type="button" onClick={next} size="lg" className="rounded-full bg-zinc-900 text-white hover:bg-zinc-700">
                                Next
                                <ArrowRight className="ml-2" />
                            </Button>
                        )}
                        {currentStep === steps.length - 2 && (
                            <Button type="submit" size="lg" className="rounded-full bg-zinc-900 text-white hover:bg-zinc-700">
                                Submit
                                <Send className="ml-2" />
                            </Button>
                        )}
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
