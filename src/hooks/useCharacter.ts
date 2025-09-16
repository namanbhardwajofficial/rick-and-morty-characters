import { useQuery } from '@tanstack/react-query';
import { fetchCharacter } from '@/lib/api';

export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacter(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    enabled: !!id && id > 0,
  });
}; 