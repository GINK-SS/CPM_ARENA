import { Metadata } from 'next';
import Update from './components/update';

export const metadata: Metadata = {
  title: '소식 | 컴프매 아레나 도우미',
  description: '컴프매 아레나 도우미의 업데이트 내역과 자주 묻는 질문을 확인해보세요',
  openGraph: {
    type: 'website',
    url: '/news',
    title: '소식 | 컴프매 아레나 도우미',
    description: '컴프매 아레나 도우미의 업데이트 내역과 자주 묻는 질문을 확인해보세요',
    siteName: '컴프매 아레나 도우미 | com2usManager Arena Helper',
    images: [
      {
        url: '/assets/metaImg.png',
      },
    ],
  },
  twitter: {
    site: '/news',
    title: '소식 | 컴프매 아레나 도우미',
    description: '컴프매 아레나 도우미의 업데이트 내역과 자주 묻는 질문을 확인해보세요',
    images: '/assets/metaImg.png',
  },
};

export default function Page() {
  return (
    <div className='mx-auto max-w-[1000px] px-20 py-20 mobileL:px-35 mobileL:py-35 tablet:py-50'>
      <Update />
    </div>
  );
}
