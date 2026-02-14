import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Input from '../components/common/Input';
import RecipeList from '../components/recipe/RecipeList';
import Loader from '../components/common/Loader';

import useDebounce from '../hooks/useDebounce';
import useFetchRecipes from '../hooks/useFetchRecipes';

export default function Search() {
  const [query, setQuery] = useState('');

  // Debounce user input
  const debouncedQuery = useDebounce(query, 500);

  // Fetch recipes from API
  const {
    data: recipes,
    loading,
    error,
  } = useFetchRecipes(debouncedQuery);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="mb-2 text-3xl font-bold text-gray-800">
            Search Recipes
          </h2>
          <p className="mb-6 text-gray-600">
            Find recipes by ingredients, name, or cuisine.
          </p>

          {/* Search Input */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes..."
              className="flex-1"
            />
          </div>
        </section>

        {/* Results */}
        <section className="px-4">
          {loading && <Loader text="Searching recipes..." />}

          {error && (
            <p className="py-10 text-center text-red-500 text-sm">
              {error}
            </p>
          )}

          {!loading && !error && (
            <RecipeList recipes={recipes} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
