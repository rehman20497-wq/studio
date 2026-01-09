
'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { UploadCloud, FileText, Type, Image as ImageIcon, CheckCircle, User, MessageSquare, BookOpen, Shield } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import RichTextEditor from '@/components/admin/rich-text-editor';
import { useToast } from '@/hooks/use-toast';
import { cloudinaryConfig } from '@/lib/cloudinary';
import AdminPageWrapper from '@/components/admin/admin-page-wrapper';
import AdminHeader from '@/components/admin/admin-header';
import { Textarea } from '@/components/ui/textarea';
import { useFirestore } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection, serverTimestamp } from 'firebase/firestore';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  category: z.string().min(1, 'Category is required.'),
  featuredImageUrl: z.string().url('A featured image is required.'),
  content: z.string().min(50, 'Content must be at least 50 characters.'),
  quote: z.string().optional(),
  authorName: z.string().min(1, "Author's name is required."),
  authorImageUrl: z.string().url("Author's image is required."),
  published: z.boolean().default(false),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

const SectionWrapper = ({
  children,
  title,
  step,
  icon: Icon,
}: {
  children: React.ReactNode;
  title: string;
  step: number;
  icon: React.ElementType;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-zinc-200/50 overflow-hidden"
    >
      <div className="p-6 border-b border-zinc-200/80 flex items-center gap-4">
        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-xl font-headline">
          {step}
        </div>
        <Icon className="w-8 h-8 text-zinc-500" />
        <h2 className="text-2xl font-bold font-headline text-zinc-800">{title}</h2>
      </div>
      <div className="p-8">{children}</div>
    </motion.div>
  );
};

const ImageUploader = ({
  id,
  label,
  subtext,
  preview,
  progress,
  error,
  onFileChange,
}: {
  id: string;
  label: string;
  subtext: string;
  preview: string | null;
  progress: number;
  error?: string;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="cursor-pointer group">
      <div
        className={cn(
          "w-full h-56 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors relative",
          preview ? "border-green-500 bg-green-50" : "border-zinc-300 hover:border-yellow-400 hover:bg-yellow-50",
          error && "border-red-500"
        )}
      >
        {preview ? (
          <>
            <Image src={preview} alt="Preview" fill className="object-contain p-4 rounded-xl" />
            {progress > 0 && progress < 100 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Progress value={progress} className="w-3/4" />
              </div>
            )}
            {progress === 100 && (
              <div className="absolute top-2 right-2 p-1 bg-white rounded-full">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            )}
          </>
        ) : (
          <>
            <UploadCloud className="w-12 h-12 text-zinc-400 group-hover:text-yellow-500 transition-colors" />
            <p className="mt-2 text-zinc-600">{label}</p>
            <p className="text-xs text-zinc-500">{subtext}</p>
          </>
        )}
      </div>
    </label>
    <input id={id} type="file" className="sr-only" onChange={onFileChange} accept="image/*" />
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
  </div>
);


