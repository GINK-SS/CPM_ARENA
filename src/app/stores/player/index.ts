import { create } from 'zustand';

import { FIRST_YEAR } from '@/app/const';

import { Hitter, Pitcher, PlayerStoreState } from './types';
import { isHitter } from '@/app/util/decideType';

const usePlayerStore = create<PlayerStoreState>((set, get) => ({
  isShowDetail: { isShow: false, target: null },
  allHitters: new Map(),
  allPitchers: new Map(),
  selectedPlayer: null,
  pinnedPlayer: null,
  hitterLineup: [...Array(9)].map(() => ({ position: null, player: null })),
  pitcherLineup: [...Array(10)].map((_, idx) => {
    const position = idx < 5 ? '선발' : idx < 9 ? '계투' : '마무리';

    return { position, player: null };
  }),
  addToLineup: (selectedPlayer, hitterPosition) => {
    if (isHitter(selectedPlayer)) {
      const hitterIdx = get().hitterLineup.findIndex(({ position, player }) => position === null && player === null);

      set((state) => ({
        hitterLineup: [
          ...state.hitterLineup.slice(0, hitterIdx),
          { position: hitterPosition!, player: selectedPlayer },
          ...state.hitterLineup.slice(hitterIdx + 1),
        ],
      }));

      return;
    }

    const pitcherIdx = get().pitcherLineup.findIndex(
      ({ position, player }) =>
        (selectedPlayer.position === '선발' ? position === '선발' : position !== '선발') && !player
    );

    set((state) => ({
      pitcherLineup: [
        ...state.pitcherLineup.slice(0, pitcherIdx),
        { position: state.pitcherLineup[pitcherIdx].position, player: selectedPlayer },
        ...state.pitcherLineup.slice(pitcherIdx + 1),
      ],
    }));
  },
  deleteFromLineup: (selectedPlayer) => {
    if (isHitter(selectedPlayer)) {
      const hitterIdx = get().hitterLineup.findIndex(({ player }) => player === selectedPlayer);

      set((state) => ({
        hitterLineup: [
          ...state.hitterLineup.slice(0, hitterIdx),
          { position: null, player: null },
          ...state.hitterLineup.slice(hitterIdx + 1),
        ],
      }));

      return;
    }

    const pitcherIdx = get().pitcherLineup.findIndex(({ player }) => player === selectedPlayer);

    set((state) => ({
      pitcherLineup: [
        ...state.pitcherLineup.slice(0, pitcherIdx),
        { position: state.pitcherLineup[pitcherIdx].position, player: null },
        ...state.pitcherLineup.slice(pitcherIdx + 1),
      ],
    }));
  },
  changePositionLineup: ({ selectedPlayer, pinnedPlayer }) => {
    set((state) => {
      const newHitterLineup = [...state.hitterLineup];
      const pinnedIdx = newHitterLineup.findIndex((hitter) => hitter.player === pinnedPlayer);
      const selectedIdx = newHitterLineup.findIndex((hitter) => hitter.player === selectedPlayer);

      [newHitterLineup[pinnedIdx].position, newHitterLineup[selectedIdx].position] = [
        newHitterLineup[selectedIdx].position,
        newHitterLineup[pinnedIdx].position,
      ];

      return { hitterLineup: newHitterLineup };
    });
  },
  changeOrderLineup: ({ selectedPlayer, pinnedPlayer }) => {
    set((state) => {
      if (isHitter(pinnedPlayer) && isHitter(selectedPlayer)) {
        const newHitterLineup = [...state.hitterLineup];
        const pinnedIdx = newHitterLineup.findIndex((lineup) => lineup.player === pinnedPlayer);
        const selectedIdx = newHitterLineup.findIndex((lineup) => lineup.player === selectedPlayer);

        if (selectedIdx === -1) {
          newHitterLineup[pinnedIdx].player = selectedPlayer;
        } else {
          [newHitterLineup[pinnedIdx], newHitterLineup[selectedIdx]] = [
            newHitterLineup[selectedIdx],
            newHitterLineup[pinnedIdx],
          ];
        }

        return { hitterLineup: newHitterLineup };
      }

      const newPitcherLineup = [...state.pitcherLineup];
      const pinnedIdx = newPitcherLineup.findIndex((lineup) => lineup.player === pinnedPlayer);
      const selectedIdx = newPitcherLineup.findIndex((lineup) => lineup.player === selectedPlayer);

      if (selectedIdx === -1) {
        newPitcherLineup[pinnedIdx].player = selectedPlayer as Pitcher;
      } else {
        [newPitcherLineup[pinnedIdx], newPitcherLineup[selectedIdx]] = [
          newPitcherLineup[selectedIdx],
          newPitcherLineup[pinnedIdx],
        ];
      }

      return { pitcherLineup: newPitcherLineup };
    });
  },
  clearLineup: () => {
    set(() => ({
      hitterLineup: [...Array(9)].map(() => ({ position: null, player: null })),
      pitcherLineup: [...Array(10)].map((_, idx) => {
        const position = idx < 5 ? '선발' : idx < 9 ? '계투' : '마무리';

        return { position, player: null };
      }),
    }));
  },
  setSelectedPlayer: (player) => {
    set(() => ({ selectedPlayer: player }));
  },
  setPinnedPlayer: (player) => {
    set(() => ({ pinnedPlayer: player }));
  },
  showDetail: (target) => {
    set(() => ({ isShowDetail: { isShow: true, target } }));
  },
  clearDetail: () => {
    set(() => ({ isShowDetail: { isShow: false, target: null } }));
  },
  fetchAllHitters: async () => {
    const hitters: Hitter[] = await fetch('/storage/hitters.json').then((res) => res.json());

    set(() => {
      const allHitters: Map<number, Hitter[]> = new Map(
        new Array(42).fill(FIRST_YEAR).map((year, idx) => [year + idx, []])
      );
      hitters.forEach((hitter) => {
        allHitters.get(hitter.year)?.push(hitter);
      });

      return { allHitters };
    });
  },
  fetchAllPitchers: async () => {
    const pitchers: Pitcher[] = await fetch('/storage/pitchers.json').then((res) => res.json());

    set(() => {
      const allPitchers: Map<number, Pitcher[]> = new Map(
        new Array(42).fill(FIRST_YEAR).map((year, idx) => [year + idx, []])
      );
      pitchers.forEach((pitcher) => {
        allPitchers.get(pitcher.year)?.push(pitcher);
      });

      return { allPitchers };
    });
  },
}));

export default usePlayerStore;
