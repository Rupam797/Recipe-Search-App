import React from 'react';

export default function RecipeDetails({ recipe }) {
  if (!recipe) {
    return (
      <div className="py-10 text-center text-gray-500">
        No recipe selected.
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      {/* Title */}
      <h2 className="mb-4 text-3xl font-bold text-gray-800">
        {recipe.title}
      </h2>

      {/* Image */}
      <div className="mb-6 overflow-hidden rounded-xl">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-72 w-full object-cover"
        />
      </div>

      {/* Meta info */}
      <div className="mb-6 flex flex-wrap gap-4 text-sm text-gray-600">
        {recipe.readyInMinutes && (
          <span>⏱ {recipe.readyInMinutes} mins</span>
        )}
        {recipe.servings && (
          <span>🍽 Servings: {recipe.servings}</span>
        )}
      </div>

      {/* Description / Summary */}
      {recipe.description && (
        <p className="mb-6 text-gray-700 leading-relaxed">
          {recipe.description}
        </p>
      )}

      {/* Ingredients */}
      {recipe.ingredients && (
        <div className="mb-6">
          <h3 className="mb-3 text-xl font-semibold text-gray-800">
            Ingredients
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Instructions */}
      {recipe.instructions && (
        <div>
          <h3 className="mb-3 text-xl font-semibold text-gray-800">
            Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
