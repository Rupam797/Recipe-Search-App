import React from 'react';

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Spinner */}
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />

      {/* Text */}
      <p className="mt-3 text-sm font-medium text-gray-600">
        {text}
      </p>
    </div>
  );
}
