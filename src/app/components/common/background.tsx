import { ReactNode, useState } from 'react';
import classNames from 'classnames';

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
    <div
      className='relative flex min-h-full flex-col items-center justify-center bg-[url("/assets/hideout.svg")] bg-[length:100px_100px]'
      onClick={handleClick}
    >
      {clicks.map((click) => (
        <div
          key={click.id}
          className={classNames(
            'pointer-events-none absolute z-50 h-30 w-30 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent outline-white',
            'animate-[click-effect_0.5s_forwards]'
          )}
          style={{ left: click.x, top: click.y }}
        ></div>
      ))}
      <div className='relative w-full select-none'>{children}</div>
    </div>
  );
};

export default Background;
