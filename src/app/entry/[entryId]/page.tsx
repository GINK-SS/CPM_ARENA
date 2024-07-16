import { Metadata, ResolvingMetadata } from 'next';

import Header from './components/header';
import EntryView from './components/entry-view';
import NotFound from '@/app/not-found';

import { FIRST_YEAR, LAST_YEAR, SHORTEN_DATA } from '@/app/const';
import { Hitter, Pitcher } from '@/app/stores/player/types';
import { Team } from '@/app/stores/team/types';

type MetaProps = {
  params: { entryId: string };
};

export async function generateMetadata({ params }: MetaProps, parent: ResolvingMetadata): Promise<Metadata> {
  const entryId = params.entryId;
  const paramYear = +entryId.slice(0, 4);
  const paramTeams = entryId.slice(4).match(/.{1,2}/g);
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
      url: `/entry/${entryId}`,
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
      site: `/entry/${entryId}`,
      title: `${paramYear}년 아레나 [${selectedTeams.join(' ')}] | 컴프매 아레나 도우미`,
      description: `${paramYear}년 [${selectedTeams.join(' ')}] 아레나 - 최적의 라인업을 구성해보세요!`,
      images: '/assets/metaImg.png',
    },
  };
}

export default async function Page({ params }: MetaProps) {
  const entryId = params.entryId;
  const paramYear = +entryId.slice(0, 4);
  const paramTeams = entryId.slice(4).match(/.{1,2}/g);

  if (
    isNaN(paramYear) ||
    paramYear < FIRST_YEAR ||
    paramYear > LAST_YEAR ||
    !paramTeams ||
    new Set(paramTeams).size !== 5
  ) {
    return <NotFound />;
  }

  const allTeams: Team[] = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/storage/teams.json`).then((res) =>
    res.json()
  );
  const selectedTeams: Team[] = [];

  paramTeams.forEach((team) => {
    const selectedTeam = SHORTEN_DATA[team];

    if (!selectedTeam || selectedTeam.start > paramYear || selectedTeam.end < paramYear) {
      return <NotFound />;
    }

    selectedTeams.push(allTeams.find((team) => team.id === selectedTeam.name)!);
  });

  const hittersData: Hitter[] = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/storage/hitters.json`).then((res) =>
    res.json()
  );
  const pitchersData: Pitcher[] = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/storage/pitchers.json`).then((res) =>
    res.json()
  );

  const currentHitters = hittersData.filter((hitter) => hitter.year === paramYear);
  const currentPitchers = pitchersData.filter((pitcher) => pitcher.year === paramYear);

  return (
    <>
      <Header />
      <EntryView
        selectedTeams={selectedTeams}
        currentHitters={currentHitters}
        currentPitchers={currentPitchers}
        selectedYear={paramYear}
      />
    </>
  );
}
