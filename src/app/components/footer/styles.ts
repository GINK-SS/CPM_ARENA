import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 5px;

  @media (max-width: 560px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const Badge = styled.div`
  position: relative;
  height: 20px;

  @media (max-width: 414px) {
    > img {
      height: 20px;
    }
  }

  @media (max-width: 353px) {
    > img {
      height: 10px;
    }
  }
`;
