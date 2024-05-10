import { ReactNode } from 'react';

import * as S from './styles';

type HomeLayoutProps = {
  children: ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <S.Container>
      <S.Content>{children}</S.Content>
    </S.Container>
  );
};

export default HomeLayout;
