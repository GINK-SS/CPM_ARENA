import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #000;
  width: 140px;
  height: 30px;
  background-color: #fff;
  color: #000;
`;

export const Name = styled.div<{ $isAllStar: boolean; $isMVP: boolean }>`
  width: 100px;
  height: 20px;
  padding: 5px;
  font-weight: 700;
  font-size: 17px;
  border-right: 1px solid #000;
  text-align: center;
  font-weight: ${({ $isMVP }) => $isMVP && 700};
  background-color: ${({ $isAllStar }) => $isAllStar && '#F0C2BD'};
  color: ${({ $isMVP }) => $isMVP && '#CA4142'};
`;

export const Overall = styled.div<{ $isOver80: boolean; $isGoldenGlove: boolean }>`
  width: 40px;
  height: 20px;
  padding: 5px;
  text-align: center;
  font-weight: ${({ $isOver80 }) => $isOver80 && 700};
  font-size: 18px;
  background-color: ${({ $isGoldenGlove }) => $isGoldenGlove && '#F5DF94'};
  color: ${({ $isOver80 }) => $isOver80 && '#1B1588'};
`;
