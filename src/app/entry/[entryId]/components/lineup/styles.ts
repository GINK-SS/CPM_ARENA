import styled from 'styled-components';

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
