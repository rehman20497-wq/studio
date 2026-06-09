'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { UploadCloud, FileText, Type, Image as ImageIcon, CheckCircle, User, MessageSquare, Shield, X, Globe, Search, Tag, Plus, Trash2 } from 'lucide-react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import RichTextEditor from '@/components/admin/rich-text-editor';
import { useToast } from '@/hooks/use-toast';
import { cloudinaryConfig } from '@/lib/cloudinary';
import { Textarea } from '@/components/ui/textarea';
import { useFirestore } from '@/firebase';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { doc, serverTimestamp } from 'firebase/firestore';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  slug: z.string().min(1, 'Slug is required.').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.'),
  category: z.string().min(1, 'Category is required.'),
  featuredImageUrl: z.string().url('A featured image is required.'),
  content: z.string().min(50, 'Content must be at least 50 characters.'),
  quote: z.string().optional().nullable(),
  authorName: z.string().min(1, "Author's name is required."),
  authorImageUrl: z.string().url("Author's image is required."),
  published: z.boolean().default(false),
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

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

type BlogPost = {
  id: string;
  title: string;
  slug?: string;
  category: string;
  featuredImageUrl: string;
  content: string;
  quote?: string | null;
  authorName: string;
  authorImageUrl: string;
  published?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  tags?: string[];
  faqs?: { question: string; answer: string }[];
};

