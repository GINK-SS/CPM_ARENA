import { create } from 'zustand';
import { TeamStoreState } from './types';

const useTeamStore = create<TeamStoreState>((set) => ({
  isPopupActive: false,
  allTeams: [],
  selectedTeams: [],
  openPopup: () => {
    set(() => ({ isPopupActive: true }));
  },
  closePopup: () => {
    set(() => ({ isPopupActive: false }));
  },
  setTeams: ({ team, index, action }) => {
    if (action === 'ADD' && index < 5) {
      set((state) => ({
        selectedTeams: [...state.selectedTeams, team],
      }));

      if (index === 4) {
        set(() => ({ isPopupActive: false }));
      }
    } else if (action === 'DELETE') {
      set((state) => ({ selectedTeams: state.selectedTeams.filter((selectedTeam) => selectedTeam.id !== team.id) }));
    }
  },
  resetTeams: () => {
    set(() => ({ selectedTeams: [] }));
  },
  fetchAllTeams: async () => {
    set({ allTeams: await fetch('/storage/teams.json').then((res) => res.json()) });
  },
}));

export default useTeamStore;
