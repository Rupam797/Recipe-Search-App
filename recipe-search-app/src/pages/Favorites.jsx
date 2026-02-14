import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Search, SlidersHorizontal, ChefHat, Clock, Sparkles, TrendingUp } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RecipeList from '../components/recipe/RecipeList';
import { useRecipe } from '../context/RecipeContext';

export default function Favorites() {
  const { favorites, removeFromFavorites } = useRecipe();
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Calculate statistics
  const stats = useMemo(() => {
    const totalRecipes = favorites.length;
    const categories = [...new Set(favorites.map(r => r.category).filter(Boolean))];
    const avgTime = favorites.reduce((acc, r) => acc + (r.readyInMinutes || 0), 0) / totalRecipes || 0;
    
    return {
      total: totalRecipes,
      categories: categories.length,
      avgTime: Math.round(avgTime),
    };
  }, [favorites]);

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = favorites.map(r => r.category).filter(Boolean);
    return ['all', ...new Set(cats)];
  }, [favorites]);

  // Filter and sort recipes
  const filteredRecipes = useMemo(() => {
    let filtered = [...favorites];

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(r => r.category === filterCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'time':
        filtered.sort((a, b) => (a.readyInMinutes || 0) - (b.readyInMinutes || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'recent':
      default:
        // Keep original order (most recently added first)
        break;
    }

    return filtered;
  }, [favorites, filterCategory, sortBy]);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all saved recipes?')) {
      favorites.forEach(recipe => removeFromFavorites(recipe.id));
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="flex-1">
        {favorites.length === 0 ? (
          // Enhanced Empty State
          <div className="max-w-4xl mx-auto px-4 py-20">
            <div className="text-center">
              {/* Decorative Icon */}
              <div className="relative mb-8 inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-pink-100 to-rose-100 rounded-full blur-2xl opacity-60"></div>
                <div className="relative bg-white p-8 rounded-full shadow-lg border border-gray-100">
                  <Heart size={64} className="text-gray-300" />
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                No Saved Recipes Yet
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Start building your personal cookbook by saving recipes you love
              </p>

              {/* Action Button */}
              <button
                onClick={() => navigate('/search')}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2 mx-auto"
              >
                <Search size={20} />
                <span>Discover Recipes</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity"></div>
              </button>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Heart size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Save Your Favorites
                  </h3>
                  <p className="text-sm text-gray-600">
                    Keep all your favorite recipes in one place
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <ChefHat size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Quick Access
                  </h3>
                  <p className="text-sm text-gray-600">
                    Find your saved recipes instantly when you need them
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Build Collections
                  </h3>
                  <p className="text-sm text-gray-600">
                    Organize recipes by category or occasion
                  </p>
                </div>
              </div>

              {/* Popular Categories */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Start Exploring
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Italian', 'Mexican', 'Asian', 'Desserts', 'Quick Meals', 'Healthy'].map((category) => (
                    <button
                      key={category}
                      onClick={() => navigate(`/search?category=${category.toLowerCase()}`)}
                      className="px-5 py-2 bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 rounded-full text-sm font-medium transition-all duration-200 border border-gray-200 hover:border-green-300 shadow-sm hover:shadow"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Favorites Content
          <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <Heart size={36} className="text-red-500 fill-current" />
                    Saved Recipes
                  </h1>
                  <p className="text-gray-600">
                    Your personal collection of favorite recipes
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/search')}
                    className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
                  >
                    <Search size={18} />
                    <span>Find More</span>
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-600 rounded-lg">
                      <Heart size={20} className="text-white fill-current" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                      <div className="text-sm text-gray-600">Saved Recipes</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <ChefHat size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stats.categories}</div>
                      <div className="text-sm text-gray-600">Categories</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-600 rounded-lg">
                      <Clock size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stats.avgTime}m</div>
                      <div className="text-sm text-gray-600">Avg. Time</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters and Sort */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                {/* Category Filter */}
                <div className="flex-1 w-full sm:w-auto">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Filter by Category
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div className="flex-1 w-full sm:w-auto">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                  >
                    <option value="recent">Recently Added</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="time">Cooking Time</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>

                {/* Results Count */}
                <div className="flex items-center gap-2 text-sm text-gray-600 pt-6">
                  <span className="font-medium">
                    {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
                  </span>
                  {filterCategory !== 'all' && (
                    <button
                      onClick={() => setFilterCategory('all')}
                      className="text-green-600 hover:underline"
                    >
                      (clear filter)
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Recipe List */}
            {filteredRecipes.length > 0 ? (
              <RecipeList recipes={filteredRecipes} />
            ) : (
              <div className="py-20 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <SlidersHorizontal size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No recipes match your filters
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to see more recipes
                </p>
                <button
                  onClick={() => setFilterCategory('all')}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}