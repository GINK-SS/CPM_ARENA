import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 900px;
  margin-bottom: 180px;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    width: 100%;
    margin-bottom: 110px;
  }

  @media (max-width: 470px) {
    margin-bottom: 60px;
  }
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const Button = styled.button<{ $hasData: boolean; $isActive: boolean }>`
  position: relative;
  width: 370px;
  height: 60px;
  border: ${({ $hasData }) => ($hasData ? '1px solid' : '2px solid')};
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 8px;
  background: ${({ $hasData }) => !$hasData && 'none'};
  color: ${({ $hasData, $isActive }) => ($isActive ? ($hasData ? '#a3440f' : 'inherit') : '#555')};
  overflow: hidden;
  -webkit-transition: border-color 0.3s, color 0.3s;
  transition: border-color 0.3s, color 0.3s;
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  -moz-osx-font-smoothing: grayscale;
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'default')};

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
    color: ${({ $isActive }) => ($isActive ? '#a3440f' : '#555')};
    border-color: ${({ $isActive }) => ($isActive ? '#fff' : '#555')};

    &::before {
      opacity: 1;
      background-color: ${({ $isActive }) => ($isActive ? '#fff' : 'transparent')};
      -webkit-transform: rotate3d(0, 0, 1, 0deg);
      transform: rotate3d(0, 0, 1, 0deg);
      -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
      transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    }
  }

  @media (max-width: 1100px) {
    width: 100%;
  }

  @media (max-width: 470px) {
    height: 50px;
    font-size: 16px;
  }

  @media (max-width: 416px) {
    height: 40px;
  }

  @media (max-width: 353px) {
    height: 30px;
    font-size: 14px;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;

  @media (max-width: 470px) {
    gap: 13px;
  }

  @media (max-width: 353px) {
    gap: 15px;
  }
`;

export const Logo = styled.div`
  position: relative;
  width: 45px;
  height: 45px;

  @media (max-width: 470px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 416px) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 353px) {
    width: 20px;
    height: 20px;
  }
`;
