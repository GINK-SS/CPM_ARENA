export type Team = {
  id: TeamId;
  shorten: string;
  name: string;
  logo: string;
  years: number[];
};

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
  [key: string]: any;
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
  [key: string]: any;
};

export type TeamId =
  | 'KIA'
  | 'kt'
  | 'LG'
  | 'MBC'
  | 'NC'
  | 'OB'
  | 'SK'
  | 'SSG'
  | '넥센'
  | '두산'
  | '롯데'
  | '빙그레'
  | '삼미'
  | '삼성'
  | '쌍방울'
  | '키움'
  | '태평양'
  | '한화'
  | '해태'
  | '현대';

export type PointTitle = TeamId | 'all_star' | 'golden_glove' | 'mvp' | 'any_team';

export type PlayerStoreState = {
  isShow: boolean;
  isShowDetail: boolean;
  allTeams: Team[];
  allHitters: Hitter[];
  allPitchers: Pitcher[];
  selectedTeams: TeamId[];
  selectedPlayer: Hitter | Pitcher | null;
  selectedLineUp: {
    players: (Hitter | Pitcher)[];
    count: {
      hitters: number;
      pitchers: number;
      teams: number[];
      all_star: number;
      golden_glove: number;
      mvp: number;
      [key: string]: number | number[];
    };
  };
  setSelectedLineUp: (player: Hitter | Pitcher | null, action?: string) => void;
  showDetail: () => void;
  clearDetail: () => void;
  setSelectedPlayer: (player: Hitter | Pitcher | null) => void;
  setSelectedTeamsReset: () => void;
  setShowTeamList: () => void;
  closeTeamList: () => void;
  setTeams: ({ id, index, action }: SetTeamsPayload) => void;
  fetchAllTeams: () => Promise<void>;
  fetchAllHitters: () => Promise<void>;
  fetchAllPitchers: () => Promise<void>;
};

export type SetTeamsPayload = {
  id: TeamId;
  index: number;
  action: string;
};

export type PositionLimit = {
  [key: string]: number;
};