export default function EditBlogForm({ post, onFinished }: { post: BlogPost; onFinished: () => void }) {
  const { toast } = useToast();
  const firestore = useFirestore();
  
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(post.featuredImageUrl);
  const [featuredImageProgress, setFeaturedImageProgress] = useState(0);
  const [authorImagePreview, setAuthorImagePreview] = useState<string | null>(post.authorImageUrl);
  const [authorImageProgress, setAuthorImageProgress] = useState(0);

  const { register, handleSubmit, control, setValue, watch, trigger, formState: { errors, isSubmitting } } = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: post.title,
      slug: post.slug || post.id,
      category: post.category,
      featuredImageUrl: post.featuredImageUrl,
      content: post.content,
      quote: post.quote || '',
      authorName: post.authorName,
      authorImageUrl: post.authorImageUrl,
      published: post.published ?? false,
      metaTitle: post.metaTitle || '',
      metaDescription: post.metaDescription || '',
      primaryKeyword: post.primaryKeyword || '',
      secondaryKeywords: post.secondaryKeywords?.join(', ') || '',
      tags: post.tags?.join(', ') || '',
      faqs: post.faqs || [{ question: '', answer: '' }]
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs"
  });

  const title = watch('title');
  const metaDescription = watch('metaDescription');

  useEffect(() => {
    if (title && !post.slug) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setValue('slug', generatedSlug, { shouldValidate: true });
    }
  }, [title, post.slug, setValue]);

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
          await trigger(fieldName);
      } catch (error: any) {
          toast({ variant: 'destructive', title: 'Upload Failed', description: error.message });
          setPreview(null);
          setProgress(0);
          setValue(fieldName, '', { shouldValidate: true });
      }
  };

  const onSubmit = async (data: BlogPostFormValues) => {
    if (!firestore) {
        toast({ variant: 'destructive', title: 'Database connection failed' });
        return;
    }
    try {
        const postRef = doc(firestore, 'blog_posts', post.id);
        const secondaryKeywordsArray = data.secondaryKeywords ? data.secondaryKeywords.split(',').map(k => k.trim()) : [];
        const tagsArray = data.tags ? data.tags.split(',').map(t => t.trim()) : [];
        
        updateDocumentNonBlocking(postRef, {
            ...data,
            secondaryKeywords: secondaryKeywordsArray,
            tags: tagsArray,
            updatedAt: serverTimestamp(),
        });
        toast({ title: `Blog Post Updated!`, description: `"${data.title}" has been saved.` });
        onFinished();
    } catch (error: any) {
         toast({ variant: 'destructive', title: 'Update Failed', description: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-1">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="font-semibold text-zinc-700">Blog Title</label>
            <Input id="title" placeholder="e.g., The Future of AI in Tech" {...register('title')} />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="slug" className="font-semibold text-zinc-700 flex items-center gap-2">
                <Globe className="w-4 h-4" /> SEO Slug
            </label>
            <Input id="slug" placeholder="e.g., future-of-ai-tech" {...register('slug')} />
            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
          </div>
          <div>
            <label htmlFor="category" className="font-semibold text-zinc-700">Category</label>
            <Input id="category" placeholder="e.g., Artificial Intelligence" {...register('category')} />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
            <label className="font-semibold text-zinc-700">Featured Image</label>
            <label htmlFor="edit-featured-image" className="cursor-pointer group block">
                <div className={cn(
                    "w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors relative",
                    featuredImagePreview ? "border-green-500 bg-green-50" : "border-zinc-300 hover:border-yellow-400 hover:bg-yellow-50",
                    errors.featuredImageUrl && "border-red-500"
                )}>
                    {featuredImagePreview ? (
                        <>
                            <Image src={featuredImagePreview} alt="Preview" fill className="object-contain p-4 rounded-xl" />
                            {featuredImageProgress > 0 && featuredImageProgress < 100 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <Progress value={featuredImageProgress} className="w-3/4" />
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <UploadCloud className="w-12 h-12 text-zinc-400 group-hover:text-yellow-500 transition-colors" />
                            <p className="mt-2 text-zinc-600">Upload Featured Image</p>
                        </>
                    )}
                </div>
            </label>
            <input id="edit-featured-image" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'featuredImageUrl')} accept="image/*" />
        </div>
      </div>

      <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2"><Search className="w-5 h-5 text-yellow-600" /> Advanced SEO</h3>
          <div className="grid md:grid-cols-2 gap-4">
              <div>
                  <label htmlFor="metaTitle" className="text-sm font-semibold text-zinc-700">Meta Title</label>
                  <Input id="metaTitle" placeholder="Google Title" {...register('metaTitle')} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                    <label htmlFor="metaDescription" className="text-sm font-semibold text-zinc-700">Meta Description</label>
                    <span className={cn("text-xs", (metaDescription?.length || 0) > 160 ? "text-red-500" : "text-zinc-500")}>
                        {metaDescription?.length || 0}/160
                    </span>
                </div>
                <Textarea id="metaDescription" placeholder="Search result summary..." {...register('metaDescription')} />
                {errors.metaDescription && <p className="text-red-500 text-sm mt-1">{errors.metaDescription.message}</p>}
              </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
              <div>
                  <label htmlFor="primaryKeyword" className="text-sm font-semibold text-zinc-700">Primary Keyword</label>
                  <Input id="primaryKeyword" placeholder="Main focus keyword" {...register('primaryKeyword')} />
              </div>
              <div>
                  <label htmlFor="secondaryKeywords" className="text-sm font-semibold text-zinc-700">Secondary Keywords (comma separated)</label>
                  <Input id="secondaryKeywords" placeholder="keyword1, keyword2" {...register('secondaryKeywords')} />
              </div>
          </div>
          <div>
              <label htmlFor="tags" className="text-sm font-semibold text-zinc-700">SEO Tags</label>
              <Input id="tags" placeholder="tag1, tag2" {...register('tags')} />
          </div>
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
                                  <span className="truncate max-w-[200px] sm:max-w-md">
                                      {watch(`faqs.${index}.question`) || "New FAQ Question"}
                                  </span>
                              </div>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4 pt-2">
                              <div className="space-y-2">
                                  <Label>Question</Label>
                                  <Input {...register(`faqs.${index}.question` as const)} placeholder="Enter the question" />
                              </div>
                              <div className="space-y-2">
                                  <Label>Answer</Label>
                                  <Textarea {...register(`faqs.${index}.answer` as const)} placeholder="Enter the answer" rows={3} />
                              </div>
                              <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)} className="w-full mt-2">
                                  <Trash2 className="w-4 h-4 mr-2" /> Remove FAQ
                              </Button>
                          </AccordionContent>
                      </AccordionItem>
                  ))}
              </Accordion>
              <Button type="button" variant="outline" onClick={() => append({ question: '', answer: '' })} className="w-full border-dashed py-4 bg-white border-zinc-300 hover:bg-zinc-50">
                  <Plus className="w-4 h-4 mr-2" /> Add FAQ Item
              </Button>
          </div>
      </div>

      <div>
        <label className="font-semibold text-zinc-700">Content</label>
        <Controller
            name="content"
            control={control}
            render={({ field }) => (
                <div className="mt-2">
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Start writing your masterpiece..."
                />
                 {errors.content && <p className="text-red-500 text-sm mt-2">{errors.content.message}</p>}
                </div>
            )}
        />
      </div>

      <div>
        <label className="font-semibold text-zinc-700">Pull-Quote (Optional)</label>
        <Textarea 
            placeholder="Enter a powerful quote to feature in your post..." 
            {...register('quote')}
            className="mt-2 text-lg italic"
            rows={4}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
            <div>
                <label htmlFor="authorName" className="font-semibold text-zinc-700">Author's Name</label>
                <Input id="authorName" placeholder="e.g., Jane Doe" {...register('authorName')} />
                {errors.authorName && <p className="text-red-500 text-sm mt-1">{errors.authorName.message}</p>}
            </div>
            <div className="flex items-center space-x-4 p-4 bg-zinc-50 rounded-lg">
                <Controller
                    name="published"
                    control={control}
                    render={({ field }) => (
                        <>
                        <Switch
                            id="edit-published-status"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <Label htmlFor="edit-published-status" className="flex flex-col cursor-pointer">
                            <span className="font-semibold text-zinc-800">
                            {field.value ? 'Published' : 'Draft'}
                            </span>
                            <span className="text-sm text-zinc-600">
                            Visibility Status
                            </span>
                        </Label>
                        </>
                    )}
                />
            </div>
        </div>

        <div className="space-y-2">
            <label className="font-semibold text-zinc-700">Author Image</label>
            <label htmlFor="edit-author-image" className="cursor-pointer group block">
                <div className={cn(
                    "w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors relative",
                    authorImagePreview ? "border-green-500 bg-green-50" : "border-zinc-300 hover:border-yellow-400 hover:bg-yellow-50",
                    errors.authorImageUrl && "border-red-500"
                )}>
                    {authorImagePreview ? (
                        <>
                            <Image src={authorImagePreview} alt="Preview" fill className="object-contain p-4 rounded-xl" />
                            {authorImageProgress > 0 && authorImageProgress < 100 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <Progress value={authorImageProgress} className="w-3/4" />
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <User className="w-10 h-10 text-zinc-400 group-hover:text-yellow-500 transition-colors" />
                            <p className="mt-2 text-zinc-600">Upload Author Image</p>
                        </>
                    )}
                </div>
            </label>
            <input id="edit-author-image" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'authorImageUrl')} accept="image/*" />
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
