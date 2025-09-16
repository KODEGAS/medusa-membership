"use client";
import { TeamTable } from '@/components/team/TeamTable';
import { TeamFilters } from '@/components/team/TeamFilters';

export default function TeamPage() {
    return (
        <main className="p-6 space-y-4">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Team Directory</h1>
                <p className="text-sm text-muted-foreground">Browse registered teams and their members. Click any row to view detailed information.</p>
            </div>
            <TeamFilters />
            <TeamTable />
        </main>
    );
}
