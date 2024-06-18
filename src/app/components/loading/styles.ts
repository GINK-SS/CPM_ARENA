import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  user-select: none;
`;

export const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media (max-width: 400px) {
    gap: 10px;
  }
`;

export const Spinner = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 400px) {
    width: 18px;
    height: 18px;
    border-width: 4px;
  }
`;

export const Text = styled.span`
  display: block;
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 1.5px;

  @media (max-width: 400px) {
    font-size: 15px;
  }
`;
