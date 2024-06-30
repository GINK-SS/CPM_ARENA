import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Block = styled.div<{ $isActive: boolean }>`
  display: ${({ $isActive }) => ($isActive ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 5;
`;

export const Card = styled.div<{ $isActive: boolean }>`
  position: relative;
  background-image: url('/assets/card_background.png');
  background-size: cover;
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'default')};
`;

export const BorderBox = styled.div<{ $isSelected: boolean; $isPinned: boolean }>`
  display: ${({ $isSelected, $isPinned }) => ($isSelected || $isPinned ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  height: 100%;
  border: ${({ $isPinned }) => $isPinned && '2px solid #ff5a00'};
  z-index: 1;
  outline: ${({ $isPinned }) => $isPinned && '1px solid #ff5a00'};
  box-shadow: ${({ $isPinned }) =>
    $isPinned
      ? 'inset 0 0 20px 1px #ff5a00, inset 0 -10px 10px 0 rgba(255, 187, 153, 0.5)'
      : 'inset 0 0 8px 1px #ff5a00, inset 0 -10px 10px 0 rgba(255, 187, 153, 0.4)'};
  box-sizing: border-box;
`;

export const Main = styled.div<{ $imageSrc: string }>`
  display: flex;
  justify-content: space-between;
  width: 73px;
  height: 70px;
  border: 1px solid #666;
  border-bottom: 1px solid #853326;
  background-image: url(${({ $imageSrc }) => $imageSrc});
  background-size: cover;
  box-sizing: border-box;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-weight: 600;
`;

export const Overall = styled.span`
  text-shadow: 0 1px 5px #000;
  transform: scaleY(1.3);
`;

export const Position = styled.div`
  text-shadow: 0 1px 2px #000;
`;

export const TeamWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  height: 7px;
  padding: 1px 4px 0px 2px;
  border-bottom: 2px solid #000;
  font-weight: 600;
  background: linear-gradient(90deg, #853326 30%, #150401 80%);

  & > span {
    font-size: 7px;
    color: #948585;
  }
`;

export const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 13px;
  padding: 2px 1px;
  font-size: 13px;
  font-weight: 600;
  background: linear-gradient(90deg, #1c1c1a, #000);
`;

export const Year = styled.span`
  color: #999;
`;

export const Name = styled.span<{ $length: number }>`
  font-size: ${({ $length }) => $length >= 5 && '11px'};
`;

export const OrderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15px;
  padding: 1px;
  font-weight: 600;
  background-color: #000;
`;

export const OrderNumberWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const OrderNumber = styled.div<{ $orderNumber: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11px;
  height: 11px;
  padding: 1px;
  border-radius: 3px;
  font-size: 11px;
  background-color: ${({ $orderNumber }) =>
    $orderNumber <= 2 ? '#6FB0FA' : $orderNumber <= 5 ? '#ff4646' : '#7BCC35'};
`;

export const OrderType = styled.span<{ $orderType: string }>`
  font-size: 11px;
  color: ${({ $orderType }) =>
    $orderType === '상위'
      ? '#9cb9d6'
      : $orderType === '클린업'
      ? '#f57676'
      : $orderType === '하위'
      ? '#B3DC90'
      : '#9d75c7'};
`;
