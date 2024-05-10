import Image from 'next/image';

import * as S from './styles';

const MainTitle = () => {
  return (
    <S.Container>
      <Image src='/assets/logo/mainLogo.webp' alt='mainLogo' width={100} height={100} style={{ borderRadius: '50%' }} />
      <S.Wrapper>
        <S.Title>ARENA</S.Title>
        <S.Title>HELPER</S.Title>

        <S.SubTitle>컴투스 프로야구 for 매니저</S.SubTitle>
      </S.Wrapper>
    </S.Container>
  );
};

export default MainTitle;
