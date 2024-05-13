import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  height: 70px;
  background-color: #222;
  background: linear-gradient(45deg, #000, #111);
  box-sizing: border-box;

  @media (max-width: 660px) {
    width: 100%;
  }

  @media (max-width: 353px) {
    height: 60px;
  }
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
  padding: 5px 0 5px 50px;
  color: #ff1e1e;
  font-weight: 600;
  font-size: 12px;

  > span {
    margin-left: 5px;
    font-size: 11px;
    color: #fff;
  }

  @media (max-width: 726px) {
    padding-left: 20px;
  }

  @media (max-width: 660px) {
    padding-left: 50px;
  }

  @media (max-width: 353px) {
    padding-left: 20px;
  }
`;

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
  width: 100%;
  flex: 1;
  padding: 3px 5px;
  border: 1px solid #333;
  border-top: 0;
  box-sizing: border-box;

  @media (max-width: 353px) {
    padding: 2px 3px;
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
