import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  position: absolute;
  width: 370px;
  top: 30%;
  border: 2px solid #aaa;
  background: linear-gradient(220deg, #9e270e, #82220e);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px, rgba(0, 0, 0, 0.5) 3px 3px 3px,
    rgba(0, 0, 0, 0.5) -3px 3px 3px;
  z-index: 5;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
`;

export const Overall = styled.span`
  font-weight: 800;
  font-size: 30px;
  text-shadow: 0px 0px 2px #222;
  transform: scale(1.2, 1.5);
`;

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const TeamWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const Team = styled.span`
  font-size: 14px;
  font-weight: 300;
`;

export const TeamLogo = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
`;

export const Name = styled.h2`
  font-weight: 600;
  font-size: 30px;
`;

export const MiddleContainer = styled.div`
  display: flex;
  padding: 10px;
  background: linear-gradient(220deg, #2b1c1e, #332325);
`;

export const MainStatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  flex: 1;
  padding: 15px;
  padding-right: 65px;
  font-size: 20px;
`;

export const MainStatWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MainStatValue = styled.span<{ $stat: number }>`
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
`;

export const MiddleRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 120px;
  padding: 10px 13px;
  border: 2px solid #82220e;
  background: linear-gradient(220deg, #662315, #6b2d20);
`;

export const PositionHandTypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const Position = styled.span`
  font-weight: 600;
`;

export const RealLogo = styled.div`
  position: relative;
  width: 122px;
  height: 43px;
`;

export const OrderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #00000010;
  font-weight: 600;
  background-color: #52160a;
`;

export const OrderNumberWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const OrderNumber = styled.div<{ $orderNumber: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  padding: 1px;
  border-radius: 4px;
  font-size: 14px;
  background-color: ${({ $orderNumber }) =>
    $orderNumber <= 2 ? '#6FB0FA' : $orderNumber <= 5 ? '#ff4646' : '#7BCC35'};
`;

export const OrderType = styled.span<{ $orderType: string }>`
  font-size: 17px;
  color: ${({ $orderType }) =>
    $orderType === '상위'
      ? '#9cb9d6'
      : $orderType === '클린업'
      ? '#f57676'
      : $orderType === '하위'
      ? '#B3DC90'
      : '#9d75c7'};
`;

export const PitchesContainer = styled.div`
  border: 1px solid #aaa;
`;

export const PitchesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 6px;

  &:nth-child(2n) {
    background-color: #82220e;
  }
`;

export const ArsenalGrade = styled.div<{ $grade?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 14px;
  background-color: ${({ $grade }) =>
    !$grade
      ? ''
      : $grade === 'S'
      ? '#ff2600'
      : $grade === 'A'
      ? '#ff5500'
      : $grade === 'B'
      ? '#ffea00'
      : $grade === 'C'
      ? '#3bd90b'
      : '#1b59f5'};
  text-shadow: -2px 0px #00000080, 0px 2px #00000080, 2px 0px #00000080, 0px -2px #00000080;
`;

export const BottomContainer = styled.div`
  display: flex;
`;

export const DetailStatContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  flex: 1;
  padding: 10px 5px;
  background: linear-gradient(40deg, #5c1102, #c23506);
`;

export const DetailStatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #ffffff20;
  border-right: 1px solid #88888820;
  border-bottom: 1px solid #66666620;
  border-left: 1px solid #88888820;
  font-size: 15px;
`;

export const DetailStatName = styled.span`
  padding: 4px 0;
`;

export const DetailStatValue = styled.span`
  width: 100%;
  padding: 4px 0;
  border-top: 1px solid #00000010;
  border-bottom: 1px solid #00000020;
  background: linear-gradient(220deg, #662315, #5e1d10);
  text-align: center;
`;

export const RecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 140px;
  padding: 10px;
  background: linear-gradient(0deg, #963515, #f56738);
`;

export const RecordTitle = styled.span`
  font-size: 15px;
`;

export const RecordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  height: 95px;
  padding: 5px 3px;
  border-bottom: 1px solid #00000020;
  background: linear-gradient(220deg, #662315, #5e1d10);
`;

export const Record = styled.div<{ $recordName: string }>`
  padding: 5px 0;
  border: ${({ $recordName }) =>
    $recordName === 'all_star'
      ? '1px solid #fe6b35'
      : $recordName === 'golden_glove'
      ? '1px solid #f5d300'
      : '1px solid #a0edff'};
  border-radius: 3px;
  background: linear-gradient(0deg, #0f0704, #240f08);
  color: ${({ $recordName }) =>
    $recordName === 'all_star' ? '#fe6b35' : $recordName === 'golden_glove' ? '#f5d300' : '#a0edff'};
  text-align: center;
`;
