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
  position: string;
  hand_type: string;
  order_type: string;
  order_numbers: string[];
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
  position: string;
  hand_type: string;
  pitches: string;
  all_star: boolean;
  golden_glove: boolean;
  mvp_league: boolean;
  mvp_korea: boolean;
};

export type PlayerStoreState = {
  isShowDetail: boolean;
  allHitters: Map<number, Hitter[]>;
  allPitchers: Map<number, Pitcher[]>;
  selectedPlayer: Hitter | Pitcher | null;
  selectedLineup: (Hitter | Pitcher)[];
  setSelectedLineup: ({ player, action }: { player?: Hitter | Pitcher; action: 'ADD' | 'DELETE' | 'CLEAR' }) => void;
  setSelectedPlayer: (player: Hitter | Pitcher | null) => void;
  showDetail: () => void;
  clearDetail: () => void;
  fetchAllHitters: () => Promise<void>;
  fetchAllPitchers: () => Promise<void>;
};
