import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  width: 500px;
  grid-template-columns: repeat(10, 1fr);
  gap: 2px;
`;

export const Item = styled.button<{ $isDisabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #f0f0f0;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};

  &:hover {
    background-color: ${({ $isDisabled }) => ($isDisabled ? '#f0f0f0' : '#e0e0e0')};
  }
`;
