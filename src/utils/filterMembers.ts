import { Team } from '@/lib/models/team';
import { TeamFilterState } from '@/lib/state/teamFilters';

export function filterTeams(teams: Team[], f: TeamFilterState): Team[] {
  const term = f.search.trim().toLowerCase();
  return teams.filter(t => {
    if (term) {
      const searchableText = `${t.teamName} ${t.university} ${t.members.map(m => `${m.name} ${m.email}`).join(' ')}`.toLowerCase();
      if (!searchableText.includes(term)) return false;
    }
    if (f.universities.length && !f.universities.includes(t.university)) return false;
    if (f.dateRange && (f.dateRange.from || f.dateRange.to)) {
      const created = new Date(t.createdAt);
      if (f.dateRange.from && created < f.dateRange.from) return false;
      if (f.dateRange.to && created > f.dateRange.to) return false;
    }
    return true;
  });
}
