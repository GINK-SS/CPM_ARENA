import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #000;
  border-top: 0;
  width: 140px;
  background-color: #fff;
  color: #000;

  &:first-child {
    border-top: 1px solid #000;
  }
`;

export const Name = styled.div<{ $isAllStar: boolean; $isMVP: boolean }>`
  flex: 3;
  height: 20px;
  padding: 5px 0;
  border-right: 1px solid #000;
  font-weight: ${({ $isMVP }) => ($isMVP ? 800 : 600)};
  font-size: 18px;
  text-align: center;
  background-color: ${({ $isAllStar }) => $isAllStar && '#F0C2BD'};
  color: ${({ $isMVP }) => $isMVP && '#CA4142'};
  letter-spacing: 1px;
`;

export const Overall = styled.div<{ $isOver80: boolean; $isGoldenGlove: boolean }>`
  flex: 1;
  height: 20px;
  padding: 5px 0;
  text-align: center;
  font-weight: ${({ $isOver80 }) => $isOver80 && 700};
  font-size: 18px;
  background-color: ${({ $isGoldenGlove }) => $isGoldenGlove && '#F5DF94'};
  color: ${({ $isOver80 }) => $isOver80 && '#1B1588'};
`;
