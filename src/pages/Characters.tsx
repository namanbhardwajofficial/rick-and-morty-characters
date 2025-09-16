import { useCharacters } from '@/hooks/useCharacters';
import { CharacterTable } from '@/components/CharacterTable';
import { Pagination } from '@/components/Pagination';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const CharactersPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
   
  const page = parseInt(searchParams.get('page') || '1', 10);
  
  const { data, isLoading, error, isRefetching } = useCharacters(page);

  const handlePageChange = (newPage: number) => {
    navigate(`/characters?page=${newPage}`);
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['characters', page] });
  };

  const handleCharacterClick = (id: number) => {
    navigate(`/character/${id}?from=${page}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-400 mb-4">Failed to load characters</p>
          <Button onClick={handleRefresh} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Characters</h1>
        <Button
          onClick={handleRefresh}
          disabled={isRefetching}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {data && (
        <>
          <div className="text-sm text-gray-300 text-center">
            Page {page} of {data.info.pages}
          </div>
          
          <CharacterTable
            characters={data.results}
            onCharacterClick={handleCharacterClick}
          />
          
          <Pagination
            currentPage={page}
            totalPages={data.info.pages}
            onPageChange={handlePageChange}
            hasNext={!!data.info.next}
            hasPrev={!!data.info.prev}
          />
        </>
      )}
    </div>
  );
};