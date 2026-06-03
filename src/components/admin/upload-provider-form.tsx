
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { UploadCloud, FileText, Palette, Image as ImageIcon, CheckCircle, Cloud, Cpu, Wifi, Zap, BarChart3, Search, Tag, Globe } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Progress } from '../ui/progress';
import RichTextEditor from './rich-text-editor';
import { useFirestore } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { cloudinaryConfig } from '@/lib/cloudinary';
import { useRouter } from 'next/navigation';
import { Textarea } from '../ui/textarea';

const providerSchema = z.object({
    name: z.string().min(1, 'Provider name is required.'),
    slug: z.string().min(1, 'Provider slug is required.').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.'),
    description: z.string().min(10, 'Description must be at least 10 characters.'),
    solutions: z.array(z.string()).min(1, 'At least one solution must be selected.'),
    logoUrl: z.string().url('Logo is required.'),
    bannerImageUrl: z.string().url('Banner image is optional.').optional(),
    impressions: z.number().int().min(0).optional(),
    clicks: z.number().int().min(0).optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.string().optional(),
    tags: z.string().optional(),
});

type ProviderFormValues = z.infer<typeof providerSchema>;

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
  const isInView = useInView(ref, { once: true, amount: 0.4 });
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

const solutions = [
    { name: 'Cloud Solutions', icon: Cloud },
    { name: 'Communications', icon: Wifi },
    { name: 'AI Solutions', icon: Cpu },
    { name: 'Connectivity', icon: Zap },
];

export default function UploadProviderForm() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const router = useRouter();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoUploadProgress, setLogoUploadProgress] = useState(0);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [bannerUploadProgress, setBannerUploadProgress] = useState(0);

  const { register, handleSubmit, control, setValue, getValues, formState: { errors, isSubmitting } } = useForm<ProviderFormValues>({
      resolver: zodResolver(providerSchema),
      defaultValues: { solutions: [], impressions: 0, clicks: 0 }
  });

  const uploadToCloudinary = async (file: File, onProgress: (progress: number) => void): Promise<string> => {
      if (!cloudinaryConfig.uploadPreset) throw new Error('Cloudinary preset missing.');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);
      return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, true);
          xhr.upload.onprogress = (event) => {
              if (event.lengthComputable) onProgress(Math.round((event.loaded * 100) / event.total));
          };
          xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText).secure_url);
              else reject(new Error('Cloudinary upload failed'));
          };
          xhr.onerror = () => reject(new Error('Network error.'));
          xhr.send(formData);
      });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, fieldName: 'logoUrl' | 'bannerImageUrl') => {
      const file = e.target.files?.[0];
      if (!file) return;
      const setPreview = fieldName === 'logoUrl' ? setLogoPreview : setBannerPreview;
      const setProgress = fieldName === 'logoUrl' ? setLogoUploadProgress : setBannerUploadProgress;
      setPreview(URL.createObjectURL(file));
      setProgress(0);
      try {
          const imageUrl = await uploadToCloudinary(file, setProgress);
          setValue(fieldName, imageUrl, { shouldValidate: true });
      } catch (error: any) {
          toast({ variant: 'destructive', title: 'Upload Failed', description: error.message });
          setProgress(0);
          setPreview(null);
      }
  };

  const toggleSolution = (solutionName: string) => {
    const currentSolutions = getValues('solutions');
    const newSolutions = currentSolutions.includes(solutionName)
        ? currentSolutions.filter(s => s !== solutionName)
        : [...currentSolutions, solutionName];
    setValue('solutions', newSolutions, { shouldValidate: true });
  }

  const onSubmit = async (data: ProviderFormValues) => {
    if (!firestore) return;
    try {
        const providersCollection = collection(firestore, 'providers');
        const keywordsArray = data.keywords ? data.keywords.split(',').map(k => k.trim()) : [];
        const tagsArray = data.tags ? data.tags.split(',').map(t => t.trim()) : [];
        await addDocumentNonBlocking(providersCollection, {
            ...data,
            keywords: keywordsArray,
            tags: tagsArray,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            published: true,
        });
        toast({ title: 'Provider Published!', description: `${data.name} added.` });
        router.push('/admin/manage');
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Submission Failed', description: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-16">
      <SectionWrapper title="Provider Logo & Name" step={1} icon={UploadCloud}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <label htmlFor="logo-upload" className="cursor-pointer group">
                    <div className={cn("w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center", logoPreview ? "border-green-500 bg-green-50" : "border-zinc-300", errors.logoUrl && "border-red-500")}>
                        {logoPreview ? (
                            <div className="relative w-full h-full">
                                <Image src={logoPreview} alt="Logo" fill className="object-contain p-4" />
                            </div>
                        ) : (
                            <>
                                <UploadCloud className="w-12 h-12 text-zinc-400" />
                                <p className="mt-2 text-zinc-600">Click to upload logo</p>
                            </>
                        )}
                    </div>
                </label>
                <input id="logo-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'logoUrl')} accept="image/*" />
            </div>
            <div className="space-y-4">
                <Input placeholder="Provider Name" {...register('name')} />
                <Input placeholder="Provider Slug" {...register('slug')} />
            </div>
        </div>
      </SectionWrapper>

      <SectionWrapper title="SEO Configuration" step={2} icon={Globe}>
        <div className="space-y-4">
            <Input placeholder="SEO Meta Title" {...register('metaTitle')} />
            <Textarea placeholder="SEO Meta Description" {...register('metaDescription')} />
            <Input placeholder="Keywords (comma separated)" {...register('keywords')} />
            <Input placeholder="Tags (comma separated)" {...register('tags')} />
        </div>
      </SectionWrapper>

      <SectionWrapper title="Select Solutions" step={3} icon={Palette}>
         <Controller
            name="solutions"
            control={control}
            render={({ field }) => (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {solutions.map(({ name, icon: Icon }) => (
                        <div 
                            key={name}
                            onClick={() => toggleSolution(name)}
                            className={cn("cursor-pointer p-6 rounded-xl border-2 transition-all", field.value.includes(name) ? "bg-yellow-100 border-yellow-400" : "bg-zinc-50 border-transparent")}
                        >
                            <div className="flex flex-col items-center gap-3">
                                <Icon className="w-8 h-8" />
                                <p className="text-sm font-semibold">{name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        />
      </SectionWrapper>
      
      <SectionWrapper title="Description" step={4} icon={FileText}>
        <Controller
            name="description"
            control={control}
            render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} />
            )}
        />
      </SectionWrapper>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex justify-end">
        <Button size="lg" type="submit" className="bg-zinc-900 text-white rounded-full px-10">
            Publish Provider
        </Button>
      </motion.div>
    </form>
  );
}
