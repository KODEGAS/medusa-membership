"use client";
import { ReactNode } from 'react';

interface MetricCardProps {
    label: string;
    value: ReactNode;
    subValue?: ReactNode;
    accent?: string; // tailwind color class e.g. 'bg-emerald-500'
}

export function MetricCard({ label, value, subValue, accent = 'bg-blue-500' }: MetricCardProps) {
    return (
        <div className="relative overflow-hidden rounded-lg border bg-card p-4 shadow-sm">
            <div className="absolute inset-x-0 top-0 h-1 opacity-70" aria-hidden>
                <div className={`h-full ${accent}`} />
            </div>
            <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase mt-1">{label}</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
            {subValue && <div className="mt-1 text-xs text-muted-foreground">{subValue}</div>}
        </div>
    );
}
