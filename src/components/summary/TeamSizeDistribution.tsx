"use client";
import { TeamSummaryMetrics } from '@/utils/teamSummary';
import { Member } from '@/lib/models/team';

interface TeamSizeDistributionProps {
    summary: TeamSummaryMetrics;
    teams: Array<{ members: Array<Member> }>;
}

export function TeamSizeDistribution({ summary, teams }: TeamSizeDistributionProps) {
    // Calculate team size distribution
    const sizeCategories = {
        'Small (1-2)': { count: 0, color: 'bg-blue-500' },
        'Medium (3-4)': { count: 0, color: 'bg-green-500' },
        'Large (5+)': { count: 0, color: 'bg-purple-500' }
    };

    teams.forEach(team => {
        const size = team.members.length;
        if (size <= 2) sizeCategories['Small (1-2)'].count++;
        else if (size <= 4) sizeCategories['Medium (3-4)'].count++;
        else sizeCategories['Large (5+)'].count++;
    });

    const maxCount = Math.max(...Object.values(sizeCategories).map(cat => cat.count));

    return (
        <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Team Size Distribution</h3>
            <div className="space-y-4">
                {Object.entries(sizeCategories).map(([category, data]) => {
                    const percentage = summary.totalTeams ? (data.count / summary.totalTeams * 100) : 0;
                    const barWidth = maxCount ? (data.count / maxCount * 100) : 0;

                    return (
                        <div key={category} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">{category}</span>
                                <span className="text-muted-foreground">{data.count} teams ({percentage.toFixed(1)}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                    className={`h-full ${data.color} transition-all duration-500 ease-out`}
                                    style={{ width: `${barWidth}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
                Total: {summary.totalTeams} teams • Avg: {summary.avgMembersPerTeam.toFixed(1)} members/team
            </div>
        </div>
    );
}