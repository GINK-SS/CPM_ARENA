import { Metadata, ResolvingMetadata } from 'next';
import LineupPage from './lineupPage';

type MetaProps = {
  params: { lineupId: string };
};

export async function generateMetadata({ params }: MetaProps, parent: ResolvingMetadata): Promise<Metadata> {
  const lineupId = params.lineupId;
  const paramYear = +lineupId.slice(0, 4);
  const paramTeams = lineupId.slice(4).match(/.{1,2}/g);
  const shortenData = {
    ka: { name: 'KIA', start: 2001, end: 2023 },
    kt: { name: 'kt', start: 2015, end: 2023 },
    lg: { name: 'LG', start: 1990, end: 2023 },
    mb: { name: 'MBC', start: 1982, end: 1989 },
    nc: { name: 'NC', start: 2013, end: 2023 },
    ob: { name: 'OB', start: 1982, end: 1998 },
    sk: { name: 'SK', start: 2000, end: 2020 },
    sg: { name: 'SSG', start: 2021, end: 2023 },
    nx: { name: '넥센', start: 2008, end: 2018 },
    ds: { name: '두산', start: 1999, end: 2023 },
    lt: { name: '롯데', start: 1982, end: 2023 },
    bg: { name: '빙그레', start: 1986, end: 1993 },
    sm: { name: '삼미', start: 1982, end: 1984 },
    ss: { name: '삼성', start: 1982, end: 2023 },
    sb: { name: '쌍방울', start: 1991, end: 1999 },
    cb: { name: '청보', start: 1985, end: 1987 },
    kw: { name: '키움', start: 2019, end: 2023 },
    tp: { name: '태평양', start: 1988, end: 1995 },
    hw: { name: '한화', start: 1994, end: 2023 },
    ht: { name: '해태', start: 1982, end: 2000 },
    hd: { name: '현대', start: 1996, end: 2007 },
  } as { [key: string]: { name: string; start: number; end: number } };
  const selectedTeams = [];

  if (isNaN(paramYear) || paramYear < 1982 || paramYear > 2023 || !paramTeams || new Set(paramTeams).size !== 5) {
    return {
      title: (await parent).title,
    };
  }

  for (let idx = 0; idx < 5; idx += 1) {
    const selectedTeam = shortenData[paramTeams[idx]];

    if (!selectedTeam || selectedTeam.start > paramYear || selectedTeam.end < paramYear) {
      return {
        title: (await parent).title,
      };
    }

    selectedTeams.push(selectedTeam.name);
  }

  return {
    title: `${params.lineupId.slice(0, 4)}년 아레나 [${selectedTeams.join(' ')}] | 컴프매 아레나 도우미`,
    description: `${params.lineupId.slice(0, 4)}년 [${selectedTeams.join(' ')}] 아레나 - 최적의 라인업을 구성해보세요!`,
    openGraph: {
      url: `/lineup/${lineupId}`,
      title: `${params.lineupId.slice(0, 4)}년 아레나 [${selectedTeams.join(' ')}] | 컴프매 아레나 도우미`,
      description: `${params.lineupId.slice(0, 4)}년 [${selectedTeams.join(
        ' '
      )}] 아레나 - 최적의 라인업을 구성해보세요!`,
    },
    twitter: {
      site: `/lineup/${lineupId}`,
      title: `${params.lineupId.slice(0, 4)}년 아레나 [${selectedTeams.join(' ')}] | 컴프매 아레나 도우미`,
      description: `${params.lineupId.slice(0, 4)}년 [${selectedTeams.join(
        ' '
      )}] 아레나 - 최적의 라인업을 구성해보세요!`,
    },
  };
}

export default function Page() {
  return <LineupPage />;
}
