"use client";
import { TeamSummaryMetrics } from '@/utils/teamSummary';

interface UniversityComparisonProps {
    universities: TeamSummaryMetrics['universities'];
    showTop?: number;
}

export function UniversityComparison({ universities, showTop = 8 }: UniversityComparisonProps) {
    const topUniversities = universities.slice(0, showTop);
    const maxTeams = Math.max(...topUniversities.map(uni => uni.teams));
    const maxMembers = Math.max(...topUniversities.map(uni => uni.members));

    const colors = [
        'bg-blue-500',
        'bg-green-500',
        'bg-purple-500',
        'bg-orange-500',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-yellow-500',
        'bg-red-500'
    ];

    return (
        <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">University Comparison</h3>
            <div className="space-y-4">
                {topUniversities.map((uni, index) => {
                    const teamPercentage = maxTeams ? (uni.teams / maxTeams * 100) : 0;
                    const memberPercentage = maxMembers ? (uni.members / maxMembers * 100) : 0;
                    const color = colors[index % colors.length];

                    return (
                        <div key={uni.university} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${color}`} />
                                    <span className="font-medium text-sm truncate max-w-32">{uni.university}</span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {uni.teams} teams • {uni.members} members
                                </div>
                            </div>

                            {/* Teams Bar */}
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Teams</span>
                                    <span>{uni.teams}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <div
                                        className={`h-full ${color} opacity-80 transition-all duration-500 ease-out`}
                                        style={{ width: `${teamPercentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Members Bar */}
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Members</span>
                                    <span>{uni.members}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <div
                                        className={`h-full ${color} transition-all duration-500 ease-out`}
                                        style={{ width: `${memberPercentage}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {universities.length > showTop && (
                <div className="mt-4 text-xs text-muted-foreground text-center">
                    Showing top {showTop} of {universities.length} universities
                </div>
            )}
        </div>
    );
}