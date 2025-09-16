"use client";

interface Item { label: string; value: number; secondary?: number }
interface HorizontalBarChartProps {
    items: Item[];
    maxValue?: number;
    title?: string;
    valueLabel?: (v: Item) => string;
    colorClass?: string; // e.g. bg-emerald-500
    secondaryColorClass?: string; // stacked portion
    className?: string;
    compact?: boolean;
    'aria-label'?: string;
}

export function HorizontalBarChart({
    items,
    maxValue,
    title,
    valueLabel = (v) => v.value.toString(),
    colorClass = 'bg-blue-500',
    secondaryColorClass = 'bg-blue-300',
    className = '',
    compact = false,
    ...rest
}: HorizontalBarChartProps) {
    const max = maxValue ?? Math.max(1, ...items.map(i => i.value + (i.secondary ?? 0)));
    return (
        <div className={`rounded-lg border p-4 bg-card ${className}`} role="group" aria-roledescription="bar chart" {...rest}>
            {title && <h3 className="text-sm font-medium mb-3 tracking-tight">{title}</h3>}
            <ul className="space-y-2">
                {items.map(i => {
                    const primaryPct = (i.value / max) * 100;
                    const secondaryPct = i.secondary ? (i.secondary / max) * 100 : 0;
                    return (
                        <li key={i.label} className="group">
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span className="font-medium truncate max-w-[55%]" title={i.label}>{i.label}</span>
                                <span className="tabular-nums text-muted-foreground">{valueLabel(i)}</span>
                            </div>
                            <div className={`relative h-3 rounded bg-muted overflow-hidden ${compact ? 'h-2' : ''}`} aria-hidden>
                                <div className={`absolute inset-y-0 left-0 ${colorClass} transition-all`} style={{ width: `${primaryPct}%` }} />
                                {i.secondary && (
                                    <div className={`absolute inset-y-0 left-0 ${secondaryColorClass} opacity-60`} style={{ width: `${primaryPct + secondaryPct}%` }} />
                                )}
                            </div>
                        </li>
                    );
                })}
                {items.length === 0 && <li className="text-xs text-muted-foreground italic">No data</li>}
            </ul>
        </div>
    );
}
