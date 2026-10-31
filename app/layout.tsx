import type { Metadata } from 'next';
import './fonts.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yu Xiang — Bioinspired Robotics & Mechanical Design',
  description: 'Yu Xiang builds bioinspired adhesive interfaces, dexterous mechanisms and humanoid robotic hardware.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
