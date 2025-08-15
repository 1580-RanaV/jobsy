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
      <head>
        <meta name="apple-mobile-web-app-title" content="MyWebSiteg" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="MyWebSiteg" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} antialiased text-neutral-900`}>
        <ToastProvider />
        <div className="min-h-dvh">
          {children}
        </div>
      </body>
    </html>
  );
}
