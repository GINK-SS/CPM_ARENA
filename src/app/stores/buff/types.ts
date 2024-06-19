import { Hitter, Pitcher } from '../player/types';

export type BuffStoreState = {
  currentBuff: {
    teams: number[];
    all_star: number;
    golden_glove: number;
    mvp: number;
  };
  setBuff: ({
    player,
    teamIdx,
    action,
  }: {
    player: Hitter | Pitcher;
    teamIdx: number;
    action: 'ADD' | 'DELETE';
  }) => void;
  clearBuff: () => void;
};

export type Buff = 'team' | Record;

export type Record = 'all_star' | 'golden_glove' | 'mvp';
