import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  margin-bottom: 180px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-bottom: 50px;
`;

export const Title = styled.h1`
  font-size: 150px;
  font-weight: 800;
  color: transparent;
  background: linear-gradient(180deg, #eee 20%, #ed5907 100%);
  background-size: 100% 120%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const SubTitle = styled.h2`
  padding-bottom: 3px;
  border-bottom: 3px solid #fff;
  font-size: 25px;
  font-weight: 700;
  opacity: 0.8;
`;
