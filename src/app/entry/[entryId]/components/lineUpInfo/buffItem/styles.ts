import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const Title = styled.div`
  height: 20px;

  @media (max-width: 726px) {
    font-size: 13px;
  }

  @media (max-width: 660px) {
    font-size: 16px;
  }

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
  font-size: 12px;

  @media (max-width: 353px) {
    font-size: 8px;
  }
`;

export const GradeWrapper = styled.div`
  display: flex;
`;

export const Grade = styled.span<{ $isActive: boolean }>`
  font-size: 8px;
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

export const Value = styled.span<{ $value: number }>`
  font-weight: 600;
  font-size: 18px;
  opacity: ${({ $value }) => ($value ? 1 : 0.2)};

  @media (max-width: 353px) {
    font-size: 16px;
  }
`;
