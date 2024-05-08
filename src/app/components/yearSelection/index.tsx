import React from 'react';
import useYearStore from '@/app/stores/year';

import * as S from './styles';

const YearSelection = () => {
  const { yearList, setYear, setShowYearList } = useYearStore();

  const onYearClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setYear(Number(e.currentTarget.value));
    setShowYearList();
  };

  return (
    <S.Container>
      {yearList.map((item, index) => (
        <S.Item key={index} value={item ?? 0} onClick={onYearClick} disabled={!item} $isDisabled={!item}>
          {item ?? ''}
        </S.Item>
      ))}
    </S.Container>
  );
};

export default YearSelection;
