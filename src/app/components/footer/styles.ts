import styled from 'styled-components';

export const Container = styled.div<{ $isTable: boolean }>`
  display: flex;
  width: ${({ $isTable }) => ($isTable ? '800px' : '900px')};
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 5px;
`;
