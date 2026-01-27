
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function DesktopWrapper({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn("w-full flex justify-center", className)}>
      <div className="w-full max-w-[1440px] px-6 xl:px-8">
        {children}
      </div>
    </div>
  );
}
