import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  width: 480px;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
`;

export const Wrapper = styled.button<{ $isChoice?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 3px;
  gap: 3px;
  background-color: ${({ $isChoice }) => ($isChoice ? 'blue' : '#f0f0f0')};
  color: ${({ $isChoice }) => ($isChoice ? '#fff' : '#000')};
  cursor: pointer;

  &:hover {
    background-color: lightblue;
    color: #000;
  }
`;
