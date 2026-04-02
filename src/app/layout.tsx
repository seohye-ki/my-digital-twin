import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AI 김서현 화상면접 | Digital Twin',
  description: '신입 개발자 김서현의 역량과 경험을 학습한 AI 페르소나와 직접 대화해 보세요.',
  keywords: ['김서현', '개발자 면접', 'AI 면접', 'Digital Twin', '포트폴리오', '신입 개발자'],
  authors: [{ name: 'Seohyun Kim' }],
  openGraph: {
    title: 'AI 김서현 화상면접 | Digital Twin Persona',
    description: '신입 개발자 김서현의 역량과 경험을 학습한 AI 페르소나와 직접 대화해 보세요.',
    url: 'https://my-digital-twin.vercel.app', // Replace with your actual URL if different
    siteName: 'AI 김서현 화상면접',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI 김서현 화상면접 서비스 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI 김서현 화상면접',
    description: '신입 개발자 김서현의 역량과 경험을 학습한 AI 페르소나와 대화해 보세요.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex h-screen flex-col bg-slate-50 overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
