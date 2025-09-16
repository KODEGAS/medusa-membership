export default function HomePage() {
    return (
        <main className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold tracking-tight">Team Portal</h1>
            <p className="text-sm text-muted-foreground max-w-prose">Welcome to the team registration portal. View registered teams and their members in the directory.</p>
            <div className="pt-4">
                <a href="/team" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                    View Teams
                </a>
            </div>
        </main>
    );
}
