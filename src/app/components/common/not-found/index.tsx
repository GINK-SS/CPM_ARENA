import Link from 'next/link';
import * as S from './styles';

const NotFound = () => {
  return (
    <S.Container>
      <S.Description>
        <S.Number404>404</S.Number404>
        <p>여기서는 아레나를 도와줄 수 없어요.</p>
      </S.Description>

      <Link href={'/'}>
        <S.RedirectBtn>HOME</S.RedirectBtn>
      </Link>
    </S.Container>
  );
};

export default NotFound;
