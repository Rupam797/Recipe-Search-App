import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for dynamic header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const linkClass = ({ isActive }) =>
    `relative transition-all duration-300 ${
      isActive
        ? 'text-green-600 font-semibold'
        : 'text-gray-700 hover:text-green-600'
    }`;

  const activeLinkIndicator = ({ isActive }) =>
    isActive ? (
      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></span>
    ) : null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Enhanced */}
            <Link
              to="/"
              className="group flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-green-600 transition-colors duration-300"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                🍳
              </span>
              <span className="hidden sm:inline">Quick Recipe Search</span>
              <span className="sm:hidden">Recipes</span>
            </Link>

            {/* Desktop Navigation - Enhanced */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink to="/" className="relative px-4 py-2 rounded-lg hover:bg-green-50 transition-all duration-300">
                {({ isActive }) => (
                  <>
                    <span className={linkClass({ isActive })}>Home</span>
                    {activeLinkIndicator({ isActive })}
                  </>
                )}
              </NavLink>
              <NavLink to="/search" className="relative px-4 py-2 rounded-lg hover:bg-green-50 transition-all duration-300">
                {({ isActive }) => (
                  <>
                    <span className={linkClass({ isActive })}>Search</span>
                    {activeLinkIndicator({ isActive })}
                  </>
                )}
              </NavLink>
              <NavLink to="/favorites" className="relative px-4 py-2 rounded-lg hover:bg-green-50 transition-all duration-300">
                {({ isActive }) => (
                  <>
                    <span className={`${linkClass({ isActive })} flex items-center gap-1.5`}>
                      <span>Favorites</span>
                      <span className={isActive ? 'animate-pulse' : ''}>❤️</span>
                    </span>
                    {activeLinkIndicator({ isActive })}
                  </>
                )}
              </NavLink>
            </nav>

            {/* CTA Button - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/search"
                className="px-5 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Toggle Menu"
              aria-expanded={open}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                    open ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                    open ? 'opacity-0' : ''
                  }`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                    open ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Mobile Menu - Enhanced Slide-in */}
      <div
        className={`fixed top-16 right-0 bottom-0 w-72 bg-white shadow-2xl z-40 md:hidden transform transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col p-6 gap-2">
          {/* Mobile Nav Links */}
          <MobileNavLink to="/" onClick={() => setOpen(false)}>
            <span className="text-xl">🏠</span>
            <span>Home</span>
          </MobileNavLink>
          
          <MobileNavLink to="/search" onClick={() => setOpen(false)}>
            <span className="text-xl">🔍</span>
            <span>Search Recipes</span>
          </MobileNavLink>
          
          <MobileNavLink to="/favorites" onClick={() => setOpen(false)}>
            <span className="text-xl">❤️</span>
            <span>My Favorites</span>
          </MobileNavLink>

          {/* Divider */}
          <div className="my-4 border-t border-gray-200"></div>

          {/* CTA in Mobile Menu */}
          <Link
            to="/search"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Get Started</span>
            <span>→</span>
          </Link>

          {/* Footer Info */}
          <div className="mt-auto pt-6 text-center">
            <p className="text-xs text-gray-500">
              Discover thousands of recipes
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Free • No Login Required
            </p>
          </div>
        </nav>
      </div>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16"></div>
    </>
  );
}

/* ---------- Mobile Nav Link Component ---------- */
function MobileNavLink({ to, onClick, children }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 font-semibold shadow-sm'
            : 'text-gray-700 hover:bg-gray-50'
        }`
      }
    >
      {children}
    </NavLink>
  );
}