import React from 'react';
import { Mail, Github, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-gray-200/80 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
              🍳 Recipe Search
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Discover delicious recipes from around the world. Cook with confidence.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-green-500 text-gray-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-green-500 text-gray-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Github"
              >
                <Github size={16} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-green-500 text-gray-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-900 uppercase tracking-wider">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200 hover:translate-x-1 inline-block">
                Browse Recipes
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200 hover:translate-x-1 inline-block">
                Submit Recipe
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200 hover:translate-x-1 inline-block">
                About Us
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200 hover:translate-x-1 inline-block">
                FAQ
              </a>
            </nav>
          </div>

          {/* Legal & Support */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-900 uppercase tracking-wider">
              Legal & Support
            </h4>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200 hover:translate-x-1 inline-block">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200 hover:translate-x-1 inline-block">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200 hover:translate-x-1 inline-block">
                Cookie Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200 hover:translate-x-1 inline-block">
                Contact Support
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              © {currentYear} Recipe Search. Made with <Heart size={14} className="text-red-500 fill-current animate-pulse" /> for food lovers.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors duration-200">
                Accessibility
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors duration-200">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}