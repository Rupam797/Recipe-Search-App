import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  ChefHat, 
  Heart, 
  Share2, 
  Printer, 
  Play,
  Check,
  Globe,
  Tag
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Loader from '../components/common/Loader';
import { fetchRecipeById } from '../services/recipeApi';
import { useRecipe } from '../context/RecipeContext';

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get favorites functions from context
  const { isFavorite, toggleFavorite } = useRecipe();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  useEffect(() => {
    fetchRecipeById(id)
      .then(setRecipe)
      .finally(() => setLoading(false));
  }, [id]);

  // Check if this recipe is favorited
  const isSaved = recipe ? isFavorite(recipe.id) : false;

  const handleSave = () => {
    if (recipe) {
      toggleFavorite(recipe);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: `Check out this recipe: ${recipe.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleStep = (index) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  // Split instructions into steps (assuming they're separated by newlines or periods)
  const getInstructionSteps = (instructions) => {
    if (!instructions) return [];
    return instructions
      .split(/\n+|\.\s+(?=[A-Z])/)
      .filter(step => step.trim().length > 0)
      .map(step => step.trim());
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <Loader text="Loading recipe..." />
        </main>
        <Footer />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipe not found</h2>
            <button
              onClick={() => navigate('/search')}
              className="text-green-600 hover:underline"
            >
              Browse recipes
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const instructionSteps = getInstructionSteps(recipe.instructions);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="flex-1">
        {/* Back Navigation */}
        <div className="bg-white border-b border-gray-200 print:hidden">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to recipes</span>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          {/* Hero Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            {/* Image */}
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Floating Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2 print:hidden">
                <button
                  onClick={handleSave}
                  className={`p-3 rounded-full backdrop-blur-sm transition-all ${
                    isSaved 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/90 text-gray-700 hover:bg-white'
                  }`}
                  title={isSaved ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart size={20} className={isSaved ? 'fill-current' : ''} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 bg-white/90 hover:bg-white text-gray-700 rounded-full backdrop-blur-sm transition-all"
                  title="Share recipe"
                >
                  <Share2 size={20} />
                </button>
                <button
                  onClick={handlePrint}
                  className="p-3 bg-white/90 hover:bg-white text-gray-700 rounded-full backdrop-blur-sm transition-all"
                  title="Print recipe"
                >
                  <Printer size={20} />
                </button>
              </div>
            </div>

            {/* Recipe Header */}
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {recipe.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                {recipe.category && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Tag size={18} className="text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Category</div>
                      <div className="font-medium">{recipe.category}</div>
                    </div>
                  </div>
                )}
                
                {recipe.area && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Globe size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Cuisine</div>
                      <div className="font-medium">{recipe.area}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock size={20} className="text-green-600" />
                  <span className="font-medium">45 mins</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Users size={20} className="text-green-600" />
                  <span className="font-medium">4 servings</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <ChefHat size={20} className="text-green-600" />
                  <span className="font-medium">Medium</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Ingredients Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">🥗</span>
                  </div>
                  Ingredients
                </h2>
                
                <ul className="space-y-3">
                  {recipe.ingredients.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm group"
                    >
                      <span className="mt-1.5 h-2 w-2 bg-green-600 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform" />
                      <div className="flex-1">
                        <span className="text-gray-900 font-medium">{item.name}</span>
                        {item.measure && (
                          <span className="text-gray-500 block text-xs mt-0.5">
                            {item.measure}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Shopping List Button */}
                <button className="mt-6 w-full py-2.5 bg-green-50 hover:bg-green-100 text-green-700 font-medium rounded-lg transition-colors print:hidden">
                  Add to Shopping List
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="md:col-span-2 space-y-6">
              <Section title="Instructions" icon="📜">
                <div className="space-y-4">
                  {instructionSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer print:cursor-default ${
                        completedSteps.has(index)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-200 bg-white'
                      }`}
                      onClick={() => toggleStep(index)}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                        completedSteps.has(index)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {completedSteps.has(index) ? <Check size={16} /> : index + 1}
                      </div>
                      <p className={`flex-1 text-sm leading-relaxed transition-colors ${
                        completedSteps.has(index) 
                          ? 'text-gray-600 line-through' 
                          : 'text-gray-700'
                      }`}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Video Tutorial */}
              {recipe.youtube && (
                <Section title="Video Tutorial" icon="🎥">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900 group">
                    <iframe
                      src={recipe.youtube.replace('watch?v=', 'embed/')}
                      title={recipe.title}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play size={32} className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                </Section>
              )}

              {/* Tips Section */}
              <Section title="Chef's Tips" icon="💡">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>Make sure all ingredients are at room temperature for best results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>Prep all ingredients before you start cooking (mise en place)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>Taste and adjust seasoning before serving</span>
                    </li>
                  </ul>
                </div>
              </Section>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .print\\:cursor-default {
            cursor: default !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- Reusable Section ---------- */
function Section({ title, icon, children }) {
  return (
    <section className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        {icon && <span className="text-2xl">{icon}</span>}
        {title}
      </h2>
      {children}
    </section>
  );
}