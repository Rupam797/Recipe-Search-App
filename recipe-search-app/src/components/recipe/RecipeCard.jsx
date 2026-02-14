import React from 'react';
import { Clock, Users, ChefHat, Heart, TrendingUp, Tag } from 'lucide-react';
import { useRecipe } from '../../context/RecipeContext';

export default function RecipeCard({ recipe, onClick }) {
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useRecipe();

  const favorite = isFavorite(recipe.id);

  const handleFavorite = (e) => {
    e.stopPropagation(); // prevent card click
    favorite
      ? removeFromFavorites(recipe.id)
      : addToFavorites(recipe);
  };

  // Determine difficulty badge color
  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-700 border-green-200',
      medium: 'bg-amber-100 text-amber-700 border-amber-200',
      hard: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[difficulty?.toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-green-200 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Top Badges Row */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          {/* Left badges */}
          <div className="flex gap-2 flex-wrap">
            {recipe.category && (
              <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full shadow-sm flex items-center gap-1">
                <Tag size={12} />
                {recipe.category}
              </span>
            )}
            {recipe.difficulty && (
              <span className={`px-3 py-1 backdrop-blur-sm text-xs font-semibold rounded-full border ${getDifficultyColor(recipe.difficulty)}`}>
                {recipe.difficulty}
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className={`p-2 backdrop-blur-sm rounded-full shadow-sm transition-all duration-300 hover:scale-110 ${
              favorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/95 text-gray-600 hover:bg-white'
            }`}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              size={18} 
              className={favorite ? 'fill-current' : ''} 
            />
          </button>
        </div>

        {/* Trending Badge */}
        {recipe.trending && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg">
            <TrendingUp size={12} />
            <span>Trending</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="line-clamp-2 text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors min-h-[3.5rem]">
          {recipe.title}
        </h3>

        {/* Area & Category */}
        {(recipe.area || recipe.category) && (
          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-gray-600">
            {recipe.area && (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                {recipe.area}
              </span>
            )}
            {recipe.area && recipe.category && (
              <span className="text-gray-400">•</span>
            )}
            {recipe.category && (
              <span>{recipe.category}</span>
            )}
          </div>
        )}

        {/* Description */}
        {recipe.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {recipe.description}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            {/* Time */}
            {recipe.readyInMinutes && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Clock size={16} className="text-green-600" />
                <span className="text-sm font-medium">{recipe.readyInMinutes}m</span>
              </div>
            )}

            {/* Servings */}
            {recipe.servings && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Users size={16} className="text-green-600" />
                <span className="text-sm font-medium">{recipe.servings}</span>
              </div>
            )}

            {/* Difficulty Icon - only show if not already in badge */}
            {!recipe.difficulty && recipe.level && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <ChefHat size={16} className="text-green-600" />
                <span className="text-sm font-medium capitalize">{recipe.level}</span>
              </div>
            )}
          </div>

          {/* Rating */}
          {recipe.rating && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-500 text-lg">⭐</span>
              <span className="text-sm font-bold text-gray-900">{recipe.rating}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md hover:bg-gray-200 transition-colors"
              >
                {tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                +{recipe.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover Action Bar */}
      <div className="px-5 pb-5 opacity-0 group-hover:opacity-100 transition-all duration-300 -mt-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-full py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          View Recipe
        </button>
      </div>

      {/* Favorite Animation Effect */}
      {favorite && (
        <div className="absolute top-3 right-3 pointer-events-none">
          <div className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-red-400 opacity-75"></div>
        </div>
      )}
    </article>
  );
}