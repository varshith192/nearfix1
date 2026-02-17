import type { Metadata } from 'next';
import './globals.css';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'Hyperlocal Alerts',
  description: 'Community alerts and marketplace',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 pb-20">
        <main className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative">
          {children}
          <BottomNav />
        </main>
      </body>
    </html>
  );
}
