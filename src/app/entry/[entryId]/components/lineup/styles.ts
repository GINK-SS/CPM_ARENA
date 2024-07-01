import styled from 'styled-components';

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  font-weight: 600;
`;

export const Switch = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: ${({ $isActive }) => ($isActive ? 'flex-start' : 'flex-end')};
  width: 20px;
  height: 10px;
  margin-right: 5px;
  padding: 3px;
  border-radius: 20px;
  background-color: ${({ $isActive }) => ($isActive ? '#a82919' : 'rgba(255, 255, 255, 0.4)')};
  cursor: pointer;

  & > div {
    width: 10px;
    height: 10px;
    border-radius: 20px;
    background-color: white;
  }
`;

export const Container = styled.div`
  transform-origin: top;

  @media (max-width: 820px) {
    margin: 0 -40px -20px;
    transform: scale(0.9);
  }

  @media (max-width: 726px) {
    margin: 0 -80px -40px;
    transform: scale(0.8);
  }

  @media (max-width: 660px) {
    margin: 0 -140px -70px;
    transform: scale(0.65);
  }

  @media (max-width: 560px) {
    margin: 0 -160px -80px;
    transform: scale(0.58);
  }

  @media (max-width: 470px) {
    margin: 0 -200px -95px;
    transform: scale(0.5);
  }

  @media (max-width: 416px) {
    margin: 0 -220px -108px;
    transform: scale(0.44);
  }

  @media (max-width: 353px) {
    margin: 0 -250px -122px;
    transform: scale(0.35);
  }
`;

export const Order = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const OrderValue = styled.div`
  width: 73px;
  font-weight: 600;
  text-align: center;
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
`;

export const Button = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 85px;
  height: 40px;
  border: 0;
  outline: 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  background: ${({ $isActive }) =>
    $isActive
      ? 'linear-gradient(180deg, #a82919 20%, #761d1b 50%, #761d1b 85%, #a82919 100%)'
      : 'linear-gradient(180deg, #777 20%, #333 50%, #333 85%, #777 100%)'};
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'default')};
`;
