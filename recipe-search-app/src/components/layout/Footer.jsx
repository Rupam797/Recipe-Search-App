import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <small className="text-sm text-gray-500">
          © {new Date().getFullYear()} Recipe Search. All rights reserved.
        </small>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <a href="#" className="hover:text-green-600 transition">
            Privacy
          </a>
          <a href="#" className="hover:text-green-600 transition">
            Terms
          </a>
          <a href="#" className="hover:text-green-600 transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
