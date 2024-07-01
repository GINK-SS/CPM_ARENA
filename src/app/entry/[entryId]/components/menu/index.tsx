import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { IoMenuOutline } from 'react-icons/io5';

import useTableStore from '@/app/stores/table';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';

import * as S from './styles';

const Menu = () => {
  const [isMenu, openMenu, overallLimit, setOverallLimit] = useTableStore(
    useShallow((state) => [state.isMenu, state.openMenu, state.overallLimit, state.setOverallLimit])
  );
  const [setSelectedPlayer, setPinnedPlayer, clearLineup] = usePlayerStore(
    useShallow((state) => [state.setSelectedPlayer, state.setPinnedPlayer, state.clearLineup])
  );
  const clearBuff = useBuffStore((state) => state.clearBuff);
  const router = useRouter();

  const onBtnClick = () => {
    openMenu();
  };

  const onFilterClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOverallLimit(Number(e.currentTarget.value));
    setSelectedPlayer(null);
    setPinnedPlayer(null);
    clearLineup();
    clearBuff();
  };

  const onReStart = () => {
    router.replace('/');
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
