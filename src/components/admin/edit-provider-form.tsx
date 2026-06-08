
'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { UploadCloud, FileText, Palette, Image as ImageIcon, CheckCircle, Cloud, Cpu, Wifi, Zap, X, BarChart3, Search, MessageSquare, Plus, Trash2 } from 'lucide-react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
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
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const providerSchema = z.object({
    name: z.string().min(1, 'Provider name is required.'),
    slug: z.string().min(1, 'Provider slug is required.').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.'),
    description: z.string().min(10, 'Description must be at least 10 characters.'),
    solutions: z.array(z.string()).min(1, 'At least one solution must be selected.'),
    logoUrl: z.string().url('Logo is required.'),
    bannerImageUrl: z.string().url('Banner image is optional.').optional().nullable(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().max(160, 'Meta description should be under 160 characters').optional(),
    primaryKeyword: z.string().optional(),
    secondaryKeywords: z.string().optional(),
    tags: z.string().optional(),
    faqs: z.array(z.object({
      question: z.string().min(1, 'Question is required'),
      answer: z.string().min(1, 'Answer is required')
    })).optional()
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
    metaTitle?: string;
    metaDescription?: string;
    primaryKeyword?: string;
    secondaryKeywords?: string[];
    tags?: string[];
    faqs?: { question: string; answer: string }[];
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

  const { register, handleSubmit, control, setValue, getValues, watch, formState: { errors, isSubmitting } } = useForm<ProviderFormValues>({
      resolver: zodResolver(providerSchema),
      defaultValues: {
          ...provider,
          bannerImageUrl: provider.bannerImageUrl || null,
          metaTitle: provider.metaTitle || '',
          metaDescription: provider.metaDescription || '',
          primaryKeyword: provider.primaryKeyword || '',
          secondaryKeywords: provider.secondaryKeywords?.join(', ') || '',
          tags: provider.tags?.join(', ') || '',
          faqs: provider.faqs || [{ question: '', answer: '' }]
      }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs"
  });

  const metaDescription = watch('metaDescription');

  const uploadToCloudinary = async (file: File, onProgress: (progress: number) => void): Promise<string> => {
      if (!cloudinaryConfig.uploadPreset) {
        throw new Error('Cloudinary upload preset is not configured.');
      }
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
          xhr.onerror = () => reject(new Error('Network error during upload.'));
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
        const providerRef = doc(firestore, 'providers', provider.id);
        const secondaryKeywordsArray = data.secondaryKeywords ? data.secondaryKeywords.split(',').map(k => k.trim()) : [];
        const tagsArray = data.tags ? data.tags.split(',').map(t => t.trim()) : [];
        
        await updateDocumentNonBlocking(providerRef, {
            ...data,
            secondaryKeywords: secondaryKeywordsArray,
            tags: tagsArray,
            updatedAt: serverTimestamp(),
        });
        toast({ title: 'Provider Updated!', description: `${data.name} saved.` });
        onFinished();
    } catch (error: any) {
         toast({ variant: 'destructive', title: 'Update Failed', description: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-1">
      <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-2">
                <label className="font-semibold text-zinc-700">Provider Logo</label>
                 <div className={cn(
                        "w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors relative group",
                        logoPreview ? "border-green-500 bg-green-50" : "border-zinc-300 hover:border-yellow-400 hover:bg-yellow-50",
                        errors.logoUrl && "border-red-500"
                    )}>
                        {logoPreview ? (
                            <Image src={logoPreview} alt="Logo" fill className="object-contain p-4" />
                        ) : (
                            <label htmlFor="logo-upload-edit" className="cursor-pointer text-center">
                                <UploadCloud className="w-12 h-12 text-zinc-400 mx-auto" />
                                <p className="mt-2 text-zinc-600">Click to upload logo</p>
                            </label>
                        )}
                    </div>
                <input id="logo-upload-edit" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'logoUrl')} accept="image/*" />
            </div>
            <div className="space-y-4">
                <Input placeholder="Provider Name" {...register('name')} />
                <Input placeholder="Provider Slug" {...register('slug')} />
            </div>
      </div>

      <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2"><Search className="w-5 h-5 text-yellow-600" /> Advanced SEO</h3>
          <Input placeholder="SEO Meta Title" {...register('metaTitle')} />
          <div>
              <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-semibold text-zinc-700">Meta Description</label>
                  <span className={cn("text-xs", (metaDescription?.length || 0) > 160 ? "text-red-500" : "text-zinc-500")}>
                      {metaDescription?.length || 0}/160
                  </span>
              </div>
              <Textarea placeholder="Search result summary..." {...register('metaDescription')} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Primary Keyword" {...register('primaryKeyword')} />
              <Input placeholder="Secondary Keywords (comma separated)" {...register('secondaryKeywords')} />
          </div>
          <Input placeholder="SEO Tags (comma separated)" {...register('tags')} />
      </div>

      <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2"><MessageSquare className="w-5 h-5 text-yellow-600" /> FAQ Section (Structured Data)</h3>
          <div className="space-y-4">
              <Accordion type="multiple" className="w-full">
                  {fields.map((field, index) => (
                      <AccordionItem key={field.id} value={`faq-${index}`} className="border rounded-xl px-4 mb-2 bg-white">
                          <AccordionTrigger className="hover:no-underline">
                              <div className="flex items-center gap-2 text-left">
                                  <span className="bg-yellow-100 text-yellow-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{index + 1}</span>
                                  <span>{watch(`faqs.${index}.question`) || "New FAQ Question"}</span>
                              </div>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4 pt-2">
                              <Input {...register(`faqs.${index}.question` as const)} placeholder="Question" />
                              <Textarea {...register(`faqs.${index}.answer` as const)} placeholder="Answer" rows={3} />
                              <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)} className="w-full mt-2">
                                  <Trash2 className="w-4 h-4 mr-2" /> Remove FAQ
                              </Button>
                          </AccordionContent>
                      </AccordionItem>
                  ))}
              </Accordion>
              <Button type="button" variant="outline" onClick={() => append({ question: '', answer: '' })} className="w-full border-dashed py-4 bg-white border-zinc-300">
                  <Plus className="w-4 h-4 mr-2" /> Add FAQ Item
              </Button>
          </div>
      </div>

      <div>
         <label className="font-semibold text-zinc-700">Select Solutions</label>
         <Controller
            name="solutions"
            control={control}
            render={({ field }) => (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
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
      </div>
      
      <div>
        <label className="font-semibold text-zinc-700">Provider Description</label>
        <Controller
            name="description"
            control={control}
            render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} />
            )}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onFinished}>Cancel</Button>
        <Button type="submit" className="bg-zinc-900 hover:bg-zinc-700 text-white" disabled={isSubmitting}>
            Save Changes
        </Button>
      </div>
    </form>
  );
}
