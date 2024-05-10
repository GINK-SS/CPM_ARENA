import Image from 'next/image';

import * as S from './styles';

const MainTitle = () => {
  return (
    <S.Container>
      <Image src='/assets/logo/mainLogo.webp' alt='mainLogo' width={100} height={100} style={{ borderRadius: '50%' }} />
      <S.Wrapper>
        <S.Title>ARENA</S.Title>
        <S.SubTitle>컴투스 프로야구 for 매니저</S.SubTitle>
      </S.Wrapper>

      <p>연도와 팀을 선택해 포지션별 선수들을 한눈에 볼 수 있습니다.</p>
    </S.Container>
  );
};

export default MainTitle;
