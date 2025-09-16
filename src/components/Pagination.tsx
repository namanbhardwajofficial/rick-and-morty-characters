import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
} 

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrev,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        variant="outline"
        size="sm"
        className="gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      
      <div className="flex items-center space-x-1">
        {/* Show first page */}
        {currentPage > 3 && (
          <>
            <Button
              onClick={() => onPageChange(1)}
              variant={currentPage === 1 ? "default" : "ghost"}
              size="sm"
            >
              1
            </Button>
            {currentPage > 4 && <span className="text-gray-400">...</span>}
          </>
        )}
        
        {/* Show pages around current page */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
          const page = start + i;
          
          if (page <= totalPages) {
            return (
              <Button
                key={page}
                onClick={() => onPageChange(page)}
                variant={currentPage === page ? "default" : "ghost"}
                size="sm"
              >
                {page}
              </Button>
            );
          }
          return null;
        })}
        
        {/* Show last page */}
        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <span className="text-gray-400">...</span>}
            <Button
              onClick={() => onPageChange(totalPages)}
              variant={currentPage === totalPages ? "default" : "ghost"}
              size="sm"
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>
      
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        variant="outline"
        size="sm"
        className="gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};