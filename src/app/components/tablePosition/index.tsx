import Image from 'next/image';
import { Hitter, Pitcher, PositionLimit } from '@/app/stores/player/types';
import useYearStore from '@/app/stores/year';
import usePlayerStore from '@/app/stores/player';
import TablePlayer from '../tablePlayer';

import * as S from './styles';
import useTableStore from '@/app/stores/table';

const TablePosition = () => {
  const { selectedYear } = useYearStore();
  const { selectedTeams, allTeams, allHitters, allPitchers } = usePlayerStore();
  const { closeTable } = useTableStore();
  const positionLimit: PositionLimit = {
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
  const hitterPositionOrder = ['포수', '1루수', '2루수', '3루수', '유격수', '외야수'];
  const pitcherPositionOrder = ['선발', '계투', '마무리'];

  const hitArrangePlayers = (players: (Hitter | Pitcher)[]) => {
    const arranged = hitterPositionOrder.map((position) => ({
      position,
      players: players.filter((player) => player.position === position),
    }));

    arranged.forEach((item) => {
      const limit = positionLimit[item.position];
      const shortage = limit - item.players.length;

      if (shortage > 0) {
        item.players = [...item.players, ...Array(shortage).fill({ name: '', position: item.position })];
      } else {
        item.players = item.players.slice(0, limit);
      }
    });

    return arranged;
  };

  const pitchArrangePlayers = (players: (Hitter | Pitcher)[]) => {
    const arranged = pitcherPositionOrder.map((position) => ({
      position,
      players: players.filter((player) => player.position === position),
    }));

    arranged.forEach((item) => {
      const limit = positionLimit[item.position];
      const shortage = limit - item.players.length;

      if (shortage > 0) {
        item.players = [...item.players, ...Array(shortage).fill({ name: '', position: item.position })];
      } else {
        item.players = item.players.slice(0, limit);
      }
    });

    return arranged;
  };

  const onReStart = () => {
    closeTable();
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>{selectedYear}년 ARENA</S.Title>
        <S.Button onClick={onReStart}>
          <Image src='/assets/redo.svg' alt='reSelect' width={20} height={20} />
        </S.Button>
      </S.Header>

      <S.TableContainer>
        <S.PositionTitleBox>
          {Object.entries(positionLimit).map((limit) => (
            <S.PositionTitle key={limit[0]} $heightNum={limit[1]}>
              {limit[0]}
            </S.PositionTitle>
          ))}
        </S.PositionTitleBox>

        {selectedTeams.map((selectedTeam, idx) => (
          <S.LineUpWrapper key={idx}>
            <S.TeamTitle>
              <Image
                src={allTeams.find((team) => team.id === selectedTeam)?.logo || ''}
                alt={selectedTeam}
                width='60'
                height='60'
                style={{ filter: 'drop-shadow(3px 3px 0 #333)' }}
              />
              <S.TeamName>{allTeams.find((team) => team.id === selectedTeam)?.name}</S.TeamName>
            </S.TeamTitle>

            {hitArrangePlayers(
              allHitters.filter(
                (hitter) => hitter.year === selectedYear && hitter.team === selectedTeam && hitter.overall >= 69
              )
            ).map((group, index) => (
              <S.PositionGroup key={index}>
                {group.players.map((player, iindex) => (
                  <TablePlayer key={iindex} player={player} />
                ))}
              </S.PositionGroup>
            ))}

            {pitchArrangePlayers(
              allPitchers.filter(
                (pitcher) => pitcher.year === selectedYear && pitcher.team === selectedTeam && pitcher.overall >= 69
              )
            ).map((group, index) => (
              <S.PositionGroup key={index}>
                {group.players.map((player, iindex) => (
                  <TablePlayer key={iindex} player={player} />
                ))}
              </S.PositionGroup>
            ))}
          </S.LineUpWrapper>
        ))}
      </S.TableContainer>

      <S.DescriptionWrapper>
        <S.Description>올스타</S.Description>
        <S.Description>골든 글러브</S.Description>
        <S.Description>MVP</S.Description>
        <S.Description>오버롤 80 이상</S.Description>
      </S.DescriptionWrapper>
    </S.Container>
  );
};

export default TablePosition;
