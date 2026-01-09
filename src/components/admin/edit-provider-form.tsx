
'use client';

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { UploadCloud, FileText, Palette, Image as ImageIcon, CheckCircle, Cloud, Cpu, Wifi, Zap, X, BarChart3 } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Progress } from '../ui/progress';
import RichTextEditor from './rich-text-editor';
import { useFirestore } from '@/firebase';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { doc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { cloudinaryConfig } from '@/lib/cloudinary';

const providerSchema = z.object({
    name: z.string().min(1, 'Provider name is required.'),
    slug: z.string().min(1, 'Provider slug is required.').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.'),
    description: z.string().min(10, 'Description must be at least 10 characters.'),
    solutions: z.array(z.string()).min(1, 'At least one solution must be selected.'),
    logoUrl: z.string().url('Logo is required.'),
    bannerImageUrl: z.string().url('Banner image is optional.').optional().nullable(),
    impressions: z.number().int().min(0).optional(),
    clicks: z.number().int().min(0).optional(),
});

type ProviderFormValues = z.infer<typeof providerSchema>;

type Provider = {
    id: string;
    name: string;
    logoUrl: string;
    slug: string;
    description: string;
    solutions: string[];
    bannerImageUrl?: string;
    impressions?: number;
    clicks?: number;
};

const solutions = [
    { name: 'Cloud Solutions', icon: Cloud },
    { name: 'Communications', icon: Wifi },
    { name: 'AI Solutions', icon: Cpu },
    { name: 'Connectivity', icon: Zap },
];

export default function EditProviderForm({ provider, onFinished }: { provider: Provider; onFinished: () => void }) {
  const { toast } = useToast();
  const firestore = useFirestore();

  const [logoPreview, setLogoPreview] = useState<string | null>(provider.logoUrl);
  const [logoUploadProgress, setLogoUploadProgress] = useState(0);
  const [bannerPreview, setBannerPreview] = useState<string | null>(provider.bannerImageUrl || null);
  const [bannerUploadProgress, setBannerUploadProgress] = useState(0);

  const { register, handleSubmit, control, setValue, getValues, formState: { errors, isSubmitting } } = useForm<ProviderFormValues>({
      resolver: zodResolver(providerSchema),
      defaultValues: {
          ...provider,
          bannerImageUrl: provider.bannerImageUrl || null,
          impressions: provider.impressions || 0,
          clicks: provider.clicks || 0,
      }
  });

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

  const removeImage = (fieldName: 'logoUrl' | 'bannerImageUrl') => {
    if (fieldName === 'logoUrl') {
        setLogoPreview(null);
        setValue('logoUrl', '', { shouldValidate: true });
    } else {
        setBannerPreview(null);
        setValue('bannerImageUrl', null, { shouldValidate: true });
    }
  }

  const toggleSolution = (solutionName: string) => {
    const currentSolutions = getValues('solutions');
    const newSolutions = currentSolutions.includes(solutionName)
        ? currentSolutions.filter(s => s !== solutionName)
        : [...currentSolutions, solutionName];
    setValue('solutions', newSolutions, { shouldValidate: true });
  }

  const onSubmit = async (data: ProviderFormValues) => {
    if (!firestore) {
        toast({
            variant: 'destructive',
            title: 'Firestore not available',
            description: 'Could not connect to the database. Please try again.',
        });
        return;
    }
    try {
        const providerRef = doc(firestore, 'providers', provider.id);
        
        await updateDocumentNonBlocking(providerRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });

        toast({
            title: 'Provider Updated!',
            description: `${data.name} has been successfully saved.`,
        });
        
        onFinished();
    } catch (error: any) {
         toast({
            variant: 'destructive',
            title: 'Update Failed',
            description: error.message || 'An unexpected error occurred.',
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-1">
      {/* Provider Logo & Name */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-2">
                <label className="font-semibold text-zinc-700">Provider Logo</label>
                 <div className={cn(
                        "w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors relative group",
                        logoPreview ? "border-green-500 bg-green-50" : "border-zinc-300 hover:border-yellow-400 hover:bg-yellow-50",
                        errors.logoUrl && "border-red-500"
                    )}>
                        {logoPreview ? (
                            <>
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
                                <Button size="icon" variant="destructive" className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeImage('logoUrl')}><X className="w-4 h-4" /></Button>
                            </>
                        ) : (
                            <label htmlFor="logo-upload-edit" className="cursor-pointer text-center">
                                <UploadCloud className="w-12 h-12 text-zinc-400 mx-auto group-hover:text-yellow-500 transition-colors" />
                                <p className="mt-2 text-zinc-600">Click to upload logo</p>
                                <p className="text-xs text-zinc-500">Any image format up to 5MB</p>
                            </label>
                        )}
                    </div>
                <input id="logo-upload-edit" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'logoUrl')} accept="image/*" />
                {errors.logoUrl && <p className="text-red-500 text-sm mt-2">{errors.logoUrl.message}</p>}
            </div>
            <div className="space-y-4">
                <div>
                    <label htmlFor="provider-name-edit" className="font-semibold text-zinc-700">Provider Name</label>
                    <Input id="provider-name-edit" placeholder="e.g., Stellar Cloud Services" {...register('name')} />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="provider-slug-edit" className="font-semibold text-zinc-700">Provider Slug</label>
                    <Input id="provider-slug-edit" placeholder="e.g., stellar-cloud" {...register('slug')} />
                    {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
                    <p className="text-xs text-zinc-500 mt-1">This will be used in the URL. Must be unique and lowercase.</p>
                </div>
            </div>
      </div>

      {/* Select Solutions */}
      <div>
         <label className="font-semibold text-zinc-700">Select Solutions</label>
         <Controller
            name="solutions"
            control={control}
            render={({ field }) => (
                <div className="mt-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {solutions.map(({ name, icon: Icon }) => {
                        const isSelected = field.value.includes(name);
                        return (
                            <div 
                                key={name}
                                onClick={() => toggleSolution(name)}
                                className={cn(
                                    "relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-300",
                                    isSelected ? "bg-yellow-100 border-yellow-400 shadow-lg" : "bg-zinc-50 hover:border-zinc-300 hover:bg-yellow-50",
                                )}
                            >
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <Icon className={cn("w-8 h-8", isSelected ? "text-yellow-600" : "text-zinc-500")} />
                                    <p className={cn("font-semibold text-center text-sm", isSelected ? "text-zinc-900" : "text-zinc-700")}>{name}</p>
                                </div>
                                {isSelected && (
                                    <div className="absolute top-2 right-2 bg-white rounded-full">
                                        <CheckCircle className="w-5 h-5 text-yellow-500" />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
                {errors.solutions && <p className="text-red-500 text-sm mt-4">{errors.solutions.message}</p>}
                </div>
            )}
        />
      </div>
      
      {/* Provider Description */}
      <div>
        <label className="font-semibold text-zinc-700">Provider Description</label>
        <Controller
            name="description"
            control={control}
            render={({ field }) => (
                <div className="mt-2">
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Write a detailed description of the provider..."
                />
                 {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description.message}</p>}
                </div>
            )}
        />
      </div>

      {/* Upload Banner */}
      <div>
         <label className="font-semibold text-zinc-700">Banner (Optional)</label>
         <div className={cn("mt-2 w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors relative group", bannerPreview ? "border-green-500 bg-green-50" : "border-zinc-300 hover:border-yellow-400 hover:bg-yellow-50")}>
            {bannerPreview ? (
                <>
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
                    <Button size="icon" variant="destructive" className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeImage('bannerImageUrl')}><X className="w-4 h-4" /></Button>
                </>
            ) : (
                <label htmlFor="banner-upload-edit" className="cursor-pointer text-center">
                    <UploadCloud className="w-10 h-10 text-zinc-400 mx-auto group-hover:text-yellow-500 transition-colors" />
                    <p className="mt-2 text-zinc-600">Click to upload a banner image</p>
                    <p className="text-xs text-zinc-500">Recommended size: 1200x400px</p>
                </label>
            )}
        </div>
        <input id="banner-upload-edit" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'bannerImageUrl')} accept="image/*" />
      </div>

       {/* Stats Section */}
       <div>
         <label className="font-semibold text-zinc-700">Provider Analytics</label>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label htmlFor="impressions" className="font-medium text-sm text-zinc-600">Impressions</label>
            <Input id="impressions" type="number" placeholder="e.g., 1250345" {...register('impressions', { valueAsNumber: true })} />
            {errors.impressions && <p className="text-red-500 text-sm mt-1">{errors.impressions.message}</p>}
            </div>
            <div>
            <label htmlFor="clicks" className="font-medium text-sm text-zinc-600">Clicks</label>
            <Input id="clicks" type="number" placeholder="e.g., 8432" {...register('clicks', { valueAsNumber: true })} />
            {errors.clicks && <p className="text-red-500 text-sm mt-1">{errors.clicks.message}</p>}
            </div>
        </div>
       </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onFinished}>Cancel</Button>
        <Button type="submit" className="bg-zinc-900 hover:bg-zinc-700 text-white" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
