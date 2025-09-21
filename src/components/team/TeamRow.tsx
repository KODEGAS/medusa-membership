"use client";
import { Team } from '@/lib/models/team';
import { getTeamSize } from '@/utils/teamSize';

interface TeamRowProps {
    team: Team;
    onClick: () => void;
}

export function TeamRow({ team, onClick }: TeamRowProps) {
    const teamSize = getTeamSize(team);
    
    return (
        <tr
            className="hover:bg-muted/40 transition-colors cursor-pointer"
            onClick={onClick}
        >
            <td className="py-2 px-3">
                <div className="flex flex-col">
                    <span className="font-medium leading-tight">{team.teamName}</span>
                    <span className="text-xs text-muted-foreground">ID: {team._id.slice(-8)}</span>
                </div>
            </td>
            <td className="text-sm">{team.university}</td>
            <td className="text-sm">
                <div className="flex flex-col gap-1">
                    <span className="font-medium">{teamSize} member{teamSize !== 1 ? 's' : ''}</span>
                    {team.members.slice(0, 2).map(m => (
                        <span key={m._id} className="text-xs text-muted-foreground">{m.name}</span>
                    ))}
                    {team.members.length > 2 && (
                        <span className="text-xs text-muted-foreground">+{team.members.length - 2} more</span>
                    )}
                </div>
            </td>
            <td className="text-sm">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${paymentBadgeClasses(team.payment)}`}>
                    {team.payment ? 'Paid' : 'Pending'}
                </span>
            </td>
            <td className="text-sm">
                {new Date(team.createdAt).toLocaleDateString()}
            </td>
        </tr>
    );
}

function paymentBadgeClasses(payment?: { slip: string }) {
    if (payment) {
        return 'bg-green-50 text-green-700 border-green-200';
    }
    return 'bg-amber-50 text-amber-700 border-amber-200';
}
