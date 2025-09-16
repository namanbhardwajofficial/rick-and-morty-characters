import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '@/lib/api';

export const useCharacters = (page: number) => {
  return useQuery({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
}; 