'use client';

import 'react-quill/dist/quill.snow.css';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// This is a workaround for the "findDOMNode is not a function" error
// See: https://github.com/zenoamaro/react-quill/issues/9 Quill/issues/9 Quill/issues/9 Quill#issuecomment-1865955342
function fixFindDomNode() {
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
fixFindDomNode();


export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  return (
    <div className="bg-white rounded-lg">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        className="[&_.ql-container]:min-h-[250px] [&_.ql-container]:rounded-b-lg [&_.ql-toolbar]:rounded-t-lg"
      />
    </div>
  );
}