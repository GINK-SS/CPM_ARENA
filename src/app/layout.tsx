import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import StyledComponentsRegistry from './lib/registry';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import Init from './init';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  display: 'block',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cpm-arena.com'),
  title: '컴프매 아레나 도우미 | com2usManager Arena Helper',
  description: '연도와 팀을 선택 후 나만의 라인업을 구성해 보세요! 선수 정보부터 전력까지 한눈에 확인할 수 있습니다.',
  keywords: '컴프매, 컴프매 아레나, 컴프매 아레나 도우미, 컴투스프로야구for매니저, 컴투스프로야구매니저 아레나 도우미',
  openGraph: {
    type: 'website',
    url: '/',
    title: '컴프매 아레나 도우미 | com2usManager Arena Helper',
    description: '연도와 팀을 선택 후 나만의 라인업을 구성해 보세요! 선수 정보부터 전력까지 한눈에 확인할 수 있습니다.',
    siteName: '컴프매 아레나 도우미 - 컴투스프로야구for매니저',
    images: [
      {
        url: '/assets/metaImg.png',
      },
    ],
  },
  twitter: {
    card: 'summary',
    site: '/',
    title: '컴프매 아레나 도우미 | com2usManager Arena Helper',
    description: '연도와 팀을 선택 후 나만의 라인업을 구성해 보세요! 선수 정보부터 전력까지 한눈에 확인할 수 있습니다.',
    creator: 'GINK-SS',
    images: '/assets/metaImg.png',
  },
  icons: [
    { rel: 'icon', url: '/assets/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { rel: 'icon', url: '/assets/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
  other: {
    'naver-site-verification': 'e7d16659e422bbb7d9f376e73462c7c7a162ad49',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={notoSansKR.className}>
        <StyledComponentsRegistry>
          <Init>{children}</Init>
        </StyledComponentsRegistry>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
