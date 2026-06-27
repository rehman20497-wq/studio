'use client';

import { useEffect, useRef } from 'react';

interface CustomBlockRendererProps {
  html: string;
  className?: string;
}

/**
 * Renders HTML content and hydrates any "Custom Blocks" found within it.
 * Uses Shadow DOM to isolate custom CSS and JS.
 */
export default function CustomBlockRenderer({ html, className }: CustomBlockRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Find all custom block wrappers in the rendered HTML
    const blocks = containerRef.current.querySelectorAll('.custom-block-wrapper');

    blocks.forEach((block: any) => {
      // Prevent multiple hydrations
      if (block.shadowRoot) return;

      const blockId = block.getAttribute('data-id');
      const rawHtml = decodeURIComponent(block.getAttribute('data-html') || '');
      const rawCss = decodeURIComponent(block.getAttribute('data-css') || '');
      const rawJs = decodeURIComponent(block.getAttribute('data-js') || '');

      // IMPORTANT: Clear the editor placeholder content before attaching shadow root
      block.innerHTML = '';
      block.style.display = 'block';
      block.style.margin = '2rem 0';

      // Create Shadow Root for isolation
      const shadow = block.attachShadow({ mode: 'open' });

      // Create Style element with basic reset for consistency with preview
      const styleEl = document.createElement('style');
      styleEl.textContent = `
        :host { display: block; all: initial; font-family: sans-serif; }
        * { box-sizing: border-box; }
        .custom-block-inner { width: 100%; }
        ${rawCss}
      `;

      // Create Content container
      const contentEl = document.createElement('div');
      contentEl.className = 'custom-block-inner';
      contentEl.innerHTML = rawHtml;

      shadow.appendChild(styleEl);
      shadow.appendChild(contentEl);

      // Execute Script if present
      if (rawJs.trim()) {
        const scriptEl = document.createElement('script');
        scriptEl.textContent = `
          (function() {
            const blockId = "${blockId}";
            const blockHost = document.querySelector('[data-id="' + blockId + '"]');
            if (!blockHost) return;
            const root = blockHost.shadowRoot;
            try {
              ${rawJs}
            } catch (e) {
              console.error("Error in Custom Block [" + blockId + "]:", e);
            }
          })();
        `;
        shadow.appendChild(scriptEl);
      }
    });
  }, [html]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}
