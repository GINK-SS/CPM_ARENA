import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
`;

export const Title = styled.h1`
  text-align: center;
  font-weight: 800;
  font-size: 40px;
  margin-bottom: 30px;
  letter-spacing: 20px;
  text-shadow: 3px 3px 2px #555;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 45px;
  height: 45px;
  border: 1px solid #8f9092;
  border-radius: 50%;
  outline: none;
  background-image: linear-gradient(to top, #d8d9db 0%, #fff 80%, #fdfdfd 100%);
  box-shadow: 0 2px 1px 1px #fcfcfc, 3px 1px 3px #d6d7d9, -3px 0 3px #cecfd1, 0 -3px 3px #fefefe,
    inset 0 1px 1px 0 #cecfd1;
  transition: all 0.2s ease;
  user-select: none;
  cursor: pointer;
  -webkit-appearance: none;

  &::-moz-focus-inner {
    border: 0;
  }

  &:hover {
    box-shadow: 0 2px 1px 1px #fcfcfc, 3px 1px 3px #d6d7d9, -3px 0 3px #cecfd1, 0 -3px 3px #fefefe,
      inset 0 1px 1px 0 #cecfd1;
  }

  &:active {
    box-shadow: 0 1px 1px 1px #fcfcfc, 0 1px 3px #d6d7d9, 3px 0px 3px #cecfd1, 0px -3px 3px #fefefe,
      inset 0 0 5px 3px #999, inset 0 0 30px #aaa;
  }
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
  margin-top: 5px;
  font-weight: 600;
`;

export const PositionGroup = styled.div`
  margin-bottom: 2px;
`;

export const PositionTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 864px;
  gap: 2px;
`;

export const PositionTitle = styled.div<{ $heightNum: number }>`
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $heightNum }) => $heightNum * 30 + ($heightNum - 1)}px;
  padding: 0 10px;
  background-color: #fff;
  color: #000;
  font-weight: 600;

  &:last-child {
    margin-bottom: 2px;
  }
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 3px;
  width: 100%;
  border: 1px solid #000;
  box-sizing: border-box;
`;

export const Description = styled.div`
  flex: 1;
  padding: 13px 0;
  font-weight: 600;
  font-size: 17px;
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
