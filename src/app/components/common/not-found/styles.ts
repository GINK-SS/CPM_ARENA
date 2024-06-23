import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 20px;
  user-select: none;
`;

export const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 15px;
  font-weight: 300;
`;

export const Number404 = styled.span`
  display: block;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  padding-right: 20px;
  font-weight: 400;
  font-size: 25px;
  line-height: 50px;
  letter-spacing: 1.5px;
`;

export const RedirectBtn = styled.button`
  padding: 10px 130px;
  border: 1px solid #eee;
  background-color: #333;
  color: #fff;
  font-size: 14px;
  letter-spacing: 1.5px;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #222;
  }
`;
