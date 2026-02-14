import React from 'react';

export default function RecipeCard({ recipe, onClick }) {
  if (!recipe) return null;

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-gray-800 group-hover:text-green-600 transition">
          {recipe.title}
        </h3>

        {/* Optional meta */}
        {recipe.readyInMinutes && (
          <p className="mt-2 text-sm text-gray-500">
            ⏱ {recipe.readyInMinutes} mins
          </p>
        )}
      </div>
    </article>
  );
}
