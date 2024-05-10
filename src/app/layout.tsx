import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import StyledComponentsRegistry from './lib/registry';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  display: 'block',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cpm-arena.com'),
  title: '컴투스프로야구for매니저 아레나 | com2usManager Arena',
  description:
    '컴투스프로야구for매니저 아레나 | 연도와 팀을 선택 후 오늘의 라인업을 정해 보세요! 오늘의 선수들을 한눈에 확인할 수 있습니다.',
  keywords: '컴프매, 컴프매 아레나, com2us, 컴투스프로야구for매니저, 컴투스프로야구매니저, 아레나, com2usmanager',
  openGraph: {
    type: 'website',
    url: '/',
    title: '컴투스프로야구for매니저 아레나 | com2usManager Arena',
    description:
      '컴투스프로야구for매니저 아레나 | 연도와 팀을 선택 후 오늘의 라인업을 정해 보세요! 오늘의 선수들을 한눈에 확인할 수 있습니다.',
    siteName: '컴투스프로야구for매니저 아레나 | com2usManager Arena',
    images: [
      {
        url: '/assets/metaImg.png',
      },
    ],
  },
  twitter: {
    card: 'summary',
    site: '/',
    title: '컴투스프로야구for매니저 아레나 | com2usManager Arena',
    description: '컴투스프로야구for매니저 아레나 | 연도와 팀을 선택 후 오늘의 라인업을 정해 보세요!',
    creator: 'GINK-SS',
    images: '/assets/metaImg.png',
  },
  icons: [
    { rel: 'icon', url: '/assets/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { rel: 'icon', url: '/assets/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={notoSansKR.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
