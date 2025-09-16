import { useCharacter } from '@/hooks/useCharacter';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

export const CharacterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); 
  
  const from = parseInt(searchParams.get('from') || '1', 10);
  
  const { data: character, isLoading, error } = useCharacter(parseInt(id || '0', 10));

  const handleBack = () => {
    navigate(`/characters?page=${from}`);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !character) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-400 mb-4">Character not found</p>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button 
        onClick={handleBack} 
        variant="outline" 
        className="mb-6 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to List
      </Button>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={character.image}
              alt={character.name}
              className="w-64 h-64 rounded-lg shadow-lg mx-auto md:mx-0"
            />
          </div>
          
          <div className="space-y-4 flex-1">
            <h1 className="text-3xl font-bold text-white">{character.name}</h1>
            
            <div className="flex flex-wrap gap-2">
              <Badge className={`${getStatusColor(character.status)} text-white`}>
                {character.status}
              </Badge>
              <Badge variant="secondary">{character.species}</Badge>
              <Badge variant="secondary">{character.gender}</Badge>
            </div>

            <div className="space-y-3 text-gray-300">
              {character.type && (
                <div>
                  <span className="font-semibold text-white">Type:</span> {character.type}
                </div>
              )}
              
              <div>
                <span className="font-semibold text-white">Origin:</span> {character.origin.name}
              </div>
              
              <div>
                <span className="font-semibold text-white">Last Location:</span> {character.location.name}
              </div>
              
              <div>
                <span className="font-semibold text-white">Episodes:</span> {character.episode.length} episodes
              </div>
              
              <div className="text-sm">
                <span className="font-semibold text-white">Created:</span> {new Date(character.created).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};