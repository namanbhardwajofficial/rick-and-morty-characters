import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const IndexPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/characters?page=1');
  }, [navigate]);

  return (
    <div className="text-center py-8">
      <p className="text-gray-400">Redirecting to characters...</p>
    </div>
  );
}; 