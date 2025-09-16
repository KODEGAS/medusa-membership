"use client";
import { TeamSummary } from '@/utils/teamSummary';

interface TimelineAreaProps { timeline: TeamSummary['registrationTimeline']; }

export function TimelineArea({ timeline }: TimelineAreaProps) {
    const maxCumulative = Math.max(1, ...timeline.map(t => t.cumulativeTeams));
    return (
        <div className="rounded-lg border p-4 bg-card" role="group" aria-roledescription="area chart">
            <h3 className="text-sm font-medium mb-3 tracking-tight">Registrations Over Time</h3>
            <div className="h-40 relative" role="img" aria-label="Area chart of cumulative team registrations over time">
                {timeline.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">No data</div>
                )}
                <svg className="w-full h-full" viewBox={`0 0 ${timeline.length || 1} 100`} preserveAspectRatio="none">
                    {timeline.length > 1 && (
                        <>
                            <polyline
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth={1}
                                points={timeline.map((t, i) => `${i},${100 - (t.cumulativeTeams / maxCumulative) * 100}`).join(' ')}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />
                            <polygon
                                fill="hsl(var(--primary)/0.15)"
                                points={`0,100 ${timeline.map((t, i) => `${i},${100 - (t.cumulativeTeams / maxCumulative) * 100}`).join(' ')} ${timeline.length - 1},100`}
                            />
                        </>
                    )}
                </svg>
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                {timeline.slice(0, 6).map(t => (
                    <span key={t.date}>{t.date.slice(5)}</span>
                ))}
                {timeline.length > 6 && <span>...</span>}
            </div>
        </div>
    );
}
