"use client";
import { useTeamQuery } from '@/lib/hooks/useTeamQuery';
import { buildTeamSummary } from '@/utils/teamSummary';
import { MetricCard } from '@/components/summary/MetricCard';
import { PaymentDonut } from '@/components/summary/PaymentDonut';
import { UniversityDistribution } from '@/components/summary/UniversityDistribution';
import { TimelineArea } from '@/components/summary/TimelineArea';
import { TeamSizeDistribution } from '@/components/summary/TeamSizeDistribution';
import { MonthlyRegistrationLine } from '@/components/summary/MonthlyRegistrationLine';
import { UniversityComparison } from '@/components/summary/UniversityComparison';
import { MemberDistributionPie } from '@/components/summary/MemberDistributionPie';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Link from 'next/link';

function Skeleton() {
    return (
        <div className="animate-pulse space-y-6">
            {/* Metric cards */}
            <div className="grid gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-24 rounded-lg bg-muted" />
                ))}
            </div>
            {/* Main charts */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <div className="h-72 rounded-lg bg-muted" />
                    <div className="h-64 rounded-lg bg-muted" />
                    <div className="h-64 rounded-lg bg-muted" />
                </div>
                <div className="space-y-6">
                    <div className="h-72 rounded-lg bg-muted" />
                    <div className="h-64 rounded-lg bg-muted" />
                </div>
            </div>
            {/* Additional charts */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="h-80 rounded-lg bg-muted" />
                <div className="h-80 rounded-lg bg-muted" />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <div className="h-96 rounded-lg bg-muted" />
                <div className="h-96 rounded-lg bg-muted" />
            </div>
        </div>
    );
}

export default function TeamSummaryPage() {
    const { data, isLoading, error } = useTeamQuery();
    return (
        <main className="p-6 space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Team Summary & Insights</h1>
                    <p className="text-sm text-muted-foreground">Aggregated metrics, distributions and trends for registered teams.</p>
                </div>
                <Link
                    href="/brief-summary"
                    className="text-sm bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md transition-colors"
                >
                    ← Brief View
                </Link>
            </header>
            {isLoading && <Skeleton />}
            {error && <div className="text-sm text-red-600 border border-red-300 bg-red-50 p-4 rounded">Failed to load summary.</div>}
            {data && !isLoading && !error && (() => {
                const summary = buildTeamSummary(data);
                return (
                    <div className="space-y-6">
                        <section>
                            <div className="grid gap-4 md:grid-cols-4">
                                <MetricCard label="Total Teams" value={summary.totalTeams} accent="bg-blue-500" subValue={`${summary.totalMembers} members total`} />
                                <MetricCard label="Avg Members / Team" value={summary.avgMembersPerTeam.toFixed(1)} accent="bg-emerald-500" subValue={`Across ${summary.totalTeams} teams`} />
                                <MetricCard label="Paid Teams" value={`${summary.paidTeams}`} accent="bg-indigo-500" subValue={`${summary.paidPercentage.toFixed(1)}% paid • Rs. ${(summary.paidTeams * 3000).toLocaleString()} revenue`} />
                                <MetricCard label="Unpaid Teams" value={`${summary.unpaidTeams}`} accent="bg-red-500" subValue={`${(100 - summary.paidPercentage).toFixed(1)}% remaining • Rs. ${(summary.unpaidTeams * 3000).toLocaleString()} pending`} />
                            </div>
                        </section>
                        <section className="grid gap-6 md:grid-cols-3">
                            <div className="md:col-span-2 space-y-6">
                                <TimelineArea timeline={summary.registrationTimeline} />
                                <MonthlyRegistrationLine timeline={summary.registrationTimeline} />
                                <UniversityDistribution summary={summary} />
                            </div>
                            <div className="space-y-6">
                                <PaymentDonut paid={summary.paidTeams} unpaid={summary.unpaidTeams} />
                                <TeamSizeDistribution summary={summary} teams={data} />
                            </div>
                        </section>

                        <section className="grid gap-6 md:grid-cols-2">
                            <ErrorBoundary>
                                <UniversityComparison universities={summary.universities} />
                            </ErrorBoundary>
                        </section>

                        <section className="grid gap-6 md:grid-cols-2">
                            <ErrorBoundary>
                                <MemberDistributionPie teams={data} totalMembers={summary.totalMembers} />
                            </ErrorBoundary>
                            <div className="bg-white rounded-lg border p-6">
                                <h3 className="text-lg font-semibold mb-4">Additional Insights</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <div className="font-medium text-blue-900 mb-2">Registration Velocity</div>
                                        <div className="text-sm text-blue-700">
                                            Recent activity: {summary.registrationTimeline.slice(-7).reduce((acc, day) => acc + day.teams, 0)} teams registered in the last 7 days
                                        </div>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <div className="font-medium text-green-900 mb-2">University Diversity</div>
                                        <div className="text-sm text-green-700">
                                            {summary.universities.length} different universities represented with an average of {(summary.totalTeams / summary.universities.length).toFixed(1)} teams per university
                                        </div>
                                    </div>
                                    <div className="p-4 bg-purple-50 rounded-lg">
                                        <div className="font-medium text-purple-900 mb-2">Team Composition</div>
                                        <div className="text-sm text-purple-700">
                                            Most common team size: {(() => {
                                                const sizes = data.map(t => t.members.length);
                                                const counts = sizes.reduce((acc, size) => ({ ...acc, [size]: (acc[size] || 0) + 1 }), {} as Record<number, number>);
                                                const mostCommon = Object.entries(counts).sort(([, a], [, b]) => b - a)[0];
                                                return mostCommon ? `${mostCommon[0]} members (${mostCommon[1]} teams)` : 'N/A';
                                            })()}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-yellow-50 rounded-lg">
                                        <div className="font-medium text-yellow-900 mb-2">Financial Summary</div>
                                        <div className="text-sm text-yellow-700 space-y-1">
                                            <div>Registration Fee: <span className="font-semibold">Rs. 3,000 per team</span></div>
                                            <div>Total Revenue: <span className="font-semibold">Rs. {(summary.paidTeams * 3000).toLocaleString()}</span></div>
                                            <div>Pending Revenue: <span className="font-semibold">Rs. {(summary.unpaidTeams * 3000).toLocaleString()}</span></div>
                                            <div>Potential Total: <span className="font-semibold">Rs. {(summary.totalTeams * 3000).toLocaleString()}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                );
            })()}
        </main>
    );
}