export default function UploadBlogPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const router = useRouter();
  
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);
  const [featuredImageProgress, setFeaturedImageProgress] = useState(0);
  const [authorImagePreview, setAuthorImagePreview] = useState<string | null>(null);
  const [authorImageProgress, setAuthorImageProgress] = useState(0);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const { register, handleSubmit, control, setValue, reset, trigger, formState: { errors, isSubmitting, isValid } } = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    mode: 'onChange', // Validate on change to update isValid status
    defaultValues: {
      published: false,
    },
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isValid || !buttonRef.current) return;

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

  const uploadToCloudinary = async (file: File, onProgress: (progress: number) => void): Promise<string> => {
      if (!cloudinaryConfig.uploadPreset) {
        throw new Error('Cloudinary upload preset is not configured. Please check src/lib/cloudinary.ts');
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);

      return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, true);
          xhr.upload.onprogress = (event) => {
              if (event.lengthComputable) {
                  const percentCompleted = Math.round((event.loaded * 100) / event.total);
                  onProgress(percentCompleted);
              }
          };
          xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                  const response = JSON.parse(xhr.responseText);
                  resolve(response.secure_url);
              } else {
                  reject(new Error('Cloudinary upload failed'));
              }
          };
          xhr.onerror = () => reject(new Error('Network error during upload.'));
          xhr.send(formData);
      });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, fieldName: 'featuredImageUrl' | 'authorImageUrl') => {
      const file = e.target.files?.[0];
      if (!file) return;

      const setPreview = fieldName === 'featuredImageUrl' ? setFeaturedImagePreview : setAuthorImagePreview;
      const setProgress = fieldName === 'featuredImageUrl' ? setFeaturedImageProgress : setAuthorImageProgress;

      setPreview(URL.createObjectURL(file));
      setProgress(0);

      try {
          const imageUrl = await uploadToCloudinary(file, setProgress);
          setValue(fieldName, imageUrl, { shouldValidate: true });
          await trigger(fieldName); // Force re-validation of the specific field
      } catch (error: any) {
          toast({
              variant: 'destructive',
              title: 'Upload Failed',
              description: error.message,
          });
          setPreview(null);
          setProgress(0);
          setValue(fieldName, '', { shouldValidate: true }); // Clear value on error
      }
  };

  const onSubmit = async (data: BlogPostFormValues) => {
    if (!firestore) {
        toast({
            variant: 'destructive',
            title: 'Database connection failed',
            description: 'Could not connect to Firestore. Please try again.',
        });
        return;
    }
    
    try {
        const blogCollection = collection(firestore, 'blog_posts');
        
        await addDocumentNonBlocking(blogCollection, {
            ...data,
            views: 0,
            comments: 0,
            shares: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        toast({
            title: `Blog Post ${data.published ? 'Published' : 'Saved as Draft'}!`,
            description: `"${data.title}" has been successfully saved.`,
        });

        reset();
        setFeaturedImagePreview(null);
        setAuthorImagePreview(null);
        setFeaturedImageProgress(0);
        setAuthorImageProgress(0);
        
        router.push('/admin/manage-blogs');

    } catch (error: any) {
         toast({
            variant: 'destructive',
            title: 'Submission Failed',
            description: error.message || "An unexpected error occurred while saving the post.",
        });
    }
  };

  return (
    <AdminPageWrapper screenTitle="Upload Blog">
        <div className="p-4 sm:p-8 md:p-12">
            <AdminHeader userName="Faizan" />
            <div className="mt-12">
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-16" onMouseMove={handleMouseMove}>
                    <SectionWrapper title="Title & Category" step={1} icon={Type}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="font-semibold text-zinc-700">Blog Title</label>
                                <Input id="title" placeholder="e.g., The Future of AI in Tech" {...register('title')} />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="category" className="font-semibold text-zinc-700">Category</label>
                                <Input id="category" placeholder="e.g., Artificial Intelligence" {...register('category')} />
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                            </div>
                        </div>
                    </SectionWrapper>

                    <SectionWrapper title="Featured Image" step={2} icon={ImageIcon}>
                        <ImageUploader
                          id="featured-image"
                          label="Upload Featured Image"
                          subtext="Recommended size: 1200x630px"
                          preview={featuredImagePreview}
                          progress={featuredImageProgress}
                          error={errors.featuredImageUrl?.message}
                          onFileChange={(e) => handleFileChange(e, 'featuredImageUrl')}
                        />
                    </SectionWrapper>

                    <SectionWrapper title="Content" step={3} icon={FileText}>
                         <Controller
                            name="content"
                            control={control}
                            render={({ field }) => (
                                <>
                                <RichTextEditor
                                  value={field.value || ''}
                                  onChange={field.onChange}
                                  placeholder="Start writing your masterpiece..."
                                />
                                {errors.content && <p className="text-red-500 text-sm mt-2">{errors.content.message}</p>}
                                </>
                            )}
                        />
                    </SectionWrapper>

                    <SectionWrapper title="Pull-Quote (Optional)" step={4} icon={MessageSquare}>
                        <div className="relative">
                            <Textarea 
                                placeholder="Enter a powerful quote to feature in your post..." 
                                {...register('quote')}
                                className="pl-10 text-lg italic"
                            />
                            <div className="absolute top-4 left-3 text-zinc-400">
                              <MessageSquare className="w-5 h-5" />
                            </div>
                        </div>
                    </SectionWrapper>

                    <SectionWrapper title="Author" step={5} icon={User}>
                       <div className="grid md:grid-cols-2 gap-8 items-start">
                           <ImageUploader
                              id="author-image"
                              label="Upload Author's Image"
                              subtext="Square image recommended"
                              preview={authorImagePreview}
                              progress={authorImageProgress}
                              error={errors.authorImageUrl?.message}
                              onFileChange={(e) => handleFileChange(e, 'authorImageUrl')}
                            />
                            <div className="space-y-4">
                                <div>
                                  <label htmlFor="authorName" className="font-semibold text-zinc-700">Author's Name</label>
                                  <Input id="authorName" placeholder="e.g., Jane Doe" {...register('authorName')} />
                                  {errors.authorName && <p className="text-red-500 text-sm mt-1">{errors.authorName.message}</p>}
                                </div>
                            </div>
                       </div>
                    </SectionWrapper>
                    
                    <SectionWrapper title="Publish Status" step={6} icon={Shield}>
                        <Controller
                            name="published"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center space-x-4 p-4 bg-zinc-50 rounded-lg">
                                  <Switch
                                    id="published-status"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                  <Label htmlFor="published-status" className="flex flex-col">
                                    <span className="font-semibold text-zinc-800">
                                      {field.value ? 'Published' : 'Draft'}
                                    </span>
                                    <span className="text-sm text-zinc-600">
                                      {field.value
                                        ? 'This post will be visible to the public.'
                                        : 'This post will be saved as a draft.'}
                                    </span>
                                  </Label>
                                </div>
                            )}
                        />
                    </SectionWrapper>


                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="flex justify-end"
                    >
                        <motion.button
                            ref={buttonRef}
                            style={{ x: springX, y: springY }}
                            type="submit" 
                            className={cn("bg-zinc-900 text-white rounded-full px-10 py-6 text-lg font-bold flex items-center gap-3 transition-all duration-300 ease-out",
                                !isValid || isSubmitting ? 'bg-zinc-400 text-zinc-100 cursor-not-allowed' : 'bg-zinc-900 hover:bg-zinc-700 text-white'
                            )}
                            disabled={!isValid || isSubmitting}
                            whileTap={{ scale: isValid ? 0.95 : 1 }}
                        >
                            <BookOpen className="w-5 h-5"/>
                            {isSubmitting ? 'Submitting...' : 'Submit Post'}
                        </motion.button>
                    </motion.div>
                </form>
            </div>
        </div>
    </AdminPageWrapper>
  );
}
