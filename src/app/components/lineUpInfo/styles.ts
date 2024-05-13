import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  background-color: #222;
  background: linear-gradient(45deg, #000, #111);
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid #333;
  border-bottom: 1px solid #000;
  border-left: 1px solid #ff1e1e;
  background: linear-gradient(120deg, #ff1e1e 0%, #000 15%, #333 90%);
  box-sizing: border-box;
`;

export const HeaderLeft = styled.span`
  display: flex;
  align-items: center;
  padding: 5px 50px;
  color: #ff1e1e;
  font-weight: 600;
  font-size: 12px;

  > span {
    margin-left: 5px;
    font-size: 11px;
    color: #fff;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 10px 10px;
  border: 1px solid #333;
  border-top: 0;
  box-sizing: border-box;
`;

export const BuffContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

export const BuffWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const BuffTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const BuffName = styled.div`
  height: 20px;
`;

export const BuffCurrentNumberWrapper = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.2)};
`;

export const BuffCurrentIcon = styled.div`
  font-size: 12px;
`;

export const BuffCurrentNumber = styled.span`
  font-size: 12px;
`;

export const BuffGradeWrapper = styled.div`
  display: flex;
`;

export const BuffGrade = styled.span<{ $isActive: boolean }>`
  font-size: 8px;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.2)};

  &::before {
    content: '/';
    margin: 0 1px;
  }

  &:first-child::before {
    content: '';
  }
`;

export const BuffValue = styled.span<{ $value: number }>`
  font-weight: 600;
  font-size: 18px;
  opacity: ${({ $value }) => ($value ? 1 : 0.2)};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const PowerWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 600;
  font-size: 24px;
`;

export const PowerValue = styled.span`
  width: 56px;
  text-align: center;
`;
