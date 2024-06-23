import * as S from './styles';

const Loading = ({ text }: { text: string }) => {
  return (
    <S.Container>
      <S.Description>
        <S.Spinner />

        <S.Text>{text}</S.Text>
      </S.Description>
    </S.Container>
  );
};

export default Loading;
