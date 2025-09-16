"use client";

interface PaymentDonutProps {
    paid: number;
    unpaid: number;
}

export function PaymentDonut({ paid, unpaid }: PaymentDonutProps) {
    const total = paid + unpaid;
    const paidPct = total ? (paid / total) * 100 : 0;
    const unpaidPct = 100 - paidPct;
    // We'll emulate a donut with two overlapping conic gradients for wide browser support.
    return (
        <div className="rounded-lg border p-4 bg-card" role="group" aria-roledescription="donut chart">
            <h3 className="text-sm font-medium mb-3 tracking-tight">Payment Status</h3>
            <div className="flex items-center gap-4">
                <div
                    className="relative w-28 h-28"
                    role="img"
                    aria-label={`Payment status donut: ${paid} paid (${paidPct.toFixed(1)}%), ${unpaid} unpaid (${unpaidPct.toFixed(1)}%)`}
                >
                    <div
                        className="w-full h-full rounded-full"
                        style={{
                            background: `conic-gradient(#10b981 0deg ${paidPct * 3.6}deg, #ef4444 ${paidPct * 3.6}deg 360deg)`
                        }}
                    />
                    <div className="absolute inset-3 bg-card rounded-full flex items-center justify-center text-xs font-medium">
                        {paidPct.toFixed(0)}%
                    </div>
                </div>
                <ul className="text-xs space-y-1">
                    <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Paid: <span className="font-medium tabular-nums">{paid}</span></li>
                    <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500" /> Unpaid: <span className="font-medium tabular-nums">{unpaid}</span></li>
                    <li>Total: <span className="font-medium tabular-nums">{total}</span></li>
                </ul>
            </div>
        </div>
    );
}
