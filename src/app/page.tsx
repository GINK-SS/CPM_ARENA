import MainTitle from './components/main-title';
import YearButton from './components/year-button';
import TeamButton from './components/team-button';
import SubmitBtn from './components/submit-button';
import Footer from './components/footer';

import { Team } from './stores/team/types';

export default async function Home() {
  const teamData: Team[] = await fetch(`${process.env.BASE_URL}/storage/teams.json`).then((res) => res.json());

  return (
    <div className='flex min-h-[calc(100vh-61px)] flex-col items-center justify-center'>
      <div className='w-full px-5 py-20 mobileL:px-10'>
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
