import Image from 'next/image';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import useYearStore from '@/app/stores/year';
import useTeamStore from '@/app/stores/team';

import { Team } from '@/app/stores/team/types';

const TeamSelection = () => {
  const { selectedYear } = useYearStore();
  const { allTeams, selectedTeams, setTeams } = useTeamStore();

  const onTeamClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selectedTeam = allTeams.find((team) => team.id === e.currentTarget.value) as Team;

    setTeams({
      team: selectedTeam,
      index: selectedTeams.includes(selectedTeam) ? selectedTeams.indexOf(selectedTeam) : selectedTeams.length,
      action: selectedTeams.includes(selectedTeam) ? 'DELETE' : 'ADD',
    });
  };

  return (
    <motion.div
      className={classNames(
        'absolute z-[1] grid w-[95vw] grid-cols-7 gap-2 rounded-sm border-2 bg-slate-200 p-5 tablet:w-[600px] laptop:w-[495px]'
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {allTeams.map((team, index) => (
        <button
          className={classNames(
            'flex flex-col items-center justify-center gap-2 break-keep rounded-md border-1 border-slate-900 p-5 text-[2vw] tablet:text-14',
            {
              'bg-[#410] font-semibold text-white': selectedTeams.includes(team),
              'bg-white text-black': !selectedTeams.includes(team),
              'opacity-20': !selectedYear || !team.years.includes(selectedYear),
              'text-black hover:bg-[#e0a82433]':
                !selectedTeams.includes(team) && selectedYear && team.years.includes(selectedYear),
            }
          )}
          key={index}
          value={team.id}
          onClick={onTeamClick}
          disabled={!selectedYear || !team.years.includes(selectedYear)}
        >
          <div className='relative aspect-square w-[8vw] drop-shadow-[0.5vw_0.5vw_0_#333] tablet:w-45 tablet:drop-shadow-[3px_3px_0_#333] laptop:w-40'>
            <Image src={team.logo} alt={team.name} placeholder='blur' blurDataURL={team.logo} fill sizes='50px' />
          </div>

          <div className='flex w-full flex-1 items-center justify-center leading-[2.2vw] tablet:h-35 tablet:flex-none tablet:leading-16'>
            <span>{team.name}</span>
          </div>
        </button>
      ))}
    </motion.div>
  );
};

export default TeamSelection;
