import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Click the Fox! Game',
  description: `Click the fox as many times as you can within time limit!`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-blue bg-cloud bg-cover ${inter.className}`}>
        <main className="flex flex-col gap-4 max-w-sm sm:max-w-lg mx-auto mt-16 p-6 bg-white border border-yellow-500 rounded-md">
          <h1 className="text-2xl sm:text-3xl text-center leading-none">
            Click the Fox! Game
          </h1>
          {children}
        </main>
      </body>
    </html>
  );
}
