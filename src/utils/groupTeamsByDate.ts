import { Team } from '@/lib/models/team';
import { formatGroupDate } from './formatDate';

export interface GroupedTeams {
  date: string; // YYYY-MM-DD
  teams: Team[];
  display: string; // formatted date e.g. Aug 12, 2025
}

function toDay(dateStr: string) {
  const d = new Date(dateStr);
  // Use UTC methods to avoid timezone issues
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
      display: formatGroupDate(date)
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
