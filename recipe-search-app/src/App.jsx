import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import Favorites from './pages/Favorites';

import Home from './pages/Home';
import Search from './pages/Search';
import Recipe from './pages/Recipe';

import { RecipeProvider } from './context/RecipeContext';

export default function App() {
  return (
    <RecipeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:id" element={<RecipeDetailsPage />} />
          <Route path="/favorites" element={<Favorites />} />
          {/* Fallback */}
          <Route
            path="*"
            element={
              <div className="flex min-h-screen items-center justify-center text-gray-500">
                Page not found
              </div>
            }
          />
        </Routes>
      </Router>
    </RecipeProvider>
  );
}
