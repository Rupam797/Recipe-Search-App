import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RecipeDetails from '../components/recipe/RecipeDetails';
// import Loader from '../components/common/Loader';

export default function Recipe() {
  // In a real app, this would come from context, route params, or API
  const recipe = null;
  const loading = false;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="flex-1 px-4">
        {loading ? (
          // <Loader text="Loading recipe..." />
          <div className="py-20 text-center text-gray-500">
            Loading recipe...
          </div>
        ) : recipe ? (
          <RecipeDetails recipe={recipe} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="mb-4 text-sm text-gray-500">
              Select a recipe to view details.
            </p>

            {/* Back / CTA */}
            <button
              className="rounded-lg border border-green-600 px-5 py-2 text-sm font-medium text-green-600 hover:bg-green-50 transition"
            >
              Browse Recipes
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
