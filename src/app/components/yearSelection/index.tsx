import React from 'react';

import useYearStore from '@/app/stores/year';
import useTeamStore from '@/app/stores/team';

import * as S from './styles';

const YearSelection = () => {
  const { selectedYear, yearList, setYear, setShowYearList } = useYearStore();
  const { resetTeams } = useTeamStore();

  const onYearClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setYear(Number(e.currentTarget.value));
    setShowYearList();
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
      {yearList.map((item, index) => (
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
