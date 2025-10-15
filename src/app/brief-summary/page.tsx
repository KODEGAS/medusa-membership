"use client";
import { useTeamQuery } from '@/lib/hooks/useTeamQuery';
import { buildTeamSummary } from '@/utils/teamSummary';
import { MetricCard } from '@/components/summary/MetricCard';
import { TeamSizeDistribution } from '@/components/summary/TeamSizeDistribution';
import Link from 'next/link';

function Skeleton() {
    return (
        <div className="animate-pulse grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-20 rounded-lg bg-muted" />
            ))}
        </div>
    );
}

export default function BriefSummaryPage() {
    const { data, isLoading, error } = useTeamQuery();

    return (
        <main className="p-6 space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Brief Summary</h1>
                    <p className="text-sm text-muted-foreground">Essential metrics at a glance</p>
                </div>
                <Link
                    href="/team-summary"
                    className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md transition-colors"
                >
                    View Details →
                </Link>
            </header>

            {isLoading && <Skeleton />}
            {error && <div className="text-sm text-red-600 border border-red-300 bg-red-50 p-4 rounded">Failed to load summary.</div>}
            {data && !isLoading && !error && (() => {
                const summary = buildTeamSummary(data);
                const topUniversity = summary.universities[0];

                return (
                    <div className="space-y-6">
                        <section>
                            <div className="grid gap-4 md:grid-cols-3">
                                <MetricCard
                                    label="Total Overview"
                                    value={`${summary.totalTeams} Teams`}
                                    accent="bg-blue-500"
                                    subValue={`${summary.totalMembers} total members`}
                                />
                                <MetricCard
                                    label="Payment Status"
                                    value={`${summary.paidPercentage.toFixed(0)}% Paid`}
                                    accent="bg-emerald-500"
                                    subValue={`${summary.paidTeams} of ${summary.totalTeams} teams • Rs. ${(summary.paidTeams * 3000).toLocaleString()} revenue`}
                                />
                                <MetricCard
                                    label="Top University"
                                    value={topUniversity?.university || 'N/A'}
                                    accent="bg-indigo-500"
                                    subValue={topUniversity ? `${topUniversity.teams} teams, ${topUniversity.members} members` : 'No data'}
                                />
                            </div>
                        </section>

                        <section className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-medium mb-3">Quick Stats</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{summary.avgMembersPerTeam.toFixed(1)}</div>
                                    <div className="text-gray-600">Avg Team Size</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{summary.universities.length}</div>
                                    <div className="text-gray-600">Universities</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">{summary.unpaidTeams}</div>
                                    <div className="text-gray-600">Unpaid Teams</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">
                                        {summary.registrationTimeline.length > 0
                                            ? new Date(summary.registrationTimeline[summary.registrationTimeline.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                            : 'N/A'
                                        }
                                    </div>
                                    <div className="text-gray-600">Latest Registration</div>
                                </div>
                            </div>
                        </section>

                        {summary.universities.length > 1 && (
                            <section className="bg-blue-50 rounded-lg p-4">
                                <h3 className="text-lg font-medium mb-2">Top 3 Universities</h3>
                                <div className="space-y-2">
                                    {summary.universities.slice(0, 3).map((uni, index) => (
                                        <div key={uni.university} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                                                    }`}>
                                                    {index + 1}
                                                </div>
                                                <span className="font-medium">{uni.university}</span>
                                            </div>
                                            <span className="text-gray-600">{uni.teams} teams ({uni.members} members)</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <section>
                            <TeamSizeDistribution summary={summary} teams={data} />
                        </section>
                    </div>
                );
            })()}
        </main>
    );
}