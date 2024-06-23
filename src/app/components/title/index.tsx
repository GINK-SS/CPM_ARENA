import Image from 'next/image';

import * as S from './styles';

const MainTitle = () => {
  return (
    <S.Container>
      <S.Logo>
        <Image
          src='/assets/logo/mainLogo.webp'
          alt='mainLogo'
          layout='fill'
          objectFit='cover'
          style={{ borderRadius: '50%' }}
        />
      </S.Logo>
      <S.Wrapper>
        <S.Title>ARENA</S.Title>
        <S.Title>HELPER</S.Title>

        <S.SubTitle>컴투스 프로야구 for 매니저</S.SubTitle>
      </S.Wrapper>
    </S.Container>
  );
};

export default MainTitle;
