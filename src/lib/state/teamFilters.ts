import { create } from 'zustand';

export interface DateRange { from?: Date; to?: Date }

export interface TeamFilterState {
  search: string;
  universities: string[];
  dateRange?: DateRange;
  setSearch: (v: string) => void;
  toggleUniversity: (university: string) => void;
  setDateRange: (range?: DateRange) => void;
  reset: () => void;
}

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter(v => v !== value) : [...list, value];

export const useTeamFilters = create<TeamFilterState>((set) => ({
  search: '',
  universities: [],
  dateRange: undefined,
  setSearch: (search) => set({ search }),
  toggleUniversity: (university) => set(s => ({ universities: toggle(s.universities, university) })),
  setDateRange: (dateRange) => set({ dateRange }),
  reset: () => set({ search: '', universities: [], dateRange: undefined })
}));
