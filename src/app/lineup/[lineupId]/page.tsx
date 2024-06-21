import { Metadata, ResolvingMetadata } from 'next';
import LineupPage from './lineupPage';

import { FIRST_YEAR, LAST_YEAR, SHORTEN_DATA } from '@/app/const';

type MetaProps = {
  params: { lineupId: string };
};

export async function generateMetadata({ params }: MetaProps, parent: ResolvingMetadata): Promise<Metadata> {
  const lineupId = params.lineupId;
  const paramYear = +lineupId.slice(0, 4);
  const paramTeams = lineupId.slice(4).match(/.{1,2}/g);
  const selectedTeams = [];

  if (
    isNaN(paramYear) ||
    paramYear < FIRST_YEAR ||
    paramYear > LAST_YEAR ||
    !paramTeams ||
    new Set(paramTeams).size !== 5
  ) {
    return {
      title: (await parent).title,
    };
  }

  for (let idx = 0; idx < 5; idx += 1) {
    const selectedTeam = SHORTEN_DATA[paramTeams[idx]];

    if (!selectedTeam || selectedTeam.start > paramYear || selectedTeam.end < paramYear) {
      return {
        title: (await parent).title,
      };
    }

    selectedTeams.push(selectedTeam.name);
  }

  return {
    title: `${paramYear}년 아레나 [${selectedTeams.join(' ')}] | 컴프매 아레나 도우미`,
    description: `${paramYear}년 [${selectedTeams.join(' ')}] 아레나 - 최적의 라인업을 구성해보세요!`,
    openGraph: {
      type: 'website',
      url: `/lineup/${lineupId}`,
      title: `${paramYear}년 아레나 [${selectedTeams.join(' ')}] | 컴프매 아레나 도우미`,
      description: `${paramYear}년 [${selectedTeams.join(' ')}] 아레나 - 최적의 라인업을 구성해보세요!`,
      siteName: '컴프매 아레나 도우미 | com2usManager Arena Helper',
      images: [
        {
          url: '/assets/metaImg.png',
        },
      ],
    },
    twitter: {
      site: `/lineup/${lineupId}`,
      title: `${paramYear}년 아레나 [${selectedTeams.join(' ')}] | 컴프매 아레나 도우미`,
      description: `${paramYear}년 [${selectedTeams.join(' ')}] 아레나 - 최적의 라인업을 구성해보세요!`,
      images: '/assets/metaImg.png',
    },
  };
}

export default function Page() {
  return <LineupPage />;
}
