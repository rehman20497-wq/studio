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

function fixFindDomNode() {
  if (typeof window !== 'undefined') {
    const ReactDOM = require("react-dom");
    // @ts-ignore
    if (!ReactDOM.findDOMNode) {
      // @ts-ignore
      ReactDOM.findDOMNode = function (component) {
        // @ts-ignore
        return component.sort ? component[0] : component;
      };
    }
  }
}
fixFindDomNode();

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
  const quillRef = useRef<any>(null);
  const { toast } = useToast();

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

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['table'], // Added table button
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ],
      handlers: {
        image: imageHandler,
      },
    },
    table: true, // Enable table module
  }), [imageHandler]);

  return (
    <div className="bg-white rounded-lg h-full flex flex-col">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        className="[&_.ql-container]:min-h-[250px] [&_.ql-container]:rounded-b-lg [&_.ql-toolbar]:rounded-t-lg flex-grow flex flex-col"
      />
    </div>
  );
}
