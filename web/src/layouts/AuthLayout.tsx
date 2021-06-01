import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
