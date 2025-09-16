import { Team } from '@/lib/models/team';

export interface TeamSummaryMetrics {
  totalTeams: number;
  totalMembers: number;
  avgMembersPerTeam: number;
  paidTeams: number;
  unpaidTeams: number;
  paidPercentage: number; // 0-100
  universities: Array<{ university: string; teams: number; members: number }>;
  registrationTimeline: Array<{ date: string; teams: number; cumulativeTeams: number; members: number; cumulativeMembers: number }>;
}

function toDay(dateStr: string) {
  const d = new Date(dateStr);
  // normalize to local date (YYYY-MM-DD)
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
    .toISOString()
    .slice(0, 10);
}

export function buildTeamSummary(teams: Team[]): TeamSummaryMetrics {
  const totalTeams = teams.length;
  let totalMembers = 0;
  let paidTeams = 0;
  const universityMap = new Map<string, { teams: number; members: number }>();
  const dayMap = new Map<string, { teams: number; members: number }>();

  for (const t of teams) {
    const membersCount = t.members.length;
    totalMembers += membersCount;
    if (t.payment) paidTeams += 1;

    // university aggregation
    const uni = universityMap.get(t.university) || { teams: 0, members: 0 };
    uni.teams += 1;
    uni.members += membersCount;
    universityMap.set(t.university, uni);

    // timeline
    const day = toDay(t.createdAt);
    const dayEntry = dayMap.get(day) || { teams: 0, members: 0 };
    dayEntry.teams += 1;
    dayEntry.members += membersCount;
    dayMap.set(day, dayEntry);
  }

  const unpaidTeams = totalTeams - paidTeams;
  const avgMembersPerTeam = totalTeams ? totalMembers / totalTeams : 0;
  const paidPercentage = totalTeams ? (paidTeams / totalTeams) * 100 : 0;

  const universities = Array.from(universityMap.entries())
    .map(([university, v]) => ({ university, ...v }))
    .sort((a, b) => b.teams - a.teams);

  const registrationTimeline = (() => {
    const base = Array.from(dayMap.entries())
      .map(([date, v]) => ({ date, ...v }))
      .sort((a, b) => a.date.localeCompare(b.date));
    let cumulativeTeams = 0;
    let cumulativeMembers = 0;
    return base.map(d => {
      cumulativeTeams += d.teams;
      cumulativeMembers += d.members;
      return {
        date: d.date,
        teams: d.teams,
        members: d.members,
        cumulativeTeams,
        cumulativeMembers
      };
    });
  })();

  return {
    totalTeams,
    totalMembers,
    avgMembersPerTeam,
    paidTeams,
    unpaidTeams,
    paidPercentage,
    universities,
    registrationTimeline
  };
}

export type { TeamSummaryMetrics as TeamSummary };
