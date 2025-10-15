"use client";
import { Member } from '@/lib/models/team';

interface MemberDistributionPieProps {
    teams: Array<{ members: Array<Member> }>;
    totalMembers: number;
}

export function MemberDistributionPie({ teams, totalMembers }: MemberDistributionPieProps) {
    // Calculate member distribution by team size
    const sizeCategories = {
        'Small Teams (1-2)': { members: 0, teams: 0, color: '#3B82F6' },
        'Medium Teams (3-4)': { members: 0, teams: 0, color: '#10B981' },
        'Large Teams (5+)': { members: 0, teams: 0, color: '#8B5CF6' }
    };

    teams.forEach(team => {
        const size = team.members.length;
        if (size <= 2) {
            sizeCategories['Small Teams (1-2)'].members += size;
            sizeCategories['Small Teams (1-2)'].teams++;
        } else if (size <= 4) {
            sizeCategories['Medium Teams (3-4)'].members += size;
            sizeCategories['Medium Teams (3-4)'].teams++;
        } else {
            sizeCategories['Large Teams (5+)'].members += size;
            sizeCategories['Large Teams (5+)'].teams++;
        }
    });

    const categories = Object.entries(sizeCategories)
        .map(([name, data]) => ({
            name,
            members: data.members,
            teams: data.teams,
            percentage: totalMembers ? (data.members / totalMembers * 100) : 0,
            color: data.color
        }))
        .filter(cat => cat.members > 0);

    // Calculate angles for pie slices
    let currentAngle = 0;
    const slices = categories.map(category => {
        const angle = (category.percentage / 100) * 360;
        const slice = {
            ...category,
            startAngle: currentAngle,
            endAngle: currentAngle + angle,
            angle
        };
        currentAngle += angle;
        return slice;
    });

    const radius = 80;
    const centerX = 100;
    const centerY = 100;

    const createPath = (startAngle: number, endAngle: number) => {
        const start = {
            x: centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180),
            y: centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180)
        };
        const end = {
            x: centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180),
            y: centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180)
        };

        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
    };

    return (
        <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Member Distribution by Team Size</h3>

            <div className="flex items-center justify-center mb-6">
                <div className="relative">
                    <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
                        {slices.map((slice, index) => (
                            <path
                                key={index}
                                d={createPath(slice.startAngle, slice.endAngle)}
                                fill={slice.color}
                                stroke="white"
                                strokeWidth="2"
                                className="transition-all duration-300 hover:opacity-80"
                            />
                        ))}

                        {/* Center circle */}
                        <circle
                            cx={centerX}
                            cy={centerY}
                            r="30"
                            fill="white"
                            stroke="#E5E7EB"
                            strokeWidth="2"
                        />
                    </svg>

                    {/* Center text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-lg font-bold">{totalMembers}</div>
                            <div className="text-xs text-muted-foreground">Members</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
                {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: category.color }}
                            />
                            <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-semibold">{category.members} members</div>
                            <div className="text-xs text-muted-foreground">
                                {category.percentage.toFixed(1)}% • {category.teams} teams
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="mt-6 pt-4 border-t">
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                        <div className="font-semibold text-blue-600">
                            {sizeCategories['Small Teams (1-2)'].members}
                        </div>
                        <div className="text-muted-foreground">Small Team Members</div>
                    </div>
                    <div>
                        <div className="font-semibold text-green-600">
                            {sizeCategories['Medium Teams (3-4)'].members}
                        </div>
                        <div className="text-muted-foreground">Medium Team Members</div>
                    </div>
                    <div>
                        <div className="font-semibold text-purple-600">
                            {sizeCategories['Large Teams (5+)'].members}
                        </div>
                        <div className="text-muted-foreground">Large Team Members</div>
                    </div>
                </div>
            </div>
        </div>
    );
}