import { useRouter } from 'next/navigation';
import { IoMenuOutline } from 'react-icons/io5';
import useTableStore from '@/app/stores/table';
import usePlayerStore from '@/app/stores/player';

import * as S from './styles';

const Menu = () => {
  const { isMenu, openMenu, overallLimit, setOverallLimit } = useTableStore();
  const { setSelectedPlayer, setSelectedLineUp } = usePlayerStore();
  const router = useRouter();

  const onBtnClick = () => {
    openMenu();
  };

  const onFilterClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOverallLimit(Number(e.currentTarget.value));
    setSelectedPlayer(null);
    setSelectedLineUp(null);
  };

  const onReStart = () => {
    router.replace('/');
    setOverallLimit(69);
    setSelectedPlayer(null);
    setSelectedLineUp(null);
  };

  return (
    <S.Container onClick={onBtnClick}>
      <IoMenuOutline />

      {isMenu && (
        <S.Wrapper>
          <S.Content>
            <S.FilterWrapper>
              <S.FilterTitle>오버롤 설정</S.FilterTitle>

              <S.FilterBtn onClick={onFilterClick} value={55} $isActive={overallLimit === 55}>
                전체 보기
              </S.FilterBtn>
              <S.FilterBtn onClick={onFilterClick} value={60} $isActive={overallLimit === 60}>
                60 이상 보기
              </S.FilterBtn>
              <S.FilterBtn onClick={onFilterClick} value={65} $isActive={overallLimit === 65}>
                65 이상 보기
              </S.FilterBtn>
              <S.FilterBtn onClick={onFilterClick} value={69} $isActive={overallLimit === 69}>
                69 이상 보기
              </S.FilterBtn>
            </S.FilterWrapper>

            <S.ReSelectBtn onClick={onReStart}>연도 • 팀 재설정</S.ReSelectBtn>
          </S.Content>
        </S.Wrapper>
      )}
    </S.Container>
  );
};

export default Menu;
