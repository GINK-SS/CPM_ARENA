'use client';

import useYearStore from './stores/year';
import YearSelection from './components/yearSelection';

export default function Home() {
  const { selectedYear, isShow, setShowYearList } = useYearStore();

  const onYearList = () => {
    setShowYearList();
  };

  return (
    <div>
      <button onClick={onYearList}>연도 선택</button>
      <span>{selectedYear ?? '연도를 선택해주세요.'}</span>
      {isShow && <YearSelection />}
      </div>
    </div>
  );
}
