import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DarkModeProvider } from '@/context/DarkModeContext';
import { AuthProvider } from '@/app/auth/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FFS - Sales Performance Dashboard',
  description: 'Transform your sales performance with Fortitude Financial Services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} dark:bg-gray-900`}>
        <AuthProvider>
          <DarkModeProvider>
            {children}
          </DarkModeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
