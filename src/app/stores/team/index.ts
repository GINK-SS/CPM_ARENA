import { create } from 'zustand';
import { TeamStoreState } from './types';

const useTeamStore = create<TeamStoreState>((set) => ({
  selectedTeams: [],
  setTeams: (teams) => {
    set(() => ({ selectedTeams: teams }));
  },
  resetTeams: () => {
    set(() => ({ selectedTeams: [] }));
  },
}));

export default useTeamStore;
