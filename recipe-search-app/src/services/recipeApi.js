const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/* ---------------- SEARCH RECIPES ---------------- */
export async function fetchRecipes(query) {
  if (!query) return [];

  const response = await fetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  const data = await response.json();

  // Normalize data to match your existing UI
  return (data.meals || []).map((meal) => ({
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
  }));
}

/* ---------------- RECIPE BY ID ---------------- */
export async function fetchRecipeById(id) {
  const response = await fetch(
    `${BASE_URL}/lookup.php?i=${id}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recipe details');
  }

  const data = await response.json();
  const meal = data.meals?.[0];

  if (!meal) return null;

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    youtube: meal.strYoutube,
    ingredients: extractIngredients(meal),
  };
}

/* ---------------- INGREDIENTS HELPER ---------------- */
function extractIngredients(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient,
        measure: measure || '',
      });
    }
  }

  return ingredients;
}
