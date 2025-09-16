import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-green-400 mx-auto" />
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
};