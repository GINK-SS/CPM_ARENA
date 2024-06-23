import { styled } from 'styled-components';

export const StatContainer = styled.div`
  display: flex;
  gap: 7px;

  @media (max-width: 820px) {
    gap: 5px;
  }

  @media (max-width: 726px) {
    gap: 4px;
  }

  @media (max-width: 660px) {
    gap: 10px;
  }

  @media (max-width: 470px) {
    gap: 5px;
  }

  @media (max-width: 353px) {
    gap: 3px;
  }
`;

export const StatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;

  @media (max-width: 353px) {
    gap: 2px;
  }
`;

export const StatName = styled.span`
  font-size: 10px;

  @media (max-width: 353px) {
    font-size: 8px;
  }
`;

export const StatValue = styled.span<{ $stat: number }>`
  font-size: 16px;
  color: ${({ $stat }) =>
    $stat >= 110
      ? '#e643d8'
      : $stat >= 100
      ? '#a652e3'
      : $stat >= 90
      ? '#e35252'
      : $stat >= 80
      ? '#fca96a'
      : $stat >= 70
      ? '#fceb6a'
      : '#fff'};

  @media (max-width: 820px) {
    font-size: 15px;
  }

  @media (max-width: 726px) {
    font-size: 13px;
  }

  @media (max-width: 660px) {
    font-size: 16px;
  }

  @media (max-width: 470px) {
    font-size: 15px;
  }

  @media (max-width: 353px) {
    font-size: 12px;
  }
`;
