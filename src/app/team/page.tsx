"use client";
import { useState, useMemo } from 'react';
import { TeamTable } from '@/components/team/TeamTable';
import { TeamFilters } from '@/components/team/TeamFilters';
import { useTeamQuery } from '@/lib/hooks/useTeamQuery';
import { useTeamFilters } from '@/lib/state/teamFilters';
import { filterTeams } from '@/utils/filterMembers';
import { groupTeamsByDate } from '@/utils/groupTeamsByDate';
import { TeamCard } from '@/components/team/TeamCard';
import { TeamDetailDrawer } from '@/components/team/TeamDetailDrawer';
import { Team } from '@/lib/models/team';

export default function TeamPage() {
    const [mode, setMode] = useState<'table' | 'cards'>('table');
    const [selectedTeams, setSelectedTeams] = useState<Set<string>>(new Set());
    const filters = useTeamFilters();
    const { data, isLoading, error } = useTeamQuery();
    const filtered = useMemo(() => data ? filterTeams(data, filters) : [], [data, filters]);
    const grouped = useMemo(() => mode === 'cards' ? groupTeamsByDate(filtered) : [], [filtered, mode]);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openDrawer = (team: Team) => { setSelectedTeam(team); setDrawerOpen(true); };
    const closeDrawer = () => { setDrawerOpen(false); setSelectedTeam(null); };

    const handleTeamSelect = (team: Team, selected: boolean) => {
        const newSelected = new Set(selectedTeams);
        if (selected) {
            newSelected.add(team._id);
        } else {
            newSelected.delete(team._id);
        }
        setSelectedTeams(newSelected);
    };

    return (
        <main className="p-6 space-y-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Team Directory</h1>
                    <p className="text-sm text-muted-foreground">Browse registered teams and their members. Click any row or card for details.</p>
                </div>
                <div className="flex items-center gap-1 self-start md:self-auto border rounded-md overflow-hidden" role="tablist" aria-label="View mode">
                    <button
                        role="tab"
                        aria-selected={mode === 'table'}
                        className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${mode === 'table' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setMode('table')}
                    >Table</button>
                    <button
                        role="tab"
                        aria-selected={mode === 'cards'}
                        className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${mode === 'cards' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setMode('cards')}
                    >Cards</button>
                </div>
            </div>
            <TeamFilters />

            {mode === 'table' && <TeamTable />}
            {mode === 'cards' && (
                <div className="space-y-10">
                    {isLoading && <div className="text-sm text-muted-foreground">Loading teams...</div>}
                    {error && <div className="text-sm text-red-600">Failed to load teams.</div>}
                    {!isLoading && !error && grouped.map(g => (
                        <section key={g.date} aria-labelledby={`date-${g.date}`} className="space-y-3">
                            <h2 id={`date-${g.date}`} className="text-sm font-semibold tracking-wide text-muted-foreground flex items-center gap-2">
                                <span>{g.display}</span>
                                <span className="text-[10px] font-normal bg-muted rounded px-1.5 py-0.5">{g.teams.length} team{g.teams.length !== 1 ? 's' : ''}</span>
                            </h2>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {g.teams.map(t => (
                                    <TeamCard
                                        key={t._id}
                                        team={t}
                                        onClick={openDrawer}
                                        isSelected={selectedTeams.has(t._id)}
                                        onSelect={handleTeamSelect}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                    {!isLoading && !error && grouped.length === 0 && (
                        <div className="text-sm text-muted-foreground italic">No matching teams.</div>
                    )}
                    <TeamDetailDrawer team={selectedTeam} isOpen={drawerOpen} onClose={closeDrawer} />
                </div>
            )}
        </main>
    );
}
