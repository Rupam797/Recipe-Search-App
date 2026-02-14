import React from 'react';

export default function Input({
  className = '',
  error = false,
  ...props
}) {
  const baseStyles =
    'w-full rounded-lg border px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200';

  const stateStyles = error
    ? 'border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-green-500 focus:ring-green-500';

  return (
    <input
      className={`${baseStyles} ${stateStyles} ${className}`}
      {...props}
    />
  );
}
