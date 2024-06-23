import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;

  @media (max-width: 416px) {
    margin-bottom: 3px;
  }
`;

export const Logo = styled.div`
  position: relative;
  width: 60px;
  height: 60px;

  @media (max-width: 660px) {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 560px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 470px) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 416px) {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 353px) {
    width: 17px;
    height: 17px;
  }
`;

export const Name = styled.h2`
  margin-top: 5px;
  font-weight: 600;

  @media (max-width: 660px) {
    font-size: 14px;
  }

  @media (max-width: 560px) {
    margin-top: 3px;
    font-size: 12px;
  }

  @media (max-width: 470px) {
    font-size: 10px;
  }

  @media (max-width: 416px) {
    font-size: 8px;
  }

  @media (max-width: 353px) {
    font-size: 6px;
  }
`;

export const PositionGroup = styled.div`
  margin-bottom: 2px;

  @media (max-width: 660px) {
    margin-bottom: 1px;
  }
`;
