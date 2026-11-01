import type { Metadata } from 'next';
import './fonts.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'XIANG Yu',
  description: 'Yu Xiang builds bioinspired adhesive interfaces, dexterous mechanisms and humanoid robotic hardware.',
  icons: { icon: '/favicon.svg?v=xy' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head>
    <link rel="preload" href="/fonts/inter-002.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    <link rel="preload" href="/fonts/source-serif-4-105.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
  </head><body>{children}</body></html>;
}
