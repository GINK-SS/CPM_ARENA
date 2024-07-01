import React from 'react';
import { useShallow } from 'zustand/react/shallow';

import useYearStore from '@/app/stores/year';
import useTeamStore from '@/app/stores/team';
import { YEAR_LIST } from '@/app/const';

import * as S from './styles';

const YearSelection = () => {
  const [selectedYear, setYear, closePopup] = useYearStore(
    useShallow((state) => [state.selectedYear, state.setYear, state.closePopup])
  );
  const resetTeams = useTeamStore((state) => state.resetTeams);

  const onYearClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setYear(Number(e.currentTarget.value));
    closePopup();
    resetTeams();
  };

  return (
    <S.Container
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {YEAR_LIST.map((item, index) => (
        <S.Item
          key={index}
          value={item ?? 0}
          onClick={onYearClick}
          disabled={!item}
          $isDisabled={!item}
          $isSelected={item === selectedYear}
        >
          {item ?? ''}
        </S.Item>
      ))}
    </S.Container>
  );
};

export default YearSelection;
