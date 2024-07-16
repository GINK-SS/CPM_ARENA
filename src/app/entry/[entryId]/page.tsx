import { Metadata, ResolvingMetadata } from 'next';

import Header from './components/header';
import EntryPage from './components/entry-page';
import NotFound from '@/app/not-found';

import { FIRST_YEAR, LAST_YEAR, SHORTEN_DATA } from '@/app/const';
import { Hitter, Pitcher } from '@/app/stores/player/types';
import { Team } from '@/app/stores/team/types';
import EntryView from './components/entry-view';
import classNames from 'classnames';

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
  const playersOfSelectedTeams = [...currentHitters, ...currentPitchers].filter((player) =>
    selectedTeams.map((team) => team.id).includes(player.team)
  );

  const descriptionList = ['올스타', '골든 글러브', 'MVP', '오버롤 80 이상'];
  const overallLimit = !limit || isNaN(+limit) || +limit > 99 ? 69 : +limit;

  return (
    <>
      <Header overallLimit={overallLimit} />

      <EntryPage
        selectedTeams={selectedTeams}
        currentHitters={currentHitters}
        currentPitchers={currentPitchers}
        selectedYear={paramYear}
      >
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

        <div className='flex w-full justify-around gap-2 border-t-2 border-t-black tablet:gap-3 tablet:border-t-3'>
          {descriptionList.map((description) => (
            <div
              className={classNames(
                'flex-1 py-9 text-center indent-1 text-10 font-semibold tracking-[1px]',
                'mobileL:py-13 mobileL:indent-2 mobileL:text-15 mobileL:tracking-[2px] tablet:text-17',
                'first:bg-[#f0c2bd] last:text-[#1b1588] [&:nth-child(-n+2)]:text-black [&:nth-child(2)]:bg-[#f5df94] [&:nth-child(3)]:text-[#ca4142] [&:nth-last-child(-n+2)]:bg-white'
              )}
              key={description}
            >
              {description}
            </div>
          ))}
        </div>
      </EntryPage>
    </>
  );
}
