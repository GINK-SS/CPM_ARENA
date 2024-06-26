import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &:first-child {
    border-top: 1px solid #000;
  }
`;

export const Block = styled.div<{ $isActive: boolean }>`
  display: ${({ $isActive }) => ($isActive ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.7);
  box-sizing: border-box;
`;

export const SelectedEffect = styled.div<{ $isActive: boolean; $isPinned: boolean }>`
  display: ${({ $isActive }) => ($isActive ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: ${({ $isPinned }) => ($isPinned ? 'inset 0 0 2px 4px #ff5a00' : 'inset 0 0 2px 2px #ff5a00')};
  z-index: 3;
  cursor: pointer;
`;

export const Wrapper = styled.div<{ $hasData: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #000;
  border-top: 0;
  width: 140px;
  background-color: #fff;
  color: #000;
  cursor: ${({ $hasData }) => $hasData && 'pointer'};

  @media (max-width: 820px) {
    width: 120px;
  }

  @media (max-width: 726px) {
    width: 110px;
  }

  @media (max-width: 660px) {
    width: 90px;
  }

  @media (max-width: 560px) {
    width: 80px;
  }

  @media (max-width: 470px) {
    width: 70px;
  }

  @media (max-width: 416px) {
    width: 60px;
  }

  @media (max-width: 353px) {
    width: 47px;
  }
`;

export const Name = styled.div<{ $isAllStar: boolean; $isMVP: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
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

  @media (max-width: 820px) {
    font-size: 16px;
  }

  @media (max-width: 660px) {
    padding: 3px 0;
    font-size: 14px;
    letter-spacing: 0;
  }

  @media (max-width: 560px) {
    padding: 1px 0;
    font-size: 12px;
  }

  @media (max-width: 470px) {
    padding: 0;
    font-size: 10px;
  }

  @media (max-width: 416px) {
    height: 16px;
    font-size: 9px;
  }

  @media (max-width: 353px) {
    height: 14px;
    font-size: 7px;
  }
`;

export const Overall = styled.div<{ $isOver80: boolean; $isGoldenGlove: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 20px;
  padding: 5px 0;
  text-align: center;
  font-weight: ${({ $isOver80 }) => $isOver80 && 700};
  font-size: 18px;
  background-color: ${({ $isGoldenGlove }) => $isGoldenGlove && '#F5DF94'};
  color: ${({ $isOver80 }) => $isOver80 && '#1B1588'};

  @media (max-width: 820px) {
    font-size: 16px;
  }

  @media (max-width: 660px) {
    padding: 3px 0;
    font-size: 14px;
  }

  @media (max-width: 560px) {
    padding: 1px 0;
    font-size: 12px;
  }

  @media (max-width: 470px) {
    padding: 0;
    font-size: 10px;
  }

  @media (max-width: 416px) {
    height: 16px;
    font-size: 8px;
  }

  @media (max-width: 353px) {
    height: 14px;
    font-size: 6px;
  }
`;

export const LineUpCheck = styled.div<{ $isLineUp: boolean }>`
  display: ${({ $isLineUp }) => ($isLineUp ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.4);
  transform: rotate(-3deg);
`;
