import '../styles/globals.css';
import type { ReactNode } from 'react';
import { Providers } from '@/components/team/Providers';
import Link from 'next/link';

export const metadata = {
    title: 'Team Portal',
    description: 'Internal team portal dashboard'
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen antialiased">
                <Providers>
                    <div className="flex flex-col min-h-screen">
                        <nav className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                            <div className="mx-auto max-w-6xl px-4 h-12 flex items-center gap-4 text-sm">
                                <span className="font-semibold tracking-tight">Team Portal</span>
                                <div className="flex items-center gap-3">
                                    <Link href="/team" className="text-muted-foreground hover:text-foreground transition-colors">Directory</Link>
                                    <Link href="/team-summary" className="text-muted-foreground hover:text-foreground transition-colors">Summary</Link>
                                </div>
                            </div>
                        </nav>
                        <div className="flex-1 mx-auto w-full max-w-6xl">{children}</div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
