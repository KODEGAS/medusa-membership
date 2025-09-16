import { useQuery } from '@tanstack/react-query';
import { fetchTeam } from '../api/team';

export function useTeamQuery() {
  return useQuery({
    queryKey: ['team'],
    queryFn: fetchTeam,
    staleTime: 5 * 60 * 1000
  });
}
