import { styled } from 'styled-components';

export const Button = styled.button<{ $isActive: boolean }>`
  position: relative;
  width: 900px;
  min-height: 60px;
  margin-bottom: 50px;
  border: 2px solid;
  background: none;
  color: ${({ $isActive }) => ($isActive ? '#fff' : '#555')};
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 10px;
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0.8')};
  overflow: hidden;
  -webkit-transition: border-color 0.2s, color 0.2s;
  transition: border-color 0.2s, color 0.2s;
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.2, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.2, 1);
  -moz-osx-font-smoothing: grayscale;
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'default')};

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: ${({ $isActive }) => ($isActive ? 'block' : 'none')};
    height: 100%;
    width: 100%;
    bottom: 100%;
    left: 0;
    z-index: -1;
    -webkit-transition: -webkit-transform 0.2s;
    transition: transform 0.2s;
    -webkit-transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  }

  &::before {
    background: #cba679;
  }

  &::after {
    background: #b7680b;
  }

  &:hover {
    color: ${({ $isActive }) => ($isActive ? '#fff' : '#555')};

    &::before,
    &::after {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }

    &::after {
      -webkit-transition-delay: 0.175s;
      transition-delay: 0.175s;
    }
  }
`;
