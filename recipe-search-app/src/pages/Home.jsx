import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChefHat, Heart, Sparkles, TrendingUp, Clock, BookOpen, Star, Zap } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useRecipe } from '../context/RecipeContext';

export default function Home() {
  const navigate = useNavigate();
  const { favorites, recentlyViewed, stats } = useRecipe();
  const [loading, setLoading] = useState(false);

  const handleRandomRecipe = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php'
      );
      const data = await res.json();
      const id = data.meals[0].idMeal;
      navigate(`/search/${id}`);
    } catch (error) {
      console.error('Failed to fetch random recipe');
    } finally {
      setLoading(false);
    }
  };

  const popularCategories = [
    { name: 'Italian', emoji: '🍝', color: 'from-red-500 to-orange-500' },
    { name: 'Asian', emoji: '🍜', color: 'from-yellow-500 to-orange-500' },
    { name: 'Mexican', emoji: '🌮', color: 'from-orange-500 to-red-500' },
    { name: 'Dessert', emoji: '🍰', color: 'from-pink-500 to-purple-500' },
    { name: 'Vegetarian', emoji: '🥗', color: 'from-green-500 to-emerald-500' },
    { name: 'Seafood', emoji: '🦞', color: 'from-blue-500 to-cyan-500' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Header />

      <main className="flex-1">
        {/* 🥘 HERO SECTION */}
        <section className="relative mx-auto max-w-6xl px-4 py-20 md:py-28 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '700ms' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1400ms' }}></div>
          
          <div className="relative z-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <Sparkles size={16} className="text-green-500" />
              <span className="text-sm font-semibold text-gray-700">Free • Real Recipes • Easy to Follow</span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
              Discover Delicious
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Recipes
              </span>
            </h1>
            
            <p className="mx-auto mb-12 max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed">
              Search thousands of real recipes, explore fresh ingredients, 
              and cook something amazing today. No subscriptions, just great food.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center mb-16">
              <Link
                to="/search"
                className="group relative rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-10 py-4 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-3"
              >
                <Search size={22} />
                <span className="relative z-10">Start Searching</span>
              </Link>

              <button
                onClick={handleRandomRecipe}
                disabled={loading}
                className="group relative rounded-xl border-2 border-green-600 bg-white px-10 py-4 text-green-700 font-semibold hover:bg-green-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Sparkles size={20} />
                    Surprise Me
                  </span>
                )}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
              <Stat 
                number="1000+" 
                label="Recipes" 
                icon={<BookOpen size={24} className="text-green-600" />} 
              />
              <Stat 
                number={stats.totalFavorites || 0} 
                label="Favorites" 
                icon={<Heart size={24} className="text-red-500 fill-current" />} 
              />
              <Stat 
                number="Free" 
                label="Forever" 
                icon={<Star size={24} className="text-yellow-500 fill-current" />} 
              />
            </div>
          </div>
        </section>

        {/* 📚 POPULAR CATEGORIES */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Explore by Category
              </h2>
              <p className="text-gray-600 text-lg">
                What are you in the mood for?
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularCategories.map((category) => (
                <Link
                  key={category.name}
                  to={`/search?category=${category.name.toLowerCase()}`}
                  className="group relative rounded-2xl bg-white p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                      {category.emoji}
                    </div>
                    <div className="font-semibold text-gray-900">
                      {category.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 🌟 FEATURES */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why You'll Love It
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Everything you need to discover, save, and cook amazing meals
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Feature
                title="Lightning Search"
                icon={<Search size={28} />}
                description="Find any recipe instantly with our smart search. Type and see results in real-time."
                color="from-blue-500 to-cyan-500"
              />
              <Feature
                title="Always Free"
                icon={<ChefHat size={28} />}
                description="Powered by TheMealDB with thousands of recipes. No hidden costs, no subscriptions."
                color="from-orange-500 to-red-500"
              />
              <Feature
                title="Step-by-Step"
                icon={<BookOpen size={28} />}
                description="Clear ingredients list and detailed instructions. Cook like a pro every time."
                color="from-green-500 to-emerald-500"
              />
              <Feature
                title="Random Discovery"
                icon={<Sparkles size={28} />}
                description="Feeling adventurous? Try our random recipe feature and discover something new."
                color="from-purple-500 to-pink-500"
              />
              <Feature
                title="Save Favorites"
                icon={<Heart size={28} />}
                description="Bookmark your favorite recipes and build your personal cookbook collection."
                color="from-rose-500 to-pink-500"
              />
              <Feature
                title="Mobile Friendly"
                icon={<Zap size={28} />}
                description="Cook from any device. Responsive design works perfectly on phones and tablets."
                color="from-indigo-500 to-purple-500"
              />
            </div>
          </div>
        </section>

        {/* 🎯 YOUR ACTIVITY */}
        {(favorites.length > 0 || recentlyViewed.length > 0) && (
          <section className="py-16 bg-white">
            <div className="mx-auto max-w-6xl px-4">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Recent Favorites */}
                {favorites.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Heart size={24} className="text-red-500 fill-current" />
                        Your Favorites
                      </h2>
                      <Link to="/favorites" className="text-green-600 hover:text-green-700 text-sm font-semibold flex items-center gap-1">
                        View All
                        <span className="text-lg">→</span>
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {favorites.slice(0, 3).map((recipe) => (
                        <Link
                          key={recipe.id}
                          to={`/search/${recipe.id}`}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-16 h-16 rounded-lg object-cover shadow-sm"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 truncate group-hover:text-green-600 transition-colors">
                              {recipe.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {recipe.category || recipe.area}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recently Viewed */}
                {recentlyViewed.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Clock size={24} className="text-blue-600" />
                        Recently Viewed
                      </h2>
                    </div>
                    <div className="space-y-3">
                      {recentlyViewed.slice(0, 3).map((recipe) => (
                        <Link
                          key={recipe.id}
                          to={`/search/${recipe.id}`}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-16 h-16 rounded-lg object-cover shadow-sm"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 truncate group-hover:text-green-600 transition-colors">
                              {recipe.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {recipe.category || recipe.area}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 🚀 CTA BANNER */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <ChefHat size={40} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Cooking?
            </h2>
            <p className="text-green-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of home cooks discovering new recipes every day
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-3 rounded-xl bg-white px-10 py-5 text-green-700 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              Browse Recipes Now
              <span className="text-xl">→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

/* ---------- Enhanced Stat Component ---------- */
function Stat({ number, label, icon }) {
  return (
    <div className="text-center bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex justify-center mb-3">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{number}</div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </div>
  );
}

/* ---------- Enhanced Feature Card ---------- */
function Feature({ title, icon, description, color }) {
  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Gradient Background on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        {/* Icon with Gradient Background */}
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${color} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        
        <h3 className="mb-3 text-xl font-bold text-gray-900">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative Corner */}
      <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${color} rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`}></div>
    </div>
  );
}