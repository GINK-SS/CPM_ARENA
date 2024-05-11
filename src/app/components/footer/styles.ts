import styled from 'styled-components';

export const Container = styled.div<{ $isTable: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 5px;

  @media (max-width: 560px) {
    flex-direction: row;
    justify-content: ${({ $isTable }) => ($isTable ? 'flex-end' : 'space-between')};
  }
`;

export const Badge = styled.div<{ $isTable: boolean }>`
  position: relative;
  height: 20px;

  @media (max-width: 414px) {
    > img {
      height: ${({ $isTable }) => ($isTable ? '10px' : '20px')};
    }
  }

  @media (max-width: 353px) {
    > img {
      height: 10px;
    }
  }
`;
