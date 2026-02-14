import { useEffect, useState } from 'react';
import { fetchRecipes } from '../services/recipeApi';

export default function useFetchRecipes(query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.trim() === '') {
      setData([]);
      setError(null);
      setLoading(false);
      return;
    }

    let isActive = true;
    setLoading(true);
    setError(null);

    fetchRecipes(query)
      .then((recipes) => {
        if (!isActive) return;

        // TheMealDB returns [] when no meals found
        setData(recipes);
      })
      .catch(() => {
        if (isActive) {
          setError('No recipes found. Try another search.');
          setData([]);
        }
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [query]);

  return { data, loading, error };
}
