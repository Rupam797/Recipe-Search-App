import React, { createContext, useContext, useState } from 'react';

const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const value = {
    recipes,
    setRecipes,
    selectedRecipe,
    setSelectedRecipe,
    loading,
    setLoading,
    error,
    setError,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}

/* Optional custom hook (recommended) */
export function useRecipe() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipe must be used inside RecipeProvider');
  }
  return context;
}
