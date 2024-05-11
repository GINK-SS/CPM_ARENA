import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 50px);
  gap: 2px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px;
  border: 2px solid #888;
  border-radius: 5px;
  background-color: #eee;
  z-index: 1;

  @media (max-width: 560px) {
    grid-template-columns: repeat(10, 40px);
    padding: 3px;
  }

  @media (max-width: 470px) {
    grid-template-columns: repeat(10, 30px);
  }

  @media (max-width: 353px) {
    grid-template-columns: repeat(10, 20px);
  }
`;

export const Item = styled.button<{ $isSelected: boolean; $isDisabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: ${({ $isSelected }) => ($isSelected ? '#410' : '#f0f0f0')};
  color: ${({ $isSelected }) => ($isSelected ? '#fff' : '#000')};
  opacity: ${({ $isDisabled }) => $isDisabled && 0.3};
  cursor: pointer;

  &:hover {
    background-color: ${({ $isSelected, $isDisabled }) => !$isSelected && !$isDisabled && 'rgba(224, 168, 36, 0.2)'};
  }

  &:disabled {
    cursor: default;
  }

  @media (max-width: 560px) {
    font-size: 13px;
    height: 40px;
  }

  @media (max-width: 470px) {
    font-size: 10px;
    height: 30px;
  }

  @media (max-width: 353px) {
    height: 20px;
    font-size: 6.5px;
    border: 1px solid;
  }
`;
