import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  background-color: #222;
  background: linear-gradient(45deg, #000, #111);
  box-sizing: border-box;

  @media (max-width: 660px) {
    width: 100%;
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

export const Title = styled.span`
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

export const Content = styled.div`
  width: 100%;
  padding: 7px;
  border: 1px solid #333;
  border-top: 0;
  box-sizing: border-box;

  @media (max-width: 353px) {
    padding: 3px;
  }
`;
