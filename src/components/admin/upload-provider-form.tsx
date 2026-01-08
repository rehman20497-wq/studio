'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { UploadCloud, FileText, Palette, Image as ImageIcon, CheckCircle, Cloud, Cpu, Wifi, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';
import { Progress } from '../ui/progress';

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
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoUploadProgress, setLogoUploadProgress] = useState(0);
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
      
      // Simulate upload progress
      setLogoUploadProgress(0);
      const interval = setInterval(() => {
        setLogoUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const toggleSolution = (solutionName: string) => {
    setSelectedSolutions(prev => 
        prev.includes(solutionName) 
            ? prev.filter(s => s !== solutionName)
            : [...prev, solutionName]
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <SectionWrapper title="Provider Logo & Slug" step={1} icon={UploadCloud}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <label htmlFor="logo-upload" className="cursor-pointer group">
                    <div className={cn(
                        "w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors",
                        logoPreview ? "border-green-500 bg-green-50" : "border-zinc-300 hover:border-yellow-400 hover:bg-yellow-50"
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
                                <p className="text-xs text-zinc-500">PNG, JPG, SVG up to 5MB</p>
                            </>
                        )}
                    </div>
                </label>
                <input id="logo-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
            </div>
            <div className="space-y-4">
                <label htmlFor="provider-name" className="font-semibold text-zinc-700">Provider Name</label>
                <Input id="provider-name" placeholder="e.g., Stellar Cloud Services" />
                <label htmlFor="provider-slug" className="font-semibold text-zinc-700">Provider Slug</label>
                <Input id="provider-slug" placeholder="e.g., stellar-cloud-services" />
                 <p className="text-xs text-zinc-500">This will be used in the URL. Must be unique.</p>
            </div>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Select Solutions" step={2} icon={Palette}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {solutions.map(({ name, icon: Icon }) => {
                const isSelected = selectedSolutions.includes(name);
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
      </SectionWrapper>
      
      <SectionWrapper title="Provider Description" step={3} icon={FileText}>
        <Textarea placeholder="Write a detailed description of the provider..." rows={10} />
        <p className="text-xs text-zinc-500 mt-2">A rich text editor will be implemented here.</p>
      </SectionWrapper>

      <SectionWrapper title="Upload Banner (Optional)" step={4} icon={ImageIcon}>
         <label htmlFor="banner-upload" className="cursor-pointer group">
            <div className="w-full h-48 border-2 border-dashed border-zinc-300 rounded-xl flex flex-col items-center justify-center transition-colors hover:border-yellow-400 hover:bg-yellow-50">
                <UploadCloud className="w-10 h-10 text-zinc-400 group-hover:text-yellow-500 transition-colors" />
                <p className="mt-2 text-zinc-600">Click to upload a banner image</p>
                <p className="text-xs text-zinc-500">Recommended size: 1200x400px</p>
            </div>
        </label>
        <input id="banner-upload" type="file" className="sr-only" accept="image/*" />
      </SectionWrapper>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex justify-end"
    >
        <Button size="lg" className="bg-zinc-900 hover:bg-zinc-700 text-white rounded-full px-10 py-6 text-lg font-bold">
            Publish Provider
        </Button>
      </motion.div>
    </div>
  );
}
