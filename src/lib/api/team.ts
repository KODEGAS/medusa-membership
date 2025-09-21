import { TeamResponseSchema, Team } from '../models/team';
import { apiFetch } from './client';

export async function fetchTeam(): Promise<Team[]> {
  const data = await apiFetch('/team');
  const parsed = TeamResponseSchema.safeParse(data);
  
  if (!parsed.success) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Team response validation failed:', parsed.error.flatten());
    }
    throw new Error('Invalid team response shape');
  }
  
  return parsed.data;
}
