import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 45px;
  height: 45px;
  border: 1px solid #333;
  border-radius: 50%;
  background-color: #fff;
  color: #000;
  font-size: 30px;
  box-shadow: 0px 0px 5px #eee;
  box-sizing: border-box;
  cursor: pointer;

  @media (max-width: 660px) {
    width: 35px;
    height: 35px;
    font-size: 23px;
  }

  @media (max-width: 560px) {
    width: 25px;
    height: 25px;
    font-size: 18px;
    box-shadow: 0px 0px 3px #eee;
  }

  @media (max-width: 470px) {
    width: 22px;
    height: 22px;
    font-size: 14px;
  }

  @media (max-width: 353px) {
    width: 20px;
    height: 20px;
    font-size: 12px;
    box-shadow: 0;
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  padding: 10px;
  border: 3px solid #333;
  background-color: white;
  box-shadow: 4px 4px 2px #555;
  z-index: 10;
  cursor: default;

  &::after {
    content: '';
    position: absolute;
    top: -10px;
    right: 13px;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
    border-left: 10px solid transparent;
  }

  @media (max-width: 660px) {
    top: 50px;

    &::after {
      right: 7px;
    }
  }

  @media (max-width: 560px) {
    top: 40px;

    &::after {
      right: 0;
    }
  }

  @media (max-width: 470px) {
    top: 20px;
    right: -8px;
    transform: scale(0.9);
  }

  @media (max-width: 353px) {
    top: -15px;
    right: -22px;
    transform: scale(0.7);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 130px;
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;
`;

export const FilterTitle = styled.span`
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 1px;
`;

export const FilterBtn = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 7px;
  border: 1px solid #333;
  font-weight: 600;
  font-size: 13px;
  background-color: ${({ $isActive }) => ($isActive ? '#333' : '#fff')};
  color: ${({ $isActive }) => ($isActive ? '#fff' : '#333')};
  cursor: pointer;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ReSelectBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 7px 0;
  border: 1px solid #333;
  font-weight: 600;
  font-size: 13px;
  background-color: #fff;
  color: #333;
  word-break: keep-all;
  cursor: pointer;
`;
