import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 900px;
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const Button = styled.button<{ $hasData: boolean }>`
  position: relative;
  width: 370px;
  height: 60px;
  border: ${({ $hasData }) => ($hasData ? '1px solid' : '2px solid')};
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 8px;
  background: ${({ $hasData }) => !$hasData && 'none'};
  color: ${({ $hasData }) => ($hasData ? '#a3440f' : 'inherit')};
  overflow: hidden;
  -webkit-transition: border-color 0.3s, color 0.3s;
  transition: border-color 0.3s, color 0.3s;
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 150%;
    height: 100%;
    z-index: -1;
    -webkit-transform: rotate3d(0, 0, 1, -45deg) translate3d(0, -3em, 0);
    transform: rotate3d(0, 0, 1, -45deg) translate3d(0, -3em, 0);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
    -webkit-transition: -webkit-transform 0.3s, opacity 0.3s, background-color 0.3s;
    transition: transform 0.3s, opacity 0.3s, background-color 0.3s;
  }

  &:hover {
    color: #a3440f;
    border-color: #fff;

    &::before {
      opacity: 1;
      background-color: #fff;
      -webkit-transform: rotate3d(0, 0, 1, 0deg);
      transform: rotate3d(0, 0, 1, 0deg);
      -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
      transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    }
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
`;
