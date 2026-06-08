'use client';

import 'react-quill/dist/quill.snow.css';
import { useMemo, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useToast } from '@/hooks/use-toast';
import { cloudinaryConfig } from '@/lib/cloudinary';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Fix for React 19 compatibility with react-quill
 */
function fixFindDomNode() {
  if (typeof window !== 'undefined') {
    const ReactDOM = require("react-dom");
    if (!ReactDOM.findDOMNode) {
      ReactDOM.findDOMNode = function (component: any) {
        return component?.sort ? component[0] : component;
      };
    }
  }
}
fixFindDomNode();

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  // Dynamically import ReactQuill to avoid SSR issues
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
  const quillRef = useRef<any>(null);
  const { toast } = useToast();

  /**
   * Handles image uploads to Cloudinary from within the editor
   */
  const uploadToCloudinary = async (file: File): Promise<string> => {
    if (!cloudinaryConfig.uploadPreset) {
      throw new Error('Cloudinary upload preset is not configured.');
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || 'Cloudinary upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  };

  /**
   * Custom image handler for the toolbar
   */
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const quill = quillRef.current?.getEditor();
        const range = quill.getSelection(true);
        quill.enable(false); // Disable editor during upload

        try {
          const imageUrl = await uploadToCloudinary(file);
          quill.insertEmbed(range.index, 'image', imageUrl);
          quill.setSelection(range.index + 1);
        } catch (error: any) {
          toast({
            variant: 'destructive',
            title: 'Image Upload Failed',
            description: error.message,
          });
        } finally {
          quill.enable(true); // Re-enable editor
        }
      }
    };
  }, [toast]);

  /**
   * Quill editor modules configuration
   * Updated to include Header 4 for proper SEO hierarchy
   */
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), [imageHandler]);

  return (
    <div className="bg-white rounded-lg h-full flex flex-col min-h-[300px]">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        className="flex-grow flex flex-col [&_.ql-container]:flex-grow [&_.ql-container]:min-h-[250px] [&_.ql-container]:rounded-b-lg [&_.ql-toolbar]:rounded-t-lg"
      />
    </div>
  );
}