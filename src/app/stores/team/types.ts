export type TeamId =
  | 'KIA'
  | 'kt'
  | 'LG'
  | 'MBC'
  | 'NC'
  | 'OB'
  | 'SK'
  | 'SSG'
  | '넥센'
  | '두산'
  | '롯데'
  | '빙그레'
  | '삼미'
  | '삼성'
  | '쌍방울'
  | '청보'
  | '키움'
  | '태평양'
  | '한화'
  | '해태'
  | '현대';

export type TeamShorten =
  | 'ka'
  | 'kt'
  | 'lg'
  | 'mb'
  | 'nc'
  | 'ob'
  | 'sk'
  | 'sg'
  | 'nx'
  | 'ds'
  | 'lt'
  | 'bg'
  | 'sm'
  | 'ss'
  | 'sb'
  | 'cb'
  | 'kw'
  | 'tp'
  | 'hw'
  | 'ht'
  | 'hd';

export type TeamName =
  | 'KIA 타이거즈'
  | 'kt 위즈'
  | 'LG 트윈스'
  | 'MBC 청룡'
  | 'NC 다이노스'
  | 'OB 베어스'
  | 'SK 와이번스'
  | 'SSG 랜더스'
  | '넥센 히어로즈'
  | '두산 베어스'
  | '롯데 자이언츠'
  | '빙그레 이글스'
  | '삼미 슈퍼스타즈'
  | '삼성 라이온즈'
  | '쌍방울 레이더스'
  | '청보 핀토스'
  | '키움 히어로즈'
  | '태평양 돌핀스'
  | '한화 이글스'
  | '해태 타이거즈'
  | '현대 유니콘스';

export type Team = {
  id: TeamId;
  shorten: TeamShorten;
  name: TeamName;
  years: number[];
};

export type SetTeamsPayload = {
  team: Team;
  index: number;
  action: string;
};

export type TeamStoreState = {
  selectedTeams: Team[];
  setTeams: (teams: Team[]) => void;
  resetTeams: () => void;
};
