import { Team } from '@/lib/models/team';

/**
 * Calculates the total team size including the leader if leader information is provided
 * and the leader is not already listed in the members array
 */
export function getTeamSize(team: Team): number {
  const memberCount = team.members.length;
  
  // If no leader information is provided, just return member count
  if (!team.leaderName && !team.leaderEmail && !team.leaderPhone) {
    return memberCount;
  }
  
  // Check if the leader is already included in the members array
  // We'll check by email if leaderEmail is provided, otherwise assume leader is separate
  if (team.leaderEmail) {
    const leaderAlreadyInMembers = team.members.some(
      member => member.email.toLowerCase() === team.leaderEmail?.toLowerCase()
    );
    
    if (leaderAlreadyInMembers) {
      return memberCount; // Leader is already counted in members
    } else {
      return memberCount + 1; // Add leader to the count
    }
  }
  
  // If we have leader info but no email, assume leader is separate
  if (team.leaderName || team.leaderPhone) {
    return memberCount + 1;
  }
  
  return memberCount;
}

/**
 * Gets a description of the team size including leader status
 */
export function getTeamSizeDescription(team: Team): string {
  const totalSize = getTeamSize(team);
  const memberCount = team.members.length;
  const hasLeaderInfo = !!(team.leaderName || team.leaderEmail || team.leaderPhone);
  
  if (!hasLeaderInfo) {
    return `${totalSize} member${totalSize !== 1 ? 's' : ''}`;
  }
  
  if (totalSize > memberCount) {
    // Leader is separate from members
    return `${totalSize} member${totalSize !== 1 ? 's' : ''} (${memberCount} + 1 leader)`;
  } else {
    // Leader is included in members
    return `${totalSize} member${totalSize !== 1 ? 's' : ''} (includes leader)`;
  }
}