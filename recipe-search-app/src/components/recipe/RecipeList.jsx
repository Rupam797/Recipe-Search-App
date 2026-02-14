import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard';

export default function RecipeList({ recipes = [] }) {
  const navigate = useNavigate();

  if (!recipes.length) {
    return (
      <p className="py-10 text-center text-gray-500">
        No recipes found.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={() => navigate(`/search/${recipe.id}`)}
        />
      ))}
    </div>
  );
}
