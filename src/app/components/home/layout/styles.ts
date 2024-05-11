import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  background: url('/assets/hideout.svg');
  background-size: 100px 100px;
`;

export const Content = styled.div`
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
