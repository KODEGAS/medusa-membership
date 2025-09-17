"use client";
import { Team } from "@/lib/models/team";
import { memo } from "react";
import { Check } from "lucide-react";
import { formatCardDate } from "@/utils/formatDate";

interface TeamCardProps {
    team: Team;
    onClick?: (team: Team) => void;
    isSelected?: boolean;
    onSelect?: (team: Team, selected: boolean) => void;
}

export const TeamCard = memo(function TeamCard({ team, onClick, isSelected = false, onSelect }: TeamCardProps) {
    const members = team.members;
    const visible = members.slice(0, 4);
    const remaining = members.length - visible.length;
    const paid = !!team.payment;

    const handleCardClick = () => {
        if (onClick) {
            onClick(team);
        }
    };

    const handleCheckboxClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click
        if (onSelect) {
            onSelect(team, !isSelected);
        }
    };

    return (
        <div
            className={`group rounded-lg border bg-card p-4 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary relative ${isSelected ? 'ring-2 ring-blue-500 border-blue-500' : ''
                }`}
            tabIndex={0}
            role="button"
            onClick={handleCardClick}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(); } }}
            aria-label={`Team ${team.teamName} with ${members.length} members`}
            aria-expanded={false}
        >
            <div
                className="absolute top-3 right-3 z-10"
                onClick={handleCheckboxClick}
            >
                <div className={`w-5 h-5 border-2 rounded ${isSelected
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    } flex items-center justify-center cursor-pointer`}>
                    {isSelected && <Check size={12} />}
                </div>
            </div>
            <div className="flex items-start justify-between gap-2">
                <div>
                    <h3 className="font-semibold leading-tight text-sm">{team.teamName}</h3>
                    <p className="text-xs text-muted-foreground">{team.university}</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-medium tracking-wide ${paid ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>{paid ? 'PAID' : 'UNPAID'}</span>
            </div>
            <div className="flex flex-wrap gap-1" aria-label="Members">
                {visible.map(m => (
                    <span key={m._id} className="text-[10px] bg-muted rounded px-1.5 py-0.5 font-medium truncate max-w-[120px]" title={`${m.name} • ${m.email}`}>{m.name}</span>
                ))}
                {remaining > 0 && (
                    <span className="text-[10px] text-muted-foreground">+{remaining} more</span>
                )}
                <span className="sr-only">Full members: {members.map(m => m.name).join(', ')}</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
                <span>{members.length} member{members.length !== 1 ? 's' : ''}</span>
                <time dateTime={team.createdAt}>
                    {formatCardDate(team.createdAt)}
                </time>
            </div>
        </div>
    );
});
