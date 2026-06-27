'use client';

import 'react-quill/dist/quill.snow.css';
import { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useToast } from '@/hooks/use-toast';
import { cloudinaryConfig } from '@/lib/cloudinary';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Code, Eye, Laptop, Smartphone, Tablet, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

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
  const ReactQuill = useMemo(() => dynamic(async () => {
    const { default: RQ } = await import('react-quill');
    const Quill = (await import('quill')).default;
    
    // Register Custom Block Blot
    const BlockEmbed = Quill.import('blots/block/embed');
    class CustomBlockBlot extends BlockEmbed {
      static create(value: any) {
        const node = super.create();
        const id = value.id || Math.random().toString(36).substr(2, 9);
        node.setAttribute('data-id', id);
        node.setAttribute('data-name', value.name || 'Untitled Block');
        node.setAttribute('data-html', encodeURIComponent(value.html || ''));
        node.setAttribute('data-css', encodeURIComponent(value.css || ''));
        node.setAttribute('data-js', encodeURIComponent(value.js || ''));
        node.setAttribute('contenteditable', 'false');
        node.className = 'custom-block-wrapper';
        
        node.innerHTML = `
          <div class="custom-block-admin-placeholder" style="
            padding: 24px; 
            border: 2px dashed #cbd5e1; 
            background: #f8fafc; 
            border-radius: 12px; 
            text-align: center;
            cursor: pointer;
            user-select: none;
            margin: 16px 0;
          ">
            <div style="font-weight: 700; color: #1e293b; margin-bottom: 4px;">🛠️ Custom Block: ${value.name || 'Untitled'}</div>
            <div style="font-size: 12px; color: #64748b;">Double-click to edit HTML/CSS/JS</div>
          </div>
        `;
        return node;
      }

      static value(node: HTMLElement) {
        return {
          id: node.getAttribute('data-id'),
          name: node.getAttribute('data-name'),
          html: decodeURIComponent(node.getAttribute('data-html') || ''),
          css: decodeURIComponent(node.getAttribute('data-css') || ''),
          js: decodeURIComponent(node.getAttribute('data-js') || ''),
        };
      }
    }
    CustomBlockBlot.blotName = 'custom-block';
    CustomBlockBlot.tagName = 'div';
    CustomBlockBlot.className = 'custom-block-wrapper';
    Quill.register(CustomBlockBlot);

    return RQ;
  }, { ssr: false }), []);

  const quillRef = useRef<any>(null);
  const { toast } = useToast();

  // State for Custom Block Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<any>(null);
  const [blockName, setBlockName] = useState('');
  const [blockHtml, setBlockHtml] = useState('');
  const [blockCss, setBlockCss] = useState('');
  const [blockJs, setBlockJs] = useState('');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

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
        quill.enable(false);

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
          quill.enable(true);
        }
      }
    };
  }, [toast]);

  const customBlockHandler = useCallback(() => {
    setEditingBlock(null);
    setBlockName('New Custom Block');
    setBlockHtml('<div class="p-6 text-center">\n  <h1>Hello World</h1>\n</div>');
    setBlockCss('.p-6 { background: #f1f5f9; border-radius: 8px; }\nh1 { color: #0f172a; }');
    setBlockJs('console.log("Custom block active!");');
    setIsModalOpen(true);
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        [{ 'color': [] }, { 'background': [] }],
        ['clean'],
        ['custom-block'] // Add button to toolbar
      ],
      handlers: {
        image: imageHandler,
        'custom-block': customBlockHandler
      },
    },
  }), [imageHandler, customBlockHandler]);

  const saveCustomBlock = () => {
    const quill = quillRef.current?.getEditor();
    const blockData = {
      id: editingBlock?.id || Math.random().toString(36).substr(2, 9),
      name: blockName || 'Untitled Block',
      html: blockHtml,
      css: blockCss,
      js: blockJs
    };

    if (editingBlock) {
      // Find and replace existing blot
      // This is a bit complex in Quill, so we usually delete and re-insert or update attributes
      const [blot] = quill.getLeaf(quill.getSelection()?.index || 0);
      if (blot && blot.parent && blot.parent.domNode.classList.contains('custom-block-wrapper')) {
         quill.deleteText(quill.getSelection()?.index || 0, 1);
      }
    }

    const range = quill.getSelection(true);
    quill.insertEmbed(range.index, 'custom-block', blockData);
    quill.setSelection(range.index + 1);
    
    setIsModalOpen(false);
    setEditingBlock(null);
  };

  // Detect double click on blocks to edit
  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const handleDblClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const wrapper = target.closest('.custom-block-wrapper');
      if (wrapper) {
        const id = wrapper.getAttribute('data-id');
        const name = wrapper.getAttribute('data-name');
        const html = decodeURIComponent(wrapper.getAttribute('data-html') || '');
        const css = decodeURIComponent(wrapper.getAttribute('data-css') || '');
        const js = decodeURIComponent(wrapper.getAttribute('data-js') || '');

        setEditingBlock({ id });
        setBlockName(name || '');
        setBlockHtml(html);
        setBlockCss(css);
        setBlockJs(js);
        setIsModalOpen(true);
      }
    };

    editor.root.addEventListener('dblclick', handleDblClick);
    return () => editor.root.removeEventListener('dblclick', handleDblClick);
  }, [ReactQuill]);

  return (
    <div className="bg-white rounded-lg h-full flex flex-col min-h-[300px]">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        className="flex-grow flex flex-col [&_.ql-container]:flex-grow [&_.ql-container]:min-h-[250px] [&_.ql-container]:rounded-b-lg [&_.ql-toolbar]:rounded-t-lg [&_.ql-custom-block]:w-auto [&_.ql-custom-block]:px-2 [&_.ql-custom-block]:font-bold [&_.ql-custom-block]:after:content-['BLOCK']"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] w-[1200px] h-[90vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-zinc-500" />
              {editingBlock ? 'Edit Custom Block' : 'Create Custom Block'}
            </DialogTitle>
            <DialogDescription>
              Build interactive components using HTML, CSS, and JS. Use <code>root.querySelector</code> in your JS to access block elements.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
            {/* Editors Panel */}
            <div className="w-full md:w-1/2 flex flex-col border-r overflow-y-auto p-6 space-y-6">
              <div>
                <Label htmlFor="block-name">Block Display Name</Label>
                <Input 
                  id="block-name" 
                  value={blockName} 
                  onChange={(e) => setBlockName(e.target.value)} 
                  placeholder="e.g., Comparison Table" 
                />
              </div>

              <Tabs defaultValue="html" className="w-full flex-grow flex flex-col">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="css">CSS</TabsTrigger>
                  <TabsTrigger value="js">JS</TabsTrigger>
                </TabsList>
                <TabsContent value="html" className="flex-grow">
                  <Textarea 
                    className="h-[400px] font-mono text-xs leading-relaxed" 
                    placeholder="<div>...</div>" 
                    value={blockHtml}
                    onChange={(e) => setBlockHtml(e.target.value)}
                  />
                </TabsContent>
                <TabsContent value="css" className="flex-grow">
                  <Textarea 
                    className="h-[400px] font-mono text-xs leading-relaxed" 
                    placeholder=".my-class { ... }" 
                    value={blockCss}
                    onChange={(e) => setBlockCss(e.target.value)}
                  />
                </TabsContent>
                <TabsContent value="js" className="flex-grow">
                  <Textarea 
                    className="h-[400px] font-mono text-xs leading-relaxed" 
                    placeholder="// Use 'root' to query shadow DOM elements" 
                    value={blockJs}
                    onChange={(e) => setBlockJs(e.target.value)}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Preview Panel */}
            <div className="w-full md:w-1/2 bg-zinc-100 flex flex-col">
              <div className="p-4 border-b flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm font-semibold">Live Preview</span>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant={previewMode === 'desktop' ? 'default' : 'outline'} 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <Laptop className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant={previewMode === 'tablet' ? 'default' : 'outline'} 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setPreviewMode('tablet')}
                  >
                    <Tablet className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant={previewMode === 'mobile' ? 'default' : 'outline'} 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setPreviewMode('mobile')}
                  >
                    <Smartphone className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-grow flex items-center justify-center p-4">
                <div 
                  className={cn(
                    "bg-white shadow-xl transition-all duration-300 rounded-md overflow-hidden",
                    previewMode === 'desktop' && "w-full h-full",
                    previewMode === 'tablet' && "w-[768px] h-full",
                    previewMode === 'mobile' && "w-[375px] h-[667px]"
                  )}
                >
                  <iframe 
                    title="Custom Block Preview"
                    className="w-full h-full border-none"
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <style>
                            body { margin: 0; font-family: sans-serif; }
                            ${blockCss}
                          </style>
                        </head>
                        <body>
                          <div id="preview-root">${blockHtml}</div>
                          <script>
                            (function() {
                              const root = document.getElementById('preview-root');
                              try {
                                ${blockJs}
                              } catch (e) {
                                console.error(e);
                              }
                            })();
                          </script>
                        </body>
                      </html>
                    `}
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="p-6 border-t gap-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={saveCustomBlock}>
              {editingBlock ? 'Update Block' : 'Insert Block'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
