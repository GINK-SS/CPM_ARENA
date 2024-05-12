import { create } from 'zustand';
import { PlayerStoreState } from './types';

const usePlayerStore = create<PlayerStoreState>((set) => ({
  isShow: false,
  allTeams: [],
  allHitters: [],
  allPitchers: [],
  selectedTeams: [],
  selectedPlayer: null,
  selectedPlayerComponentId: undefined,
  setSelectedPlayerComponentId: (id) => {
    set(() => ({ selectedPlayerComponentId: id }));
  },
  setSelectedPlayer: (player) => {
    set(() => ({ selectedPlayer: player }));
  },
  closeTeamList: () => {
    set(() => ({ isShow: false }));
  },
  setShowTeamList: () => {
    set((state) => ({ isShow: !state.isShow }));
  },
  setTeams: ({ id, index, action }) => {
    if (action === 'ADD' && index < 5) {
      set((state) => ({
        selectedTeams: [...state.selectedTeams, id],
      }));

      if (index === 4) {
        set(() => ({ isShow: false }));
      }
    } else if (action === 'DELETE') {
      set((state) => ({ selectedTeams: state.selectedTeams.filter((team) => team !== id) }));
    }
  },
  setSelectedTeamsReset: () => {
    set(() => ({ selectedTeams: [] }));
  },
  fetchAllTeams: async () => {
    set({ allTeams: await fetch('/storage/teams.json').then((res) => res.json()) });
  },
  fetchAllHitters: async () => {
    set({ allHitters: await fetch('/storage/hitters.json').then((res) => res.json()) });
  },
  fetchAllPitchers: async () => {
    set({ allPitchers: await fetch('/storage/pitchers.json').then((res) => res.json()) });
  },
}));

export default usePlayerStore;
