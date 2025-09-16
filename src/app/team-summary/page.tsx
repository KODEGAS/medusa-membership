"use client";
import { useTeamQuery } from '@/lib/hooks/useTeamQuery';
import { buildTeamSummary } from '@/utils/teamSummary';
import { MetricCard } from '@/components/summary/MetricCard';
import { PaymentDonut } from '@/components/summary/PaymentDonut';
import { UniversityDistribution } from '@/components/summary/UniversityDistribution';
import { TimelineArea } from '@/components/summary/TimelineArea';

function Skeleton() {
    return (
        <div className="animate-pulse grid gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 rounded-lg bg-muted" />
            ))}
            <div className="md:col-span-2 h-72 rounded-lg bg-muted" />
            <div className="md:col-span-1 h-72 rounded-lg bg-muted" />
            <div className="md:col-span-1 h-72 rounded-lg bg-muted" />
        </div>
    );
}

export default function TeamSummaryPage() {
    const { data, isLoading, error } = useTeamQuery();
    return (
        <main className="p-6 space-y-6">
            <header>
                <h1 className="text-2xl font-semibold tracking-tight">Team Summary & Insights</h1>
                <p className="text-sm text-muted-foreground">Aggregated metrics, distributions and trends for registered teams.</p>
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
                                <MetricCard label="Paid Teams" value={`${summary.paidTeams}`} accent="bg-indigo-500" subValue={`${summary.paidPercentage.toFixed(1)}% paid`} />
                                <MetricCard label="Unpaid Teams" value={`${summary.unpaidTeams}`} accent="bg-red-500" subValue={`${(100 - summary.paidPercentage).toFixed(1)}% remaining`} />
                            </div>
                        </section>
                        <section className="grid gap-6 md:grid-cols-3">
                            <div className="md:col-span-2 space-y-6">
                                <TimelineArea timeline={summary.registrationTimeline} />
                                <UniversityDistribution summary={summary} />
                            </div>
                            <div className="space-y-6">
                                <PaymentDonut paid={summary.paidTeams} unpaid={summary.unpaidTeams} />
                            </div>
                        </section>
                    </div>
                );
            })()}
        </main>
    );
}
