import styled from 'styled-components';

export const Container = styled.div<{ $isTable: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 5px;
`;
