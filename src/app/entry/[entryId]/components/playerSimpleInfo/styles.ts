import styled from 'styled-components';

export const RecordWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-right: 5px;
`;

export const Record = styled.div<{ $value: string }>`
  display: ${({ $value }) => ($value ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 20px;
  padding: 1px 0;
  border: 1px solid ${({ $value }) => ($value === 'A' ? '#fe6b35' : $value === 'G' ? '#f5d300' : '#a0edff')};
  font-weight: 800;
  color: ${({ $value }) => ($value === 'A' ? '#fe6b35' : $value === 'G' ? '#f5d300' : '#a0edff')};
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  flex: 1;

  @media (max-width: 726px) {
    height: 30px;
  }
`;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 820px) {
    gap: 3px;
  }

  @media (max-width: 726px) {
    gap: 2px;
  }

  @media (max-width: 660px) {
    gap: 10px;
  }

  @media (max-width: 470px) {
    gap: 3px;
  }

  @media (max-width: 353px) {
    gap: 2px;
  }
`;

export const Logo = styled.div`
  position: relative;
  width: 25px;
  height: 25px;

  @media (max-width: 820px) {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 726px) {
    width: 17px;
    height: 17px;
  }

  @media (max-width: 660px) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 470px) {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 353px) {
    width: 17px;
    height: 17px;
  }
`;

export const Name = styled.span`
  font-weight: 600;
  font-size: 18px;

  @media (max-width: 820px) {
    font-size: 16px;
  }

  @media (max-width: 726px) {
    font-size: 13px;
  }

  @media (max-width: 660px) {
    font-size: 18px;
  }

  @media (max-width: 470px) {
    font-size: 14px;
  }

  @media (max-width: 353px) {
    font-size: 13px;
  }
`;

export const Overall = styled.span`
  font-weight: 600;
  font-size: 18px;
  transform: scaleY(1.5);

  @media (max-width: 820px) {
    font-size: 16px;
  }

  @media (max-width: 726px) {
    font-size: 13px;
  }

  @media (max-width: 660px) {
    font-size: 18px;
  }

  @media (max-width: 470px) {
    font-size: 14px;
  }

  @media (max-width: 353px) {
    font-size: 13px;
  }
`;

export const DetailBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  font-weight: 600;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  @media (max-width: 353px) {
    width: 20px;
    height: 20px;
    font-size: 13px;
  }
`;
