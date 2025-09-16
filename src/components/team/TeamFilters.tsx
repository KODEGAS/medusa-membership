"use client";
import { useTeamFilters } from '@/lib/state/teamFilters';
import { ChangeEvent } from 'react';

export function TeamFilters() {
    const { search, setSearch, reset } = useTeamFilters();

    function onSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between py-2">
            <div className="flex items-center gap-2 w-full md:w-72">
                <input
                    value={search}
                    onChange={onSearch}
                    placeholder="Search teams, universities, or members"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-ring"
                />
            </div>
            <div className="flex items-center gap-2 justify-end">
                <button
                    onClick={reset}
                    className="text-xs px-2 py-1 rounded-md border hover:bg-muted transition-colors"
                    type="button"
                >Reset</button>
            </div>
        </div>
    );
}
