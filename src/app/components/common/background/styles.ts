import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  background: url('/assets/hideout.svg');
  background-size: 100px 100px;
  position: relative;
`;

export const ClickEffect = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background: transparent;
  outline: 4px solid #fff;
  outline-offset: 0px;
  border-radius: 50%;
  box-shadow: inset 0 0 100px 100px rgba(255, 165, 0, 0.8), 0 0 10px 10px rgba(255, 165, 0, 0.7);
  transform: translate(-50%, -50%);
  animation: click-effect-animation 0.5s forwards;
  z-index: 20;

  @keyframes click-effect-animation {
    30% {
      opacity: 1;
      outline: 4px solid #fff;
      outline-offset: 0px;
      box-shadow: inset 0 0 0 0 rgba(255, 165, 0, 0.2), 0 0 10px 5px rgba(255, 165, 0, 0.7);
    }

    100% {
      opacity: 0;
      outline: 2px solid #fff;
      outline-offset: 2px;
      box-shadow: inset 0 0 0 0 rgba(255, 165, 0, 0.2), 0 0 10px 5px rgba(255, 165, 0, 0);
    }
  }
`;

export const Content = styled.div`
  position: relative;
  max-width: 1100px;
  padding: 30px 0;
  user-select: none;

  @media (max-width: 416px) {
    padding: 20px 0;
  }

  @media (max-width: 353px) {
    padding: 15px 0;
  }
`;
