import React from 'react';
import { ChefHat, ArrowLeft, Search, Sparkles } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RecipeDetails from '../components/recipe/RecipeDetails';
// import Loader from '../components/common/Loader';

export default function Recipe() {
  // In a real app, this would come from context, route params, or API
  const recipe = null;
  const loading = false;

  const handleBrowseRecipes = () => {
    // Navigate to search/browse page
    window.location.href = '/search';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="flex-1">
        {loading ? (
          // Enhanced Loading State
          <div className="max-w-4xl mx-auto px-4 py-20">
            <div className="flex flex-col items-center justify-center">
              {/* Animated Chef Hat */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-white p-6 rounded-full shadow-lg">
                  <ChefHat size={48} className="text-green-600 animate-bounce" />
                </div>
              </div>

              {/* Loading Text */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Preparing Your Recipe
              </h3>
              <p className="text-gray-600 mb-6">
                Getting all the delicious details ready...
              </p>

              {/* Loading Bar */}
              <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>
        ) : recipe ? (
          <RecipeDetails recipe={recipe} />
        ) : (
          // Enhanced Empty State
          <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="text-center">
              {/* Decorative Background */}
              <div className="relative mb-8 inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 rounded-full blur-2xl opacity-60"></div>
                <div className="relative bg-white p-8 rounded-full shadow-lg border border-gray-100">
                  <ChefHat size={64} className="text-green-600" />
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                No Recipe Selected
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Start your culinary adventure by exploring our collection of delicious recipes
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
                <button
                  onClick={handleBrowseRecipes}
                  className="group relative px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <Search size={20} />
                  <span>Browse Recipes</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-lg transition-opacity"></div>
                </button>

                <button
                  onClick={handleGoBack}
                  className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-green-600 hover:text-green-600 transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <ArrowLeft size={20} />
                  <span>Go Back</span>
                </button>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">🍳</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Easy to Follow
                  </h3>
                  <p className="text-sm text-gray-600">
                    Step-by-step instructions for every skill level
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">⏱️</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Quick & Tasty
                  </h3>
                  <p className="text-sm text-gray-600">
                    Recipes for busy weeknights and lazy weekends
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Diverse Flavors
                  </h3>
                  <p className="text-sm text-gray-600">
                    Cuisines from around the world at your fingertips
                  </p>
                </div>
              </div>

              {/* Popular Categories */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Popular Categories
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Italian', 'Mexican', 'Asian', 'Desserts', 'Vegetarian', 'Quick Meals'].map((category) => (
                    <button
                      key={category}
                      onClick={handleBrowseRecipes}
                      className="px-5 py-2 bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 rounded-full text-sm font-medium transition-all duration-200 border border-gray-200 hover:border-green-300 shadow-sm hover:shadow"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }
      `}</style>
    </div>
  );
}