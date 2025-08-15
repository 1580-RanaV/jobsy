// app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import ToastProvider from '@/app/components/toast-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Jobsy: Application Tracker',
  description: 'Track applications. Auto-capture links. Apply on time.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-neutral-50">
      <body className={`${inter.className} antialiased text-neutral-900`}>
        <ToastProvider />
        <div className="min-h-dvh">
          {children}
        </div>
      </body>
    </html>
  );
}
