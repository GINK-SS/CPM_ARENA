import { styled } from 'styled-components';

export const PlayerNumber = styled.div`
  display: flex;
  gap: 10px;
  padding-right: 10px;

  @media (max-width: 353px) {
    gap: 5px;
    padding-right: 5px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;

  &:first-child::after {
    content: '|';
  }

  @media (max-width: 726px) {
    gap: 5px;
  }

  @media (max-width: 660px) {
    gap: 10px;
  }

  @media (max-width: 353px) {
    gap: 5px;
    font-size: 10px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BuffContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ResetBtn = styled.button`
  padding: 4px 10px;
  font-size: 14px;
  cursor: pointer;

  @media (max-width: 353px) {
    padding: 2px 5px;
    font-size: 12px;
  }
`;
