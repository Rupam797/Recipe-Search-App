import React, { useState } from 'react';
import { 
  Clock, 
  Users, 
  ChefHat, 
  Bookmark, 
  Share2, 
  Printer,
  Check,
  Heart,
  Star,
  Tag,
  Globe,
  AlertCircle
} from 'lucide-react';

export default function RecipeDetails({ recipe }) {
  const [savedIngredients, setSavedIngredients] = useState(new Set());
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isSaved, setIsSaved] = useState(false);
  const [servingMultiplier, setServingMultiplier] = useState(1);

  if (!recipe) {
    return (
      <div className="py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <AlertCircle size={32} className="text-gray-400" />
        </div>
        <p className="text-lg text-gray-500">No recipe selected.</p>
      </div>
    );
  }

  const toggleIngredient = (index) => {
    const newSaved = new Set(savedIngredients);
    if (newSaved.has(index)) {
      newSaved.delete(index);
    } else {
      newSaved.add(index);
    }
    setSavedIngredients(newSaved);
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

  const handleServingChange = (direction) => {
    if (direction === 'increase') {
      setServingMultiplier(prev => prev + 0.5);
    } else if (direction === 'decrease' && servingMultiplier > 0.5) {
      setServingMultiplier(prev => prev - 0.5);
    }
  };

  const adjustedServings = recipe.servings ? Math.round(recipe.servings * servingMultiplier) : null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
          >
            ← Back
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2.5 rounded-lg transition-all ${
              isSaved 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title={isSaved ? 'Saved' : 'Save recipe'}
          >
            <Bookmark size={18} className={isSaved ? 'fill-current' : ''} />
          </button>
          <button
            className="p-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-all"
            title="Share recipe"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={() => window.print()}
            className="p-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-all"
            title="Print recipe"
          >
            <Printer size={18} />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        {/* Large Image */}
        <div className="relative h-80 md:h-96 overflow-hidden bg-gray-100">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <div className="flex flex-wrap gap-2 mb-3">
              {recipe.category && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-sm font-semibold rounded-full">
                  {recipe.category}
                </span>
              )}
              {recipe.area && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-sm font-semibold rounded-full">
                  {recipe.area}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              {recipe.title}
            </h1>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-t border-green-100">
          {recipe.readyInMinutes && (
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Clock size={20} className="text-green-600" />
              </div>
              <div>
                <div className="text-xs text-gray-600 font-medium">Prep Time</div>
                <div className="text-lg font-bold text-gray-900">{recipe.readyInMinutes}m</div>
              </div>
            </div>
          )}

          {recipe.servings && (
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Users size={20} className="text-green-600" />
              </div>
              <div>
                <div className="text-xs text-gray-600 font-medium">Servings</div>
                <div className="text-lg font-bold text-gray-900">{adjustedServings || recipe.servings}</div>
              </div>
            </div>
          )}

          {recipe.difficulty && (
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <ChefHat size={20} className="text-green-600" />
              </div>
              <div>
                <div className="text-xs text-gray-600 font-medium">Difficulty</div>
                <div className="text-lg font-bold text-gray-900 capitalize">{recipe.difficulty}</div>
              </div>
            </div>
          )}

          {recipe.rating && (
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Star size={20} className="text-yellow-500 fill-current" />
              </div>
              <div>
                <div className="text-xs text-gray-600 font-medium">Rating</div>
                <div className="text-lg font-bold text-gray-900">{recipe.rating}/5</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {recipe.description && (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            {recipe.description}
          </p>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Ingredients Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
            {/* Serving Adjuster */}
            {recipe.servings && (
              <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="text-sm font-semibold text-gray-700 mb-2">Adjust Servings</div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleServingChange('decrease')}
                    className="w-10 h-10 bg-white border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={servingMultiplier <= 0.5}
                  >
                    −
                  </button>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{adjustedServings || recipe.servings}</div>
                    <div className="text-xs text-gray-600">servings</div>
                  </div>
                  <button
                    onClick={() => handleServingChange('increase')}
                    className="w-10 h-10 bg-white border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-600 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🥗</span>
              Ingredients
            </h3>
            
            <ul className="space-y-2">
              {recipe.ingredients && recipe.ingredients.map((item, index) => (
                <li
                  key={index}
                  onClick={() => toggleIngredient(index)}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    savedIngredients.has(index)
                      ? 'bg-green-50 border-2 border-green-500'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all ${
                    savedIngredients.has(index)
                      ? 'bg-green-600 border-green-600'
                      : 'border-gray-300'
                  }`}>
                    {savedIngredients.has(index) && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                  <span className={`text-sm flex-1 transition-all ${
                    savedIngredients.has(index) 
                      ? 'text-gray-500 line-through' 
                      : 'text-gray-900'
                  }`}>
                    {typeof item === 'string' ? item : `${item.name} - ${item.measure}`}
                  </span>
                </li>
              ))}
            </ul>

            <button className="mt-6 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-sm print:hidden">
              Add to Shopping List
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📜</span>
              Instructions
            </h3>
            
            <ol className="space-y-4">
              {recipe.instructions && recipe.instructions.map((step, index) => (
                <li
                  key={index}
                  onClick={() => toggleStep(index)}
                  className={`flex gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    completedSteps.has(index)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-200 bg-white'
                  }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    completedSteps.has(index)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {completedSteps.has(index) ? <Check size={20} /> : index + 1}
                  </div>
                  <p className={`flex-1 text-base leading-relaxed pt-1.5 transition-all ${
                    completedSteps.has(index) 
                      ? 'text-gray-500 line-through' 
                      : 'text-gray-700'
                  }`}>
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Additional Tips */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6 md:p-8 mt-8 border border-amber-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Chef's Tips
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-amber-600 rounded-full mt-2"></span>
                <span className="text-sm leading-relaxed">Prep all ingredients before starting (mise en place) for smoother cooking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-amber-600 rounded-full mt-2"></span>
                <span className="text-sm leading-relaxed">Read through all instructions before beginning</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-amber-600 rounded-full mt-2"></span>
                <span className="text-sm leading-relaxed">Taste and adjust seasoning throughout the cooking process</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}