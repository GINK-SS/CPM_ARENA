import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  margin-bottom: 180px;

  @media (max-width: 1100px) {
    margin-bottom: 120px;
  }

  @media (max-width: 560px) {
    margin-bottom: 90px;
  }

  @media (max-width: 470px) {
    margin-bottom: 75px;
  }

  @media (max-width: 416px) {
    margin-bottom: 60px;
  }

  @media (max-width: 353px) {
    margin-bottom: 50px;
  }
`;

export const Logo = styled.div`
  position: relative;
  width: 100px;
  height: 100px;

  @media (max-width: 660px) {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 560px) {
    width: 65px;
    height: 65px;
  }

  @media (max-width: 470px) {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 353px) {
    width: 35px;
    height: 35px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 140px;
  font-weight: 800;
  color: transparent;
  background: linear-gradient(180deg, #eee 20%, #ed5907 100%);
  background-size: 100% 120%;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  &:nth-child(2) {
    margin-top: -20px;
    margin-bottom: 20px;
  }

  @media (max-width: 660px) {
    font-size: 120px;
  }

  @media (max-width: 560px) {
    font-size: 90px;

    &:nth-child(2) {
      margin-top: -15px;
      margin-bottom: 5px;
    }
  }

  @media (max-width: 470px) {
    font-size: 70px;

    &:nth-child(2) {
      margin-top: -10px;
    }
  }

  @media (max-width: 353px) {
    font-size: 55px;

    &:nth-child(2) {
      margin-top: -5px;
    }
  }
`;

export const SubTitle = styled.h2`
  padding-bottom: 3px;
  border-bottom: 3px solid #fff;
  font-size: 25px;
  font-weight: 700;
  opacity: 0.8;

  @media (max-width: 560px) {
    font-size: 20px;
  }

  @media (max-width: 470px) {
    font-size: 15px;
  }

  @media (max-width: 353px) {
    font-size: 10px;
  }
`;
