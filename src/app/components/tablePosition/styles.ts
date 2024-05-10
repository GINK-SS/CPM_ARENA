import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-weight: 800;
  font-size: 40px;
  margin-bottom: 30px;
  letter-spacing: 20px;
`;

export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2px;
`;

export const LineUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TeamTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
`;

export const TeamName = styled.h2`
  font-weight: 600;
`;

export const PositionGroup = styled.div`
  margin-bottom: 2px;
`;

export const PositionTitleBox = styled.div<{ $heightNum: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: ${({ $heightNum }) => $heightNum * 30 + ($heightNum - 1) * 2}px;
  border: 1px solid #000;
  border-top: 3px solid #000;
  background-color: #fff;
  color: #000;
  font-weight: 600;

  &:last-child {
    border-bottom: 3px solid #000;
  }
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 3px;
  width: 100%;
  border: 1px solid #000;
`;

export const Description = styled.div`
  flex: 1;
  padding: 15px 0;
  font-weight: 600;
  text-align: center;
  letter-spacing: 2px;

  &:first-child {
    background-color: #f0c2bd;
    color: #000;
  }

  &:nth-child(2) {
    background-color: #f5df94;
    color: #000;
  }

  &:nth-child(3) {
    background-color: #fff;
    color: #ca4142;
  }

  &:nth-child(4) {
    background-color: #fff;
    color: #1b1588;
  }
`;
