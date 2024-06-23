import { ReactNode } from 'react';

import * as S from './styles';

type InfoBoxProps = {
  headerRight?: ReactNode;
  title: string;
  children: ReactNode;
};

const InfoBox = ({ headerRight = null, title, children }: InfoBoxProps) => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>
          ARENA <span>{title}</span>
        </S.Title>

        {headerRight}
      </S.Header>

      <S.Content>{children}</S.Content>
    </S.Container>
  );
};

export default InfoBox;
