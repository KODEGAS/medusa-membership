"use client";
import { Team, Member } from '@/lib/models/team';
import { X, Mail, Phone, Calendar, DollarSign, Users } from 'lucide-react';
import { useEffect } from 'react';
import { transformPaymentUrl } from '@/utils/transformPaymentUrl';

interface TeamDetailDrawerProps {
    team: Team | null;
    isOpen: boolean;
    onClose: () => void;
}

export function TeamDetailDrawer({ team, isOpen, onClose }: TeamDetailDrawerProps) {
    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !team) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-background border-l shadow-xl overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <h2 className="text-xl font-semibold">{team.teamName}</h2>
                        <p className="text-sm text-muted-foreground">{team.university}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-md p-2 hover:bg-muted transition-colors"
                        aria-label="Close team details"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Team Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoCard
                            icon={<Calendar className="h-4 w-4" />}
                            label="Registered"
                            value={new Date(team.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        />
                        <InfoCard
                            icon={<Users className="h-4 w-4" />}
                            label="Team Size"
                            value={`${team.members.length} member${team.members.length !== 1 ? 's' : ''}`}
                        />
                    </div>

                    {/* Payment Status */}
                    <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <DollarSign className="h-4 w-4" />
                            <h3 className="font-medium">Payment Status</h3>
                        </div>
                        {team.payment?.slip ? (
                            <div className="space-y-2">
                                <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                                    ✓ Payment Confirmed
                                </span>
                                <div>
                                    <a
                                        href={transformPaymentUrl(team.payment.slip)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        View Payment Slip →
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                ⏳ Payment Pending
                            </span>
                        )}
                    </div>

                    {/* Team Members */}
                    <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Users className="h-4 w-4" />
                            <h3 className="font-medium">Team Members</h3>
                        </div>
                        <div className="space-y-3">
                            {team.members.map((member, index) => (
                                <MemberCard key={member._id} member={member} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Technical Details */}
                    <details className="border rounded-lg p-4">
                        <summary className="cursor-pointer font-medium text-sm text-muted-foreground">
                            Technical Details
                        </summary>
                        <div className="mt-3 space-y-2 text-xs text-muted-foreground font-mono">
                            <div>Team ID: {team._id}</div>
                            <div>Version: {team.__v ?? 'N/A'}</div>
                        </div>
                    </details>
                </div>
            </div>
        </div>
    );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="border rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                {icon}
                {label}
            </div>
            <div className="font-medium">{value}</div>
        </div>
    );
}

function MemberCard({ member, index }: { member: Member; index: number }) {
    // Format phone number for WhatsApp (remove spaces, dashes, parentheses)
    const formatPhoneForWhatsApp = (phone: string) => {
        return phone.replace(/[\s\-\(\)]/g, '');
    };

    return (
        <div className="border rounded-lg p-3 hover:bg-muted/30 transition-colors">
            <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/40 to-primary/70 flex items-center justify-center text-sm font-medium text-primary-foreground shrink-0">
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-sm">{member.name}</h4>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">#{index + 1}</span>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <a href={`mailto:${member.email}`} className="hover:text-primary truncate">
                                {member.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <a
                                href={`https://wa.me/${formatPhoneForWhatsApp(member.phone)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary"
                            >
                                {member.phone}
                            </a>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            Joined {new Date(member.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}