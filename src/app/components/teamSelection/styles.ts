import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 100px);
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

  @media (max-width: 1100px) {
    grid-template-columns: repeat(7, 100px);
  }

  @media (max-width: 747px) {
    grid-template-columns: repeat(6, 100px);
  }

  @media (max-width: 660px) {
    grid-template-columns: repeat(5, 100px);
  }

  @media (max-width: 560px) {
    grid-template-columns: repeat(5, 80px);
  }

  @media (max-width: 470px) {
    grid-template-columns: repeat(4, 80px);
  }

  @media (max-width: 353px) {
    grid-template-columns: repeat(5, 40px);
  }
`;

export const Wrapper = styled.button<{ $isSelected: boolean; $isDisabled: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  gap: 5px;
  border-radius: 5px;
  background-color: ${({ $isSelected }) => ($isSelected ? '#410' : '#f0f0f0')};
  color: ${({ $isSelected }) => ($isSelected ? '#fff' : '#000')};
  font-weight: ${({ $isSelected }) => $isSelected && 600};
  opacity: ${({ $isDisabled }) => $isDisabled && 0.3};
  cursor: pointer;

  &:hover {
    background-color: ${({ $isSelected, $isDisabled }) => !$isSelected && !$isDisabled && 'rgba(224, 168, 36, 0.2)'};
  }
  &:disabled {
    cursor: default;
  }

  @media (max-width: 560px) {
    gap: 3px;
    padding: 3px;
    font-size: 11px;
  }

  @media (max-width: 353px) {
    border: 1px solid;
    font-size: 9px;
    word-break: keep-all;
  }
`;

export const TeamLogo = styled.div`
  position: relative;
  width: 40px;
  height: 40px;

  @media (max-width: 560px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 353px) {
    width: 25px;
    height: 25px;
  }
`;
