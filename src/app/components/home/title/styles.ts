import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-bottom: 50px;
`;

export const Title = styled.h1`
  font-size: 130px;
  font-weight: 800;
  text-shadow: -1px 0px #ff622c, 0px 1px #ff622c, 1px 0px #ff622c, 0px -1px #ff622c;
`;

export const SubTitle = styled.h2`
  padding-bottom: 3px;
  border-bottom: 3px solid #fff;
  font-size: 40px;
  font-weight: 600;
`;
