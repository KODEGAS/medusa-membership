"use client";
import { TeamSummaryMetrics } from '@/utils/teamSummary';

interface MonthlyRegistrationLineProps {
    timeline: TeamSummaryMetrics['registrationTimeline'];
}

export function MonthlyRegistrationLine({ timeline }: MonthlyRegistrationLineProps) {
    if (!timeline || timeline.length === 0) {
        return (
            <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Registration Trend</h3>
                <div className="text-center py-8 text-muted-foreground">No registration data available</div>
            </div>
        );
    }

    // Group by month
    const monthlyData = new Map<string, { teams: number; members: number; date: string }>();

    timeline.forEach(entry => {
        const date = new Date(entry.date);
        const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        const monthLabel = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

        const existing = monthlyData.get(monthKey) || { teams: 0, members: 0, date: monthLabel };
        existing.teams += entry.teams;
        existing.members += entry.members;
        monthlyData.set(monthKey, existing);
    });

    const months = Array.from(monthlyData.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([, data]) => data);

    if (months.length === 0) {
        return (
            <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Registration Trend</h3>
                <div className="text-center py-8 text-muted-foreground">No monthly data available</div>
            </div>
        );
    }

    const maxTeams = Math.max(...months.map(m => m.teams));
    const maxMembers = Math.max(...months.map(m => m.members));

    return (
        <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Registration Trend</h3>
            <div className="space-y-6">
                {/* Teams Line */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-600">Teams per Month</span>
                        <span className="text-xs text-muted-foreground">Peak: {maxTeams} teams</span>
                    </div>
                    <div className="relative h-16 flex items-end justify-between gap-1">
                        {months.map((month, monthIndex) => {
                            const height = maxTeams ? (month.teams / maxTeams * 100) : 0;
                            return (
                                <div key={monthIndex} className="flex-1 flex flex-col items-center">
                                    <div
                                        className="w-full bg-blue-500 rounded-sm min-h-[2px] transition-all duration-300"
                                        style={{ height: `${height}%` }}
                                        title={`${month.date}: ${month.teams} teams`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Members Line */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-600">Members per Month</span>
                        <span className="text-xs text-muted-foreground">Peak: {maxMembers} members</span>
                    </div>
                    <div className="relative h-16 flex items-end justify-between gap-1">
                        {months.map((month, memberIndex) => {
                            const height = maxMembers ? (month.members / maxMembers * 100) : 0;
                            return (
                                <div key={memberIndex} className="flex-1 flex flex-col items-center">
                                    <div
                                        className="w-full bg-green-500 rounded-sm min-h-[2px] transition-all duration-300"
                                        style={{ height: `${height}%` }}
                                        title={`${month.date}: ${month.members} members`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Month Labels */}
                <div className="flex justify-between text-xs text-muted-foreground">
                    {months.map((month, labelIndex) => (
                        <span key={labelIndex} className="flex-1 text-center">{month.date}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}