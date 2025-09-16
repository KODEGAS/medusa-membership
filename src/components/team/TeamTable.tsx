"use client";
import { useMemo, useState } from 'react';
import { useTeamQuery } from '@/lib/hooks/useTeamQuery';
import { useTeamFilters } from '@/lib/state/teamFilters';
import { filterTeams } from '@/utils/filterMembers';
import { TeamRow } from './TeamRow';
import { TeamDetailDrawer } from './TeamDetailDrawer';
import { Team } from '@/lib/models/team';

function SkeletonRow() {
    return (
        <tr className="animate-pulse">
            <td className="py-2 px-3">
                <div className="h-4 w-40 bg-muted rounded" />
            </td>
            <td><div className="h-4 w-32 bg-muted rounded" /></td>
            <td><div className="h-4 w-16 bg-muted rounded" /></td>
            <td><div className="h-4 w-20 bg-muted rounded" /></td>
            <td><div className="h-4 w-20 bg-muted rounded" /></td>
        </tr>
    );
}

export function TeamTable() {
    const { data, isLoading, error } = useTeamQuery();
    const filters = useTeamFilters();
    const rows: Team[] = useMemo(() => data ? filterTeams(data, filters) : [], [data, filters]);

    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleTeamClick = (team: Team) => {
        setSelectedTeam(team);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedTeam(null);
    };

    if (isLoading) {
        return (
            <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="text-left py-2 px-3">Team Name</th>
                            <th className="text-left">University</th>
                            <th className="text-left">Members</th>
                            <th className="text-left">Payment</th>
                            <th className="text-left">Registered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}
                    </tbody>
                </table>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-sm text-red-600 border border-red-300 rounded-md bg-red-50">
                Failed to load teams. Try refreshing.
            </div>
        );
    }

    return (
        <>
            <div className="border rounded-md overflow-auto">
                <table className="w-full text-sm">
                    <thead className="bg-muted/50 sticky top-0">
                        <tr>
                            <th className="text-left py-2 px-3">Team Name</th>
                            <th className="text-left">University</th>
                            <th className="text-left">Members</th>
                            <th className="text-left">Payment</th>
                            <th className="text-left">Registered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(t => (
                            <TeamRow
                                key={t._id}
                                team={t}
                                onClick={() => handleTeamClick(t)}
                            />
                        ))}
                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-6 text-center text-muted-foreground">
                                    No matching teams.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <TeamDetailDrawer
                team={selectedTeam}
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
            />
        </>
    );
}
