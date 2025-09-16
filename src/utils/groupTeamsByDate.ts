import { Team } from '@/lib/models/team';

export interface GroupedTeams {
  date: string; // YYYY-MM-DD
  teams: Team[];
  display: string; // formatted date e.g. Aug 12, 2025
}

function toDay(dateStr: string) {
  const d = new Date(dateStr);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString().slice(0, 10);
}

export function groupTeamsByDate(teams: Team[]): GroupedTeams[] {
  const map = new Map<string, Team[]>();
  for (const t of teams) {
    const day = toDay(t.createdAt);
    const arr = map.get(day) || [];
    arr.push(t);
    map.set(day, arr);
  }
  return Array.from(map.entries())
    .map(([date, list]) => ({
      date,
      teams: list.sort((a, b) => a.teamName.localeCompare(b.teamName)),
      display: new Date(date + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
