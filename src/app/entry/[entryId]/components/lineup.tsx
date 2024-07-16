import { useShallow } from 'zustand/react/shallow';
import { Dispatch, SetStateAction } from 'react';
import { ImArrowRight } from 'react-icons/im';
import classNames from 'classnames';

import PlayerCard from './player-card';
import InfoBox from './info-box';
import useTableStore from '@/app/stores/table';
import usePlayerStore from '@/app/stores/player';
import useBuffStore from '@/app/stores/buff';

import { isHitter } from '@/app/util/decideType';
import { Team } from '@/app/stores/team/types';

type LineupProps = {
  isStickyOn: boolean;
  setIsStickyOn: Dispatch<SetStateAction<boolean>>;
  selectedTeams: Team[];
};

const Lineup = ({ isStickyOn, setIsStickyOn, selectedTeams }: LineupProps) => {
  const [
    hitterLineup,
    pitcherLineup,
    selectedPlayer,
    pinnedPlayer,
    setSelectedPlayer,
    setPinnedPlayer,
    changePositionLineup,
    changeOrderLineup,
  ] = usePlayerStore(
    useShallow((state) => [
      state.hitterLineup,
      state.pitcherLineup,
      state.selectedPlayer,
      state.pinnedPlayer,
      state.setSelectedPlayer,
      state.setPinnedPlayer,
      state.changePositionLineup,
      state.changeOrderLineup,
    ])
  );
  const [isShowHitterLineup, toggleIsShowHitterLineup] = useTableStore(
    useShallow((state) => [state.isShowHitterLineup, state.toggleIsShowHitterLineup])
  );
  const changeBuff = useBuffStore((state) => state.changeBuff);
  const hitterOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const pitcherOrder = [
    '1선발',
    '2선발',
    '3선발',
    '4선발',
    '5선발',
    '승리조A',
    '승리조B',
    '추격조A',
    '추격조B',
    '마무리',
  ];

  const onCancel = () => {
    setSelectedPlayer(null);
    setPinnedPlayer(null);
  };

  const onChangePosition = () => {
    if (!selectedPlayer || !pinnedPlayer) return;
    if (!isHitter(selectedPlayer) || !isHitter(pinnedPlayer)) return;
    if (!hitterLineup.some((hitter) => hitter.player === selectedPlayer)) return;

    changePositionLineup({ selectedPlayer, pinnedPlayer });
    setSelectedPlayer(null);
    setPinnedPlayer(null);
  };

  const onChangeOrder = () => {
    if (!selectedPlayer || !pinnedPlayer) return;
    if (isHitter(selectedPlayer) !== isHitter(pinnedPlayer)) return;

    if (
      !hitterLineup.some((hitter) => hitter.player === selectedPlayer) &&
      !pitcherLineup.some((pitcher) => pitcher.player === selectedPlayer)
    ) {
      changeBuff({
        pinnedPlayer,
        selectedPlayer,
        pinTeamIdx: selectedTeams.findIndex((selectedTeam) => selectedTeam.id === pinnedPlayer.team),
        selectTeamIdx: selectedTeams.findIndex((selectedTeam) => selectedTeam.id === selectedPlayer.team),
      });
    }

    changeOrderLineup({ selectedPlayer, pinnedPlayer });
    setSelectedPlayer(null);
    setPinnedPlayer(null);
  };

  const onSwitchLineup = () => {
    setSelectedPlayer(null);
    setPinnedPlayer(null);
    toggleIsShowHitterLineup();
  };

  return (
    <InfoBox
      title='라인업'
      headerRight={
        <div className='flex items-center gap-5'>
          <p className='text-12 font-semibold'>하단에 고정하기</p>
          <div
            className={classNames('mr-5 flex h-17 w-26 cursor-pointer rounded-2xl p-3', {
              'justify-start, bg-[#a82919]': isStickyOn,
              'justify-end bg-white/40': !isStickyOn,
            })}
            onClick={() => setIsStickyOn((prev) => !prev)}
          >
            <div className='aspect-square w-10 rounded-full bg-white' />
          </div>
        </div>
      }
    >
      <div className='mobileL:mx-[-80px] mobileL:my-[-15px] mobileL:scale-[80%] tablet:mx-[-25px] tablet:my-[-5px] tablet:scale-95 laptop:m-0 laptop:scale-100'>
        <div className='mb-4 flex justify-between mobileL:mb-8'>
          {(isShowHitterLineup ? hitterOrder : pitcherOrder).map((value) => (
            <div key={value} className='flex-1 text-center text-[2.2vw] font-semibold mobileL:text-16'>
              {value}
            </div>
          ))}
        </div>

        <div className='flex justify-between'>
          {(isShowHitterLineup ? hitterLineup : pitcherLineup).map((value, index) => (
            <PlayerCard key={index} card={value} order={index + 1} />
          ))}
        </div>

        <div className='mt-4 flex justify-end gap-5 mobileL:mt-8 mobileL:gap-10'>
          <button
            className={classNames(
              'flex h-[5vw] w-[10vw] items-center justify-center border-none text-[2vw] font-semibold text-white outline-none mobileL:h-40 mobileL:w-85 mobileL:text-18',
              {
                'bg-gradient-to-b from-[#a82919] from-20% via-[#761d1b] via-50% to-[#a82919] to-100%':
                  selectedPlayer || pinnedPlayer,
                'cursor-default bg-gradient-to-b from-[#777] from-20% via-[#333] via-50% to-[#777] to-100%':
                  !selectedPlayer && !pinnedPlayer,
              }
            )}
            onClick={onCancel}
          >
            <span className='indent-[2vw] tracking-[2vw] mobileL:indent-10 mobileL:tracking-[10px]'>취소</span>
          </button>

          {isShowHitterLineup && (
            <button
              className={classNames(
                'flex h-[5vw] w-[10vw] items-center justify-center border-none text-[2vw] font-semibold text-white outline-none mobileL:h-40 mobileL:w-85 mobileL:text-18',
                {
                  'bg-gradient-to-b from-[#a82919] from-20% via-[#761d1b] via-50% to-[#a82919] to-100%':
                    pinnedPlayer && selectedPlayer && hitterLineup.some((hitter) => hitter.player === selectedPlayer),
                  'cursor-default bg-gradient-to-b from-[#777] from-20% via-[#333] via-50% to-[#777] to-100%':
                    !pinnedPlayer ||
                    !selectedPlayer ||
                    !hitterLineup.some((hitter) => hitter.player === selectedPlayer),
                }
              )}
              onClick={onChangePosition}
            >
              <span className='indent-[0.4vw] tracking-[0.4vw] mobileL:indent-3 mobileL:tracking-[3px]'>수비변경</span>
            </button>
          )}

          <button
            className={classNames(
              'flex h-[5vw] w-[10vw] items-center justify-center border-none text-[2vw] font-semibold text-white outline-none mobileL:h-40 mobileL:w-85 mobileL:text-18',
              {
                'bg-gradient-to-b from-[#a82919] from-20% via-[#761d1b] via-50% to-[#a82919] to-100%':
                  pinnedPlayer && selectedPlayer && isHitter(selectedPlayer) === isHitter(pinnedPlayer),
                'cursor-default bg-gradient-to-b from-[#777] from-20% via-[#333] via-50% to-[#777] to-100%':
                  !pinnedPlayer || !selectedPlayer || isHitter(selectedPlayer) !== isHitter(pinnedPlayer),
              }
            )}
            onClick={onChangeOrder}
          >
            <span className='indent-[2vw] tracking-[2vw] mobileL:indent-10 mobileL:tracking-[10px]'>교체</span>
          </button>

          <button
            className={classNames(
              'flex h-[5vw] w-[10vw] items-center justify-center border-none text-[2vw] font-semibold text-white outline-none mobileL:h-40 mobileL:w-85 mobileL:text-18',
              'bg-gradient-to-b from-[#a82919] from-20% via-[#761d1b] via-50% to-[#a82919] to-100%'
            )}
            onClick={onSwitchLineup}
          >
            <span className='indent-0.41vw] tracking-0.41vw] mobileL:indent-3 mobileL:tracking-[3px]'>
              {isShowHitterLineup ? '투수로' : '타자로'}
            </span>
            <ImArrowRight />
          </button>
        </div>
      </div>
    </InfoBox>
  );
};

export default Lineup;
