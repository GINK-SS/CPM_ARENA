import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Outer = styled(motion.div)<{ $isActive: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.5px);
  z-index: 5;
`;

export const Container = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 416px) {
    margin-bottom: 0px;
  }
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
`;

export const Title = styled.h1`
  text-align: center;
  font-weight: 800;
  font-size: 40px;
  margin-bottom: 30px;
  letter-spacing: 20px;
  text-shadow: 3px 3px 2px #555;

  @media (max-width: 660px) {
    font-size: 30px;
  }

  @media (max-width: 560px) {
    margin-bottom: 15px;
    font-size: 25px;
  }

  @media (max-width: 470px) {
    margin-bottom: 10px;
    font-size: 20px;
  }

  @media (max-width: 416px) {
    margin-bottom: 8px;
    font-size: 16px;
    letter-spacing: 10px;
  }

  @media (max-width: 353px) {
    font-size: 13px;
    text-shadow: 2px 2px 0px #555;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2px;

  @media (max-width: 560px) {
    gap: 1px;
  }
`;

export const PositionTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: 660px) {
    gap: 1px;
  }
`;

export const PositionTitle = styled.div<{ $heightNum: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $heightNum }) => $heightNum * 30 + ($heightNum - 1)}px;
  padding: 0 10px;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  font-weight: 600;

  &:last-child {
    margin-bottom: 2px;
  }

  @media (max-width: 726px) {
    padding: 0 5px;
  }

  @media (max-width: 660px) {
    height: ${({ $heightNum }) => $heightNum * 26 + ($heightNum - 1)}px;
    font-size: 13px;

    &:last-child {
      margin-bottom: 1px;
    }
  }

  @media (max-width: 560px) {
    height: ${({ $heightNum }) => $heightNum * 22 + ($heightNum - 1)}px;
    padding: 0 3px;
    font-size: 10px;
  }

  @media (max-width: 470px) {
    height: ${({ $heightNum }) => $heightNum * 20 + ($heightNum - 1)}px;
    font-size: 8px;
  }

  @media (max-width: 416px) {
    height: ${({ $heightNum }) => $heightNum * 16 + ($heightNum - 1)}px;
    font-size: 7px;
  }

  @media (max-width: 353px) {
    height: ${({ $heightNum }) => $heightNum * 14 + ($heightNum - 1)}px;
    padding: 0 2px;
    font-size: 6px;
  }
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 3px;
  width: 100%;
  margin-bottom: 5px;
  border: 1px solid #000;
  box-sizing: border-box;
`;

export const Description = styled.div`
  flex: 1;
  padding: 13px 0;
  font-weight: 600;
  font-size: 17px;
  text-align: center;
  letter-spacing: 2px;

  &:first-child {
    background-color: #f0c2bd;
    color: #000;
  }

  &:nth-child(2) {
    background-color: #f5df94;
    color: #000;
  }

  &:nth-child(3) {
    background-color: #fff;
    color: #ca4142;
  }

  &:nth-child(4) {
    background-color: #fff;
    color: #1b1588;
  }

  @media (max-width: 660px) {
    padding: 10px 0;
    font-size: 15px;
  }

  @media (max-width: 560px) {
    padding: 7px 0;
    font-size: 12px;
  }

  @media (max-width: 470px) {
    padding: 5px 0;
    font-size: 10px;
    letter-spacing: 1px;
  }

  @media (max-width: 416px) {
    padding: 3px 0;
    font-size: 9px;
    letter-spacing: 0;
  }

  @media (max-width: 353px) {
    padding: 2px 0;
    font-size: 7px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 3px;
  margin-top: 5px;

  @media (max-width: 660px) {
    flex-direction: column;
    margin-top: 3px;
  }

  @media (max-width: 353px) {
    gap: 2px;
    margin-top: 2px;
  }
`;
