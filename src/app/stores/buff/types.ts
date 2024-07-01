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
  changeBuff: ({
    pinnedPlayer,
    selectedPlayer,
    pinTeamIdx,
    selectTeamIdx,
  }: {
    pinnedPlayer: Hitter | Pitcher;
    selectedPlayer: Hitter | Pitcher;
    pinTeamIdx: number;
    selectTeamIdx: number;
  }) => void;
  clearBuff: () => void;
};

export type Buff = 'team' | Records;

export type Records = 'all_star' | 'golden_glove' | 'mvp';
