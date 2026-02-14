import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid3x3, List, ChefHat } from 'lucide-react';
import RecipeCard from './RecipeCard';

export default function RecipeList({ recipes = [], loading = false }) {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('default');

  // Sort recipes
  const sortedRecipes = [...recipes].sort((a, b) => {
    switch (sortBy) {
      case 'time':
        return (a.readyInMinutes || 0) - (b.readyInMinutes || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-52 rounded-t-2xl"></div>
              <div className="bg-white p-5 rounded-b-2xl border border-gray-200 border-t-0">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!recipes.length) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          {/* Decorative Icon */}
          <div className="relative mb-8 inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 rounded-full blur-2xl opacity-60"></div>
            <div className="relative bg-white p-8 rounded-full shadow-lg border border-gray-100">
              <Search size={64} className="text-gray-400" />
            </div>
          </div>

          {/* Message */}
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            No Recipes Found
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            We couldn't find any recipes matching your search. Try adjusting your filters or search terms.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/search')}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <Search size={20} />
              <span>Browse All Recipes</span>
            </button>
          </div>

          {/* Popular Suggestions */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Try Searching For
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Pasta', 'Chicken', 'Vegetarian', 'Dessert', 'Quick Meals'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => navigate(`/search?q=${suggestion.toLowerCase()}`)}
                  className="px-5 py-2 bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 rounded-full text-sm font-medium transition-all duration-200 border border-gray-200 hover:border-green-300 shadow-sm hover:shadow"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        {/* Results Count */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <ChefHat size={20} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {recipes.length} {recipes.length === 1 ? 'Recipe' : 'Recipes'}
            </h2>
            <p className="text-sm text-gray-600">Found for you</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Sort Dropdown */}
          <div className="flex-1 sm:flex-initial">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
            >
              <option value="default">Sort by: Default</option>
              <option value="time">Sort by: Time</option>
              <option value="rating">Sort by: Rating</option>
              <option value="name">Sort by: Name</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Grid view"
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => navigate(`/search/${recipe.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => navigate(`/search/${recipe.id}`)}
              className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden group"
            >
              {/* Image */}
              <div className="sm:w-64 h-48 sm:h-auto overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {recipe.title}
                    </h3>
                    {recipe.rating && (
                      <div className="flex items-center gap-1 ml-4">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm font-bold text-gray-900">{recipe.rating}</span>
                      </div>
                    )}
                  </div>

                  {recipe.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {recipe.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-3">
                    {recipe.category && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        {recipe.category}
                      </span>
                    )}
                    {recipe.area && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {recipe.area}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    {recipe.readyInMinutes && (
                      <span className="flex items-center gap-1">
                        ⏱ {recipe.readyInMinutes}m
                      </span>
                    )}
                    {recipe.servings && (
                      <span className="flex items-center gap-1">
                        🍽 {recipe.servings} servings
                      </span>
                    )}
                  </div>
                  <button className="text-green-600 font-medium hover:underline">
                    View Recipe →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More (if needed for pagination) */}
      {recipes.length >= 20 && (
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-green-600 hover:text-green-600 transition-all duration-200">
            Load More Recipes
          </button>
        </div>
      )}
    </div>
  );
}