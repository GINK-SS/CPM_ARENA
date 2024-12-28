import { TeamId } from '../team/types';

export type Hitter = {
  name: string;
  team: TeamId;
  overall: number;
  year: number;
  batting_all: number;
  batting_right: number;
  batting_left: number;
  batting_under: number;
  long_all: number;
  long_right: number;
  long_left: number;
  long_under: number;
  eye_all: number;
  eye_right: number;
  eye_left: number;
  eye_under: number;
  running: number;
  defense: number;
  positions: HitterPosition[];
  hand_type: string;
  order_type: string;
  order_numbers: number[];
  all_star: boolean;
  golden_glove: boolean;
  mvp_league: boolean;
  mvp_korea: boolean;
};

export type Pitcher = {
  name: string;
  team: TeamId;
  overall: number;
  year: number;
  pitch_all: number;
  pitch_right: number;
  pitch_left: number;
  control_all: number;
  control_right: number;
  control_left: number;
  stuff_all: number;
  stuff_right: number;
  stuff_left: number;
  mental: number;
  stamina: number;
  position: PitcherPosition;
  hand_type: string;
  pitches: string;
  all_star: boolean;
  golden_glove: boolean;
  mvp_league: boolean;
  mvp_korea: boolean;
};

export type HitterPosition = '포수' | '1루수' | '2루수' | '3루수' | '유격수' | '외야수' | '지명타자';
export type PitcherPosition = '선발' | '계투' | '마무리';

export type PlayerStoreState = {
  isShowDetail: {
    isShow: boolean;
    target: 'pinned' | 'selected' | null;
  };
  selectedPlayer: Hitter | Pitcher | null;
  pinnedPlayer: Hitter | Pitcher | null;
  hitterLineup: { position: HitterPosition | null; player: Hitter | null }[];
  pitcherLineup: { position: PitcherPosition; player: Pitcher | null }[];
  addToLineup: (selectedPlayer: Hitter | Pitcher, hitterPosition?: HitterPosition) => void;
  deleteFromLineup: (selectedPlayer: Hitter | Pitcher) => void;
  changePositionLineup: ({ selectedPlayer, pinnedPlayer }: { selectedPlayer: Hitter; pinnedPlayer: Hitter }) => void;
  changeOrderLineup: ({
    selectedPlayer,
    pinnedPlayer,
  }: {
    selectedPlayer: Hitter | Pitcher;
    pinnedPlayer: Hitter | Pitcher;
  }) => void;
  clearLineup: () => void;
  setSelectedPlayer: (player: Hitter | Pitcher | null) => void;
  setPinnedPlayer: (player: Hitter | Pitcher | null) => void;
  showDetail: (target: 'pinned' | 'selected') => void;
  clearDetail: () => void;
};
