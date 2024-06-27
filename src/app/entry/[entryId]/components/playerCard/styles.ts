import styled from 'styled-components';

export const Container = styled.div`
  background-image: url('/assets/card_background.png');
  background-size: cover;
  cursor: pointer;
`;

export const Main = styled.div<{ $imageSrc: string }>`
  display: flex;
  justify-content: space-between;
  width: 73px;
  height: 70px;
  padding: 1px;
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
