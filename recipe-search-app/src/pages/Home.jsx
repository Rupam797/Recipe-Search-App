import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function Home() {
  const navigate = useNavigate();
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

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Header />

      <main className="flex-1">
        {/* 🥘 HERO SECTION - Enhanced */}
        <section className="relative mx-auto max-w-6xl px-4 py-20 text-center overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse delay-700"></div>
          
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">Free • Real Recipes • Easy to Follow</span>
            </div>

            <h2 className="mb-6 text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Discover Delicious
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Recipes
              </span>
              <span className="inline-block ml-2 text-5xl animate-bounce">🍽️</span>
            </h2>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 leading-relaxed">
              Search thousands of real recipes, explore fresh ingredients, 
              and cook something amazing today. No subscriptions, just great food.
            </p>

            {/* CTA Buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              <Link
                to="/search"
                className="group relative rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="relative z-10">Start Searching</span>
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>

              <button
                onClick={handleRandomRecipe}
                disabled={loading}
                className="group relative rounded-xl border-2 border-green-600 bg-white px-8 py-4 text-green-700 font-semibold hover:bg-green-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-md hover:shadow-lg"
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
                  <span className="flex items-center gap-2">
                    Surprise Me
                    <span className="group-hover:rotate-180 transition-transform duration-500">🎲</span>
                  </span>
                )}
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <Stat number="1000+" label="Recipes" />
              <Stat number="Free" label="Forever" />
              <Stat number="Easy" label="To Follow" />
            </div>
          </div>
        </section>

        {/* 🌟 FEATURES - Enhanced */}
        <section className="bg-white py-20 relative">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why You'll Love It
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to discover, save, and cook amazing meals
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Feature
                title="Lightning Search"
                icon="🔍"
                description="Find any recipe instantly with our smart search. Type and see results in real-time."
                color="from-blue-500 to-cyan-500"
              />
              <Feature
                title="Always Free"
                icon="🍲"
                description="Powered by TheMealDB with thousands of recipes. No hidden costs, no subscriptions."
                color="from-orange-500 to-red-500"
              />
              <Feature
                title="Step-by-Step"
                icon="📜"
                description="Clear ingredients list and detailed instructions. Cook like a pro every time."
                color="from-green-500 to-emerald-500"
              />
              <Feature
                title="Random Discovery"
                icon="🎲"
                description="Feeling adventurous? Try our random recipe feature and discover something new."
                color="from-purple-500 to-pink-500"
              />
              <Feature
                title="Save Favorites"
                icon="❤️"
                description="Bookmark your favorite recipes and build your personal cookbook collection."
                color="from-rose-500 to-pink-500"
              />
              <Feature
                title="Mobile Friendly"
                icon="📱"
                description="Cook from any device. Responsive design works perfectly on phones and tablets."
                color="from-indigo-500 to-purple-500"
              />
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Cooking?
            </h3>
            <p className="text-green-100 text-lg mb-8">
              Join thousands of home cooks discovering new recipes every day
            </p>
            <Link
              to="/search"
              className="inline-block rounded-xl bg-white px-8 py-4 text-green-700 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              Browse Recipes Now →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ---------- Stat Component ---------- */
function Stat({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-gray-900 mb-1">{number}</div>
      <div className="text-sm text-gray-600 uppercase tracking-wide">{label}</div>
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
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${color} text-white text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
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