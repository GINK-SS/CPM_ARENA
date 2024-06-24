import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 600;
  font-size: 24px;

  @media (max-width: 353px) {
    font-size: 17px;
  }
`;

export const Value = styled.span`
  width: 56px;
  text-align: center;

  @media (max-width: 353px) {
    width: 40px;
  }
`;
