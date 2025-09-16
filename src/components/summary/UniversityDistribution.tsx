"use client";
import { HorizontalBarChart } from './HorizontalBarChart';
import { TeamSummary } from '@/utils/teamSummary';

interface Props { summary: TeamSummary }

export function UniversityDistribution({ summary }: Props) {
    const items = summary.universities.map(u => ({ label: u.university, value: u.teams, secondary: u.members }));
    return (
        <HorizontalBarChart
            items={items}
            title="University Distribution"
            valueLabel={(i) => `${i.value} teams / ${i.secondary} members`}
            colorClass="bg-indigo-500"
            secondaryColorClass="bg-indigo-300"
            aria-label="Horizontal bar chart showing number of teams and members per university"
        />
    );
}
