
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { sendNewsletterConfirmation } from '@/app/actions/send-newsletter-confirmation';

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export default function NewsletterSignup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const firestore = useFirestore();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit: SubmitHandler<NewsletterFormValues> = async (data) => {
    if (!firestore) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not connect to the database. Please try again later.",
      });
      return;
    }

    try {
      const subscribersCollection = collection(firestore, 'newsletter_subscribers');
      await addDocumentNonBlocking(subscribersCollection, {
        email: data.email,
        createdAt: serverTimestamp(),
      });
      
      await sendNewsletterConfirmation(data.email);

      toast({
        title: "Subscribed!",
        description: "Thanks for signing up! Please check your email for a confirmation.",
      });
      reset();

    } catch (error) {
      console.error("Newsletter signup error:", error);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <motion.section
      ref={ref}
      className="py-0 px-[3%] mt-0"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="max-w-3xl mx-auto bg-yellow-100/50 rounded-2xl p-6 border border-yellow-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-lg text-zinc-800 font-medium text-center sm:text-left">
          Sign up to our newsletter and stay hip.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 bg-white rounded-full p-1 border border-zinc-200 w-full sm:w-64">
          <Input
            type="email"
            {...register("email")}
            placeholder="Enter Email"
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-sm flex-grow"
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full bg-cyan-200 hover:bg-cyan-300 text-black flex-shrink-0"
            disabled={isSubmitting}
          >
            <Send className="w-4 h-4 -rotate-45 -translate-x-px" />
          </Button>
        </form>
         {errors.email && <p className="text-red-500 text-xs mt-1 sm:hidden">{errors.email.message}</p>}
      </div>
       {errors.email && <p className="text-red-500 text-xs mt-2 text-center hidden sm:block">{errors.email.message}</p>}
    </motion.section>
  );
}

    
