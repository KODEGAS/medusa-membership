import '../styles/globals.css';
import type { ReactNode } from 'react';
import { Providers } from '@/components/team/Providers';

export const metadata = {
    title: 'Team Portal',
    description: 'Internal team portal dashboard'
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen antialiased">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
