'use client';

import { useDarkMode } from '@/context/DarkModeContext';

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors"
      aria-label="Toggle theme"
    >
      <span className="text-xl">
        {isDarkMode ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
