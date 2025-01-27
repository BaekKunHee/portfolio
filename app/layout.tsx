import { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const spoqaHanSans = localFont({
  src: '../public/assets/fonts/SpoqaHanSansNeo-Regular.woff',
  variable: '--font-spoqa',
});

export const metadata: Metadata = {
  title: 'Han Baek - Portfolio',
  description: 'Problem Solver Han',
  openGraph: {
    title: 'Han Baek - Portfolio',
    description: 'Problem Solver Han',
    url: 'https://hanbaek-8ocuewx95-myungsangbaeks-projects.vercel.app',
    siteName: 'Han Baek Portfolio',
    images: [
      {
        url: '/assets/images/abstract.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio Preview',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${spoqaHanSans.variable}`}>{children}</body>
    </html>
  );
}
