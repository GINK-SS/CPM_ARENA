import { Metadata, ResolvingMetadata } from 'next';

import Header from './components/header';
import NotFound from '@/app/not-found';

import { FIRST_YEAR, LAST_YEAR, SHORTEN_DATA } from '@/app/const';
import { Hitter, Pitcher } from '@/app/stores/player/types';
import { Team, TeamId } from '@/app/stores/team/types';
import EntryView from './components/entry-view';
import EntryDescription from './components/entry-description';
import Lineup from './components/lineup';
import LineUpInfo from './components/lineup-info';
import SimpleBox from './components/simple-box';
import PlayerDetail from './components/player-detail';

type MetaProps = {
  params: { entryId: string };
  searchParams: { limit: string | undefined };
};

export async function generateMetadata(
  { params: { entryId } }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
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

export default async function Page({ params: { entryId }, searchParams: { limit } }: MetaProps) {
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

  const BASE_URL = process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

  const allTeams: Team[] = await fetch(`${BASE_URL}/storage/teams.json`).then((res) => res.json());
  const selectedTeams: Team[] = [];
  const selectedTeamIds: Set<TeamId> = new Set();

  paramTeams.forEach((team) => {
    const selectedTeam = SHORTEN_DATA[team];

    if (!selectedTeam || selectedTeam.start > paramYear || selectedTeam.end < paramYear) {
      return <NotFound />;
    }

    selectedTeams.push(allTeams.find((team) => team.id === selectedTeam.name)!);
    selectedTeamIds.add(selectedTeam.name);
  });

  const hittersData: Hitter[] = await fetch(`${BASE_URL}/storage/hitter/hitters-${paramYear.toString()[2]}0.json`).then(
    (res) => res.json()
  );
  const pitchersData: Pitcher[] = await fetch(
    `${BASE_URL}/storage/pitcher/pitchers-${paramYear.toString()[2]}0.json`
  ).then((res) => res.json());

  const currentHitters = hittersData.filter((hitter) => hitter.year === paramYear && selectedTeamIds.has(hitter.team));
  const currentPitchers = pitchersData.filter(
    (pitcher) => pitcher.year === paramYear && selectedTeamIds.has(pitcher.team)
  );
  const playersOfSelectedTeams = [...currentHitters, ...currentPitchers].filter((player) =>
    selectedTeams.map((team) => team.id).includes(player.team)
  );
  const overallLimit = !limit || isNaN(+limit) || +limit > 99 ? 69 : +limit;

  return (
    <>
      <Header overallLimit={overallLimit} />

      <PlayerDetail selectedTeams={selectedTeams} />

      <div className='relative mx-auto flex w-full flex-col items-center py-10 mobileL:max-w-[630px] mobileL:py-20 tablet:max-w-[750px] laptop:max-w-[850px]'>
        <h1
          data-role='title'
          className='mb-10 text-center indent-8 text-[6vw] font-extrabold tracking-[8px] drop-shadow-[1px_1px_1px_#555] mobileL:mb-20 mobileL:indent-15 mobileL:text-40 mobileL:tracking-[15px] tablet:text-45 tablet:drop-shadow-[3px_3px_2px_#555] laptop:text-55'
        >
          {paramYear}년 ARENA
        </h1>
        <EntryView
          selectedTeams={selectedTeams}
          playersOfSelectedTeams={playersOfSelectedTeams}
          overallLimit={overallLimit}
        />
        <EntryDescription />

        <Lineup selectedTeams={selectedTeams} />
        <SimpleBox />
        <LineUpInfo selectedTeams={selectedTeams} />
      </div>
    </>
  );
}
