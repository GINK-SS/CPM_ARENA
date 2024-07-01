import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  transform: scale(1.1);
  transform-origin: top;

  @media (max-width: 470px) {
    transform: scale(1);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const Title = styled.div`
  height: 20px;

  @media (max-width: 470px) {
    font-size: 14px;
  }

  @media (max-width: 353px) {
    height: 16px;
    font-size: 12px;
  }
`;

export const Logo = styled.div`
  position: relative;
  width: 20px;
  height: 20px;

  @media (max-width: 353px) {
    width: 16px;
    height: 16px;
  }
`;

export const CurrentNumberWrapper = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.2)};
`;

export const Icon = styled.div`
  font-size: 12px;

  @media (max-width: 353px) {
    font-size: 8px;
  }
`;

export const CurrentNumber = styled.span`
  font-size: 14px;

  @media (max-width: 353px) {
    font-size: 10px;
  }
`;

export const GradeWrapper = styled.div`
  display: flex;
`;

export const Grade = styled.span<{ $isActive: boolean }>`
  font-size: 10px;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.2)};

  &::before {
    content: '/';
    margin: 0 1px;
  }

  &:first-child::before {
    content: '';
  }

  @media (max-width: 353px) {
    font-size: 6px;
  }
`;

export const Value = styled.span<{ $gradeIdx: number }>`
  font-weight: 600;
  font-size: 20px;
  opacity: ${({ $gradeIdx }) => ($gradeIdx !== -1 ? 1 : 0.2)};
  color: ${({ $gradeIdx }) =>
    $gradeIdx === 3 ? '#DD41FF' : $gradeIdx === 2 ? '#FFE900' : $gradeIdx === 1 ? '#70B3F8' : '#fff'};

  @media (max-width: 353px) {
    font-size: 16px;
  }
`;
