import MainTitle from './components/main-title';
import YearButton from './components/year-button';
import TeamButton from './components/team-button';
import SubmitBtn from './components/submit-button';
import Footer from './components/footer';

import { Team } from './stores/team/types';

export default async function Home() {
  const BASE_URL = process.env.VERCEL_URL ?? process.env.BASE_URL;
  const teamData: Team[] = await fetch(`${BASE_URL}/storage/teams.json`).then((res) => res.json());

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <div className='w-full px-5 pb-20 pt-80 mobileL:px-10'>
        <MainTitle />

        <div className='mx-auto mb-60 flex max-w-[700px] flex-col justify-between gap-10 laptop:mb-170 laptop:max-w-[1000px] laptop:flex-row'>
          <YearButton />
          <TeamButton allTeams={teamData} />
        </div>

        <SubmitBtn />

        <Footer />
      </div>
    </div>
  );
}
