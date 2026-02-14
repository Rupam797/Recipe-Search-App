import React, { useState } from 'react';
import { Search as SearchIcon, SlidersHorizontal, Sparkles, TrendingUp } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Input from '../components/common/Input';
import RecipeList from '../components/recipe/RecipeList';
import Loader from '../components/common/Loader';

import useDebounce from '../hooks/useDebounce';
import useFetchRecipes from '../hooks/useFetchRecipes';

export default function Search() {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    cuisine: '',
    diet: '',
    difficulty: '',
  });

  // Debounce user input
  const debouncedQuery = useDebounce(query, 500);

  // Fetch recipes from API
  const {
    data: recipes,
    loading,
    error,
  } = useFetchRecipes(debouncedQuery);

  // Popular searches
  const popularSearches = [
    'Pasta', 'Chicken', 'Vegetarian', 'Dessert', 'Quick meals', 'Salad'
  ];

  // Filter options
  const cuisineOptions = ['Italian', 'Mexican', 'Asian', 'Mediterranean', 'American'];
  const dietOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo'];
  const difficultyOptions = ['Easy', 'Medium', 'Hard'];

  const handlePopularSearch = (searchTerm) => {
    setQuery(searchTerm);
  };

  const hasActiveFilters = filters.cuisine || filters.diet || filters.difficulty;
  const showResults = debouncedQuery.length > 0;
  const hasResults = recipes && recipes.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="flex-1">
        {/* Hero Search Section */}
        <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-b border-green-100">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-4">
                <Sparkles size={16} className="text-green-600" />
                <span className="text-sm font-medium text-gray-700">Discover Your Next Favorite Recipe</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Search Recipes
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find delicious recipes by ingredients, name, cuisine, or dietary preferences
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon size={20} />
                </div>
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try 'pasta carbonara', 'chicken curry', or 'chocolate cake'..."
                  className="pl-12 pr-32 py-4 text-lg shadow-lg border-white bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                    showFilters || hasActiveFilters
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <SlidersHorizontal size={18} />
                  <span className="font-medium hidden sm:inline">Filters</span>
                  {hasActiveFilters && (
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                  )}
                </button>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <div className="mt-4 p-6 bg-white rounded-xl shadow-lg border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Cuisine Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cuisine
                      </label>
                      <select
                        value={filters.cuisine}
                        onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                      >
                        <option value="">All Cuisines</option>
                        {cuisineOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Diet Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Dietary
                      </label>
                      <select
                        value={filters.diet}
                        onChange={(e) => setFilters({ ...filters, diet: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                      >
                        <option value="">All Diets</option>
                        {dietOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Difficulty
                      </label>
                      <select
                        value={filters.difficulty}
                        onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                      >
                        <option value="">All Levels</option>
                        {difficultyOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <button
                      onClick={() => setFilters({ cuisine: '', diet: '', difficulty: '' })}
                      className="mt-4 text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              )}

              {/* Popular Searches */}
              {!showResults && (
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <TrendingUp size={16} className="text-gray-500" />
                    <p className="text-sm font-medium text-gray-600">Popular Searches</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {popularSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => handlePopularSearch(search)}
                        className="px-4 py-2 bg-white hover:bg-green-50 text-gray-700 rounded-full text-sm font-medium transition-colors duration-200 border border-gray-200 hover:border-green-300 shadow-sm hover:shadow"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="mx-auto max-w-6xl px-4 py-10">
          {loading && (
            <div className="py-20">
              <Loader text="Searching recipes..." />
            </div>
          )}

          {error && (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Something went wrong
              </h3>
              <p className="text-red-600 text-sm mb-4">{error}</p>
              <button
                onClick={() => setQuery('')}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && showResults && !hasResults && (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <SearchIcon size={32} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No recipes found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any recipes matching "{debouncedQuery}". Try adjusting your search or filters.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {popularSearches.slice(0, 3).map((search) => (
                  <button
                    key={search}
                    onClick={() => handlePopularSearch(search)}
                    className="px-4 py-2 bg-gray-100 hover:bg-green-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Try "{search}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {!loading && !error && hasResults && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {recipes.length} {recipes.length === 1 ? 'Recipe' : 'Recipes'} Found
                </h2>
                {hasActiveFilters && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Filters applied
                  </div>
                )}
              </div>
              <RecipeList recipes={recipes} />
            </div>
          )}

          {!loading && !error && !showResults && (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <SearchIcon size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Start Your Culinary Journey
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Search for recipes above or explore our popular categories to find your next delicious meal.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}