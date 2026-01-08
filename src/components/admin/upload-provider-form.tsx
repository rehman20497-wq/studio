'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { UploadCloud, FileText, Palette, Image as ImageIcon, CheckCircle, Cloud, Cpu, Wifi, Zap } from 'lucide-react';
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

const providerSchema = z.object({
    name: z.string().min(1, 'Provider name is required.'),
    slug: z.string().min(1, 'Provider slug is required.').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.'),
    description: z.string().min(10, 'Description must be at least 10 characters.'),
    solutions: z.array(z.string()).min(1, 'At least one solution must be selected.'),
    logoUrl: z.string().url('Logo is required.'),
    bannerImageUrl: z.string().url('Banner image is optional.').optional(),
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

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoUploadProgress, setLogoUploadProgress] = useState(0);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [bannerUploadProgress, setBannerUploadProgress] = useState(0);

  const { register, handleSubmit, control, setValue, getValues, formState: { errors, isSubmitting } } = useForm<ProviderFormValues>({
      resolver: zodResolver(providerSchema),
      defaultValues: {
          solutions: [],
      }
  });

  const uploadToCloudinary = async (file: File, onProgress: (progress: number) => void): Promise<string> => {
      const formData = new FormData();
      formData.append('file', file);
      // NOTE: This assumes you have an unsigned upload preset named 'unsigned_uploads' in Cloudinary.
      // For signed uploads, a backend endpoint would be necessary to generate the signature.
      formData.append('upload_preset', 'unsigned_uploads');

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
                  const response = JSON.parse(xhr.responseText);
                  reject(new Error(response.error.message || 'Cloudinary upload failed'));
              }
          };

          xhr.onerror = () => {
              reject(new Error('Network error during upload.'));
          };

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
          toast({
              variant: 'destructive',
              title: 'Upload Failed',
              description: error.message || 'Could not upload image.',
          });
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
    try {
        const providersCollection = collection(firestore, 'providers');
        
        await addDocumentNonBlocking(providersCollection, {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        toast({
            title: 'Provider Published!',
            description: `${data.name} has been successfully added to the database.`,
        });
        // Here you would typically reset the form
        // reset();
        // setLogoPreview(null);
        // setBannerPreview(null);
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Submission Failed',
            description: error.message || 'An unexpected error occurred.',
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-16">
      <SectionWrapper title="Provider Logo & Name" step={1} icon={UploadCloud}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <label htmlFor="logo-upload" className="cursor-pointer group">
                    <div className={cn(
                        "w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors",
                        logoPreview ? "border-green-500 bg-green-50" : "border-zinc-300 hover:border-yellow-400 hover:bg-yellow-50",
                        errors.logoUrl && "border-red-500"
                    )}>
                        {logoPreview ? (
                            <div className="relative w-full h-full">
                                <Image src={logoPreview} alt="Logo preview" fill className="object-contain p-4" />
                                {logoUploadProgress > 0 && logoUploadProgress < 100 && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <Progress value={logoUploadProgress} className="w-3/4" />
                                    </div>
                                )}
                                {logoUploadProgress === 100 && (
                                    <div className="absolute top-2 right-2 p-1 bg-white rounded-full">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <UploadCloud className="w-12 h-12 text-zinc-400 group-hover:text-yellow-500 transition-colors" />
                                <p className="mt-2 text-zinc-600">Click to upload logo</p>
                                <p className="text-xs text-zinc-500">Image files up to 5MB</p>
                            </>
                        )}
                    </div>
                </label>
                <input id="logo-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'logoUrl')} accept="image/*" />
                {errors.logoUrl && <p className="text-red-500 text-sm mt-2">{errors.logoUrl.message}</p>}
            </div>
            <div className="space-y-4">
                <div>
                    <label htmlFor="provider-name" className="font-semibold text-zinc-700">Provider Name</label>
                    <Input id="provider-name" placeholder="e.g., Stellar Cloud Services" {...register('name')} />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="provider-slug" className="font-semibold text-zinc-700">Provider Slug</label>
                    <Input id="provider-slug" placeholder="e.g., stellar-cloud" {...register('slug')} />
                    {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
                    <p className="text-xs text-zinc-500 mt-1">This will be used in the URL. Must be unique and lowercase.</p>
                </div>
            </div>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Select Solutions" step={2} icon={Palette}>
         <Controller
            name="solutions"
            control={control}
            render={({ field }) => (
                <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {solutions.map(({ name, icon: Icon }) => {
                        const isSelected = field.value.includes(name);
                        return (
                            <motion.div 
                                key={name}
                                onClick={() => toggleSolution(name)}
                                className={cn(
                                    "relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-300",
                                    isSelected ? "bg-yellow-100 border-yellow-400 shadow-lg" : "bg-zinc-50 hover:border-zinc-300"
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <Icon className={cn("w-10 h-10", isSelected ? "text-yellow-600" : "text-zinc-500")} />
                                    <p className={cn("font-semibold text-center", isSelected ? "text-zinc-900" : "text-zinc-700")}>{name}</p>
                                </div>
                                {isSelected && (
                                    <div className="absolute top-2 right-2 bg-white rounded-full">
                                        <CheckCircle className="w-6 h-6 text-yellow-500" />
                                    </div>
                                )}
                            </motion.div>
                        )
                    })}
                </div>
                {errors.solutions && <p className="text-red-500 text-sm mt-4">{errors.solutions.message}</p>}
                </>
            )}
        />
      </SectionWrapper>
      
      <SectionWrapper title="Provider Description" step={3} icon={FileText}>
        <Controller
            name="description"
            control={control}
            render={({ field }) => (
                <>
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Write a detailed description of the provider..."
                />
                 {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>}
                </>
            )}
        />
      </SectionWrapper>

      <SectionWrapper title="Upload Banner (Optional)" step={4} icon={ImageIcon}>
         <label htmlFor="banner-upload" className="cursor-pointer group">
            <div className={cn("w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors hover:border-yellow-400 hover:bg-yellow-50", bannerPreview ? "border-green-500 bg-green-50" : "border-zinc-300")}>
                {bannerPreview ? (
                     <div className="relative w-full h-full">
                        <Image src={bannerPreview} alt="Banner preview" fill className="object-contain p-4" />
                        {bannerUploadProgress > 0 && bannerUploadProgress < 100 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Progress value={bannerUploadProgress} className="w-3/4" />
                            </div>
                        )}
                        {bannerUploadProgress === 100 && (
                            <div className="absolute top-2 right-2 p-1 bg-white rounded-full">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <UploadCloud className="w-10 h-10 text-zinc-400 group-hover:text-yellow-500 transition-colors" />
                        <p className="mt-2 text-zinc-600">Click to upload a banner image</p>
                        <p className="text-xs text-zinc-500">Recommended size: 1200x400px</p>
                    </>
                )}
            </div>
        </label>
        <input id="banner-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'bannerImageUrl')} accept="image/*" />
      </SectionWrapper>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex justify-end"
    >
        <Button size="lg" type="submit" className="bg-zinc-900 hover:bg-zinc-700 text-white rounded-full px-10 py-6 text-lg font-bold" disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : 'Publish Provider'}
        </Button>
      </motion.div>
    </form>
  );
}
