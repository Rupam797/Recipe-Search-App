import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Loader from '../components/common/Loader';
import { fetchRecipeById } from '../services/recipeApi';

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipeById(id)
      .then(setRecipe)
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-10">
        {loading && <Loader text="Loading recipe..." />}

        {!loading && recipe && (
          <div className="space-y-10">
            {/* 🍽 HERO SECTION */}
            <section className="bg-white rounded-2xl border p-6 md:flex gap-6">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full md:w-80 h-56 object-cover rounded-xl"
              />

              <div className="flex-1 mt-4 md:mt-0">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                  {recipe.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>🍱 Category: {recipe.category}</span>
                  <span>🌍 Cuisine: {recipe.area}</span>
                </div>

                <button
                  onClick={() => navigate(-1)}
                  className="mt-4 inline-block text-sm text-green-600 hover:underline"
                >
                  ← Back to search
                </button>
              </div>
            </section>

            {/* 🥗 INGREDIENTS */}
            <Section title="Ingredients">
              <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                {recipe.ingredients.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <span className="h-2 w-2 bg-green-600 rounded-full" />
                    <span>
                      {item.name}
                      {item.measure && (
                        <span className="text-gray-500">
                          {' '}
                          – {item.measure}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* 📜 INSTRUCTIONS */}
            <Section title="Instructions">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {recipe.instructions}
              </p>
            </Section>

            {/* 🎥 VIDEO */}
            {recipe.youtube && (
              <Section title="Cooking Video">
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={recipe.youtube.replace(
                      'watch?v=',
                      'embed/'
                    )}
                    title={recipe.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </Section>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

/* ---------- Reusable Section ---------- */
function Section({ title, children }) {
  return (
    <section className="bg-white rounded-2xl border p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}
