import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/shared/navbar';
import { JsonLd } from '@/components/shared/json-ld';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jhansi-dev.vercel.app'),
  title: 'Jhansi — AI/ML Engineer & Full-Stack Developer',
  description:
    '3rd-year CSE-AI student building speaker-adaptive Visual Speech Recognition (VSR), neural model compression pipelines, and intelligent web applications.',
  keywords: [
    'Jhansi',
    'AI Engineer',
    'Machine Learning',
    'Visual Speech Recognition',
    'PyTorch',
    'Next.js',
    'TypeScript',
    'Computer Science',
  ],
  authors: [{ name: 'Jhansi', url: 'https://github.com/jhansi-jjs' }],
  openGraph: {
    title: 'Jhansi — AI/ML Engineer & Full-Stack Developer',
    description:
      '3rd-year CSE-AI student building speaker-adaptive Visual Speech Recognition (VSR) and intelligent software.',
    url: 'https://jhansi-dev.vercel.app',
    siteName: 'Jhansi Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jhansi — AI/ML Engineer & Full-Stack Developer',
    description:
      '3rd-year CSE-AI student building speaker-adaptive Visual Speech Recognition (VSR) and intelligent software.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased font-sans flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
        <JsonLd />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-400 focus:text-zinc-950 focus:font-bold focus:rounded-md shadow-lg"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <div id="main-content" className="flex-1">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
