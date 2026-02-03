'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RichTextEditor from './rich-text-editor';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast';
import { sendBulkNewsletter } from '@/app/actions/send-bulk-newsletter';
import { Loader2, Send } from 'lucide-react';

const newsletterSchema = z.object({
  subject: z.string().min(1, 'Subject is required.'),
  body: z.string().min(20, 'Email body must be at least 20 characters.'),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

interface ComposeNewsletterDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function ComposeNewsletterDialog({ isOpen, onOpenChange }: ComposeNewsletterDialogProps) {
  const { toast } = useToast();
  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const handleClose = () => {
    reset();
    onOpenChange(false);
  }

  const onSubmit = async (data: NewsletterFormValues) => {
    try {
        const result = await sendBulkNewsletter(data);
        toast({
            title: 'Newsletter Sent!',
            description: result.message,
        });
        handleClose();
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Failed to Send Newsletter',
            description: error.message || 'An unexpected error occurred.',
        });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Compose Newsletter</DialogTitle>
          <DialogDescription>
            Create and send an email to all your newsletter subscribers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full gap-4 pr-2">
        <div className="flex-grow overflow-y-auto flex flex-col gap-4">
  <div>
    <Label htmlFor="subject">Subject</Label>
    <Input id="subject" {...register('subject')} />
    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
  </div>

  <div className='flex-grow flex flex-col min-h-0'>
    <Label>Body</Label>
    <Controller
      name="body"
      control={control}
      render={({ field }) => (
        <div className='flex-grow relative'>
            <RichTextEditor
              value={field.value || ''}
              onChange={field.onChange}
              placeholder="Write your newsletter content here..."
            />
        </div>
      )}
    />
    {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>}
  </div>
</div>


          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send to All
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
