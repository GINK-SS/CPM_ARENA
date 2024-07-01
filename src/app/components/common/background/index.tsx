import { ReactNode, useState } from 'react';

import * as S from './styles';

type BackgroundProps = {
  children: ReactNode;
};

const Background = ({ children }: BackgroundProps) => {
  const [clicks, setClicks] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const newClick = {
      x: event.pageX,
      y: event.pageY,
      id: Date.now(),
    };

    setClicks((prev) => [...prev, newClick]);
    setTimeout(() => {
      setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
    }, 500);
  };

  return (
    <S.Container onClick={handleClick}>
      {clicks.map((click) => (
        <S.ClickEffect key={click.id} style={{ left: click.x, top: click.y }}></S.ClickEffect>
      ))}
      <S.Content>{children}</S.Content>
    </S.Container>
  );
};

export default Background;
