import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import StyledComponentsRegistry from './lib/registry';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  display: 'block',
});

export const metadata: Metadata = {
  title: '컴프매 아레나',
  description: '컴투스프로야구매니저 아레나를 한눈에 확인해보세요!',
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
