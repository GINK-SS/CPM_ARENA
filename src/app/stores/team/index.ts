import { create } from 'zustand';
import { TeamStoreState } from './types';

const useTeamStore = create<TeamStoreState>((set) => ({
  allTeams: [],
  selectedTeams: [],
  setTeams: (teams) => {
    set(() => ({ selectedTeams: teams }));
  },
  resetTeams: () => {
    set(() => ({ selectedTeams: [] }));
  },
  fetchAllTeams: async () => {
    set({ allTeams: await fetch('/storage/teams.json').then((res) => res.json()) });
  },
}));

export default useTeamStore;
