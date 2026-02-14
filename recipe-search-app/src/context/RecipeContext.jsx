import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';

const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  // Core state
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ❤️ Favorites state
  const [favorites, setFavorites] = useState([]);

  // 📚 Collections state (custom recipe groups)
  const [collections, setCollections] = useState([]);

  // 🕐 Recently viewed recipes
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // 🛒 Shopping list
  const [shoppingList, setShoppingList] = useState([]);

  // 🔍 Search history
  const [searchHistory, setSearchHistory] = useState([]);

  // 👨‍🍳 Cooking mode state
  const [cookingMode, setCookingMode] = useState({
    active: false,
    recipeId: null,
    completedSteps: [],
    checkedIngredients: [],
  });

  /* -------- Load from localStorage -------- */
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }

      const storedCollections = localStorage.getItem('collections');
      if (storedCollections) {
        setCollections(JSON.parse(storedCollections));
      }

      const storedRecentlyViewed = localStorage.getItem('recentlyViewed');
      if (storedRecentlyViewed) {
        setRecentlyViewed(JSON.parse(storedRecentlyViewed));
      }

      const storedShoppingList = localStorage.getItem('shoppingList');
      if (storedShoppingList) {
        setShoppingList(JSON.parse(storedShoppingList));
      }

      const storedSearchHistory = localStorage.getItem('searchHistory');
      if (storedSearchHistory) {
        setSearchHistory(JSON.parse(storedSearchHistory));
      }

      const storedCookingMode = localStorage.getItem('cookingMode');
      if (storedCookingMode) {
        setCookingMode(JSON.parse(storedCookingMode));
      }
    } catch (err) {
      console.error('Error loading from localStorage:', err);
    }
  }, []);

  /* -------- Save to localStorage -------- */
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Error saving favorites:', err);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('collections', JSON.stringify(collections));
    } catch (err) {
      console.error('Error saving collections:', err);
    }
  }, [collections]);

  useEffect(() => {
    try {
      localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    } catch (err) {
      console.error('Error saving recently viewed:', err);
    }
  }, [recentlyViewed]);

  useEffect(() => {
    try {
      localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    } catch (err) {
      console.error('Error saving shopping list:', err);
    }
  }, [shoppingList]);

  useEffect(() => {
    try {
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    } catch (err) {
      console.error('Error saving search history:', err);
    }
  }, [searchHistory]);

  useEffect(() => {
    try {
      localStorage.setItem('cookingMode', JSON.stringify(cookingMode));
    } catch (err) {
      console.error('Error saving cooking mode:', err);
    }
  }, [cookingMode]);

  /* -------- Favorites helpers -------- */
  const addToFavorites = useCallback((recipe) => {
    setFavorites((prev) =>
      prev.some((r) => r.id === recipe.id)
        ? prev
        : [...prev, { ...recipe, savedAt: new Date().toISOString() }]
    );
  }, []);

  const removeFromFavorites = useCallback((id) => {
    setFavorites((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some((r) => r.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (recipe) => {
      if (isFavorite(recipe.id)) {
        removeFromFavorites(recipe.id);
      } else {
        addToFavorites(recipe);
      }
    },
    [isFavorite, removeFromFavorites, addToFavorites]
  );

  /* -------- Collections helpers -------- */
  const createCollection = useCallback((name, description = '') => {
    const newCollection = {
      id: Date.now().toString(),
      name,
      description,
      recipes: [],
      createdAt: new Date().toISOString(),
    };
    setCollections((prev) => [...prev, newCollection]);
    return newCollection;
  }, []);

  const deleteCollection = useCallback((collectionId) => {
    setCollections((prev) => prev.filter((c) => c.id !== collectionId));
  }, []);

  const addRecipeToCollection = useCallback((collectionId, recipe) => {
    setCollections((prev) =>
      prev.map((col) =>
        col.id === collectionId
          ? {
              ...col,
              recipes: col.recipes.some((r) => r.id === recipe.id)
                ? col.recipes
                : [...col.recipes, recipe],
            }
          : col
      )
    );
  }, []);

  const removeRecipeFromCollection = useCallback((collectionId, recipeId) => {
    setCollections((prev) =>
      prev.map((col) =>
        col.id === collectionId
          ? {
              ...col,
              recipes: col.recipes.filter((r) => r.id !== recipeId),
            }
          : col
      )
    );
  }, []);

  const updateCollection = useCallback((collectionId, updates) => {
    setCollections((prev) =>
      prev.map((col) =>
        col.id === collectionId ? { ...col, ...updates } : col
      )
    );
  }, []);

  /* -------- Recently Viewed helpers -------- */
  const addToRecentlyViewed = useCallback((recipe) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((r) => r.id !== recipe.id);
      // Add to beginning, limit to 10 items
      return [{ ...recipe, viewedAt: new Date().toISOString() }, ...filtered].slice(0, 10);
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
  }, []);

  /* -------- Shopping List helpers -------- */
  const addToShoppingList = useCallback((items) => {
    const itemsArray = Array.isArray(items) ? items : [items];
    setShoppingList((prev) => {
      const newItems = itemsArray.map((item) => ({
        id: Date.now().toString() + Math.random(),
        name: typeof item === 'string' ? item : item.name,
        measure: typeof item === 'object' ? item.measure : '',
        checked: false,
        addedAt: new Date().toISOString(),
      }));
      return [...prev, ...newItems];
    });
  }, []);

  const removeFromShoppingList = useCallback((id) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleShoppingListItem = useCallback((id) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }, []);

  const clearShoppingList = useCallback(() => {
    setShoppingList([]);
  }, []);

  const clearCheckedItems = useCallback(() => {
    setShoppingList((prev) => prev.filter((item) => !item.checked));
  }, []);

  /* -------- Search History helpers -------- */
  const addToSearchHistory = useCallback((query) => {
    if (!query || query.trim().length === 0) return;

    setSearchHistory((prev) => {
      const filtered = prev.filter((q) => q.query !== query);
      const newEntry = {
        query,
        timestamp: new Date().toISOString(),
      };
      return [newEntry, ...filtered].slice(0, 10);
    });
  }, []);

  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  const removeFromSearchHistory = useCallback((query) => {
    setSearchHistory((prev) => prev.filter((q) => q.query !== query));
  }, []);

  /* -------- Cooking Mode helpers -------- */
  const startCookingMode = useCallback((recipeId) => {
    setCookingMode({
      active: true,
      recipeId,
      completedSteps: [],
      checkedIngredients: [],
      startedAt: new Date().toISOString(),
    });
  }, []);

  const exitCookingMode = useCallback(() => {
    setCookingMode({
      active: false,
      recipeId: null,
      completedSteps: [],
      checkedIngredients: [],
    });
  }, []);

  const toggleCookingStep = useCallback((stepIndex) => {
    setCookingMode((prev) => {
      const completed = new Set(prev.completedSteps);
      if (completed.has(stepIndex)) {
        completed.delete(stepIndex);
      } else {
        completed.add(stepIndex);
      }
      return { ...prev, completedSteps: Array.from(completed) };
    });
  }, []);

  const toggleCookingIngredient = useCallback((ingredientIndex) => {
    setCookingMode((prev) => {
      const checked = new Set(prev.checkedIngredients);
      if (checked.has(ingredientIndex)) {
        checked.delete(ingredientIndex);
      } else {
        checked.add(ingredientIndex);
      }
      return { ...prev, checkedIngredients: Array.from(checked) };
    });
  }, []);

  /* -------- Statistics -------- */
  const stats = useMemo(
    () => ({
      totalFavorites: favorites.length,
      totalCollections: collections.length,
      totalShoppingItems: shoppingList.length,
      uncheckedShoppingItems: shoppingList.filter((item) => !item.checked).length,
      recentViewsCount: recentlyViewed.length,
      searchHistoryCount: searchHistory.length,
    }),
    [favorites, collections, shoppingList, recentlyViewed, searchHistory]
  );

  const value = {
    // Core state
    recipes,
    setRecipes,
    selectedRecipe,
    setSelectedRecipe,
    loading,
    setLoading,
    error,
    setError,

    // Favorites
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,

    // Collections
    collections,
    createCollection,
    deleteCollection,
    addRecipeToCollection,
    removeRecipeFromCollection,
    updateCollection,

    // Recently Viewed
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,

    // Shopping List
    shoppingList,
    addToShoppingList,
    removeFromShoppingList,
    toggleShoppingListItem,
    clearShoppingList,
    clearCheckedItems,

    // Search History
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
    removeFromSearchHistory,

    // Cooking Mode
    cookingMode,
    startCookingMode,
    exitCookingMode,
    toggleCookingStep,
    toggleCookingIngredient,

    // Statistics
    stats,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}

/* -------- Custom Hook -------- */
export function useRecipe() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error(
      'useRecipe must be used inside RecipeProvider'
    );
  }
  return context;
}