import { Buff } from './stores/buff/types';
import { Hitter, Pitcher } from './stores/player/types';
import { TeamId, TeamShorten } from './stores/team/types';

export const FIRST_YEAR = 1982;
export const LAST_YEAR = 2023;

export const YEAR_LIST = [
  2020,
  2021,
  2022,
  2023,
  null,
  null,
  null,
  null,
  null,
  null,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
  2000,
  2001,
  2002,
  2003,
  2004,
  2005,
  2006,
  2007,
  2008,
  2009,
  1990,
  1991,
  1992,
  1993,
  1994,
  1995,
  1996,
  1997,
  1998,
  1999,
  null,
  null,
  1982,
  1983,
  1984,
  1985,
  1986,
  1987,
  1988,
  1989,
];

export const SHORTEN_DATA: { [key: string]: { name: TeamId; start: number; end: number } } = {
  ka: { name: 'KIA', start: 2001, end: LAST_YEAR },
  kt: { name: 'kt', start: 2015, end: LAST_YEAR },
  lg: { name: 'LG', start: 1990, end: LAST_YEAR },
  mb: { name: 'MBC', start: FIRST_YEAR, end: 1989 },
  nc: { name: 'NC', start: 2013, end: LAST_YEAR },
  ob: { name: 'OB', start: FIRST_YEAR, end: 1998 },
  sk: { name: 'SK', start: 2000, end: 2020 },
  sg: { name: 'SSG', start: 2021, end: LAST_YEAR },
  nx: { name: '넥센', start: 2008, end: 2018 },
  ds: { name: '두산', start: 1999, end: LAST_YEAR },
  lt: { name: '롯데', start: FIRST_YEAR, end: LAST_YEAR },
  bg: { name: '빙그레', start: 1986, end: 1993 },
  sm: { name: '삼미', start: FIRST_YEAR, end: 1984 },
  ss: { name: '삼성', start: FIRST_YEAR, end: LAST_YEAR },
  sb: { name: '쌍방울', start: 1991, end: 1999 },
  cb: { name: '청보', start: 1985, end: 1987 },
  kw: { name: '키움', start: 2019, end: LAST_YEAR },
  tp: { name: '태평양', start: 1988, end: 1995 },
  hw: { name: '한화', start: 1994, end: LAST_YEAR },
  ht: { name: '해태', start: FIRST_YEAR, end: 2000 },
  hd: { name: '현대', start: 1996, end: 2007 },
};

export const TEAMID_TO_SHORTEN: { [key: string]: TeamShorten } = {
  KIA: 'ka',
  kt: 'kt',
  LG: 'lg',
  MBC: 'mb',
  NC: 'nc',
  OB: 'ob',
  SK: 'sk',
  SSG: 'sg',
  넥센: 'nx',
  두산: 'ds',
  롯데: 'lt',
  빙그레: 'bg',
  삼미: 'sm',
  삼성: 'ss',
  쌍방울: 'sb',
  청보: 'cb',
  키움: 'kw',
  태평양: 'tp',
  한화: 'hw',
  해태: 'ht',
  현대: 'hd',
};

export const BUFF_LIST: { [key in Buff]: { name?: string; grades: number[]; gradeValues: number[] } } = {
  team: {
    grades: [2, 4, 6, 9],
    gradeValues: [3, 6, 9, 10],
  },
  all_star: {
    name: '올스타',
    grades: [5, 9, 12],
    gradeValues: [2, 3, 4],
  },
  golden_glove: {
    name: '골글',
    grades: [2, 3, 5],
    gradeValues: [2, 3, 5],
  },
  mvp: {
    name: 'MVP',
    grades: [1, 2],
    gradeValues: [2, 4],
  },
};

export const HITTER_STAT: { [key: string]: keyof Hitter } = {
  타격: 'batting_all',
  장타: 'long_all',
  선구: 'eye_all',
  주루: 'running',
  수비: 'defense',
};
export const PITCHER_STAT: { [key: string]: keyof Pitcher } = {
  변화: 'pitch_all',
  제구: 'control_all',
  구위: 'stuff_all',
  멘탈: 'mental',
  체력: 'stamina',
};
export const HITTER_STAT_DETAIL: { [key: string]: keyof Hitter } = {
  '타격(우투)': 'batting_right',
  '장타(우투)': 'long_right',
  '타격(좌투)': 'batting_left',
  '장타(좌투)': 'long_left',
  '타격(언더)': 'batting_under',
  '장타(언더)': 'long_under',
};
export const PITCHER_STAT_DETAIL: { [key: string]: keyof Pitcher } = {
  '변화(우타)': 'pitch_right',
  '변화(좌타)': 'pitch_left',
  '제구(우타)': 'control_right',
  '제구(좌타)': 'control_left',
  '구위(우타)': 'stuff_right',
  '구위(좌타)': 'stuff_left',
};

export const POSITION_LIMIT: { [key: string]: number } = {
  포수: 2,
  '1루수': 2,
  '2루수': 2,
  '3루수': 2,
  유격수: 2,
  외야수: 5,
  선발: 5,
  계투: 5,
  마무리: 2,
};

export const HITTER_POSITION_ORDER = ['포수', '1루수', '2루수', '3루수', '유격수', '외야수'];

export const PITCHER_POSITION_ORDER = ['선발', '계투', '마무리'];

export const BASE_URL =
  process.env.VERCEL_ENV === 'preview' ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_BASE_URL;
