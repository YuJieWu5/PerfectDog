'use client'

import Link from 'next/link';

/**
 * Header component with flexible usage for main app header or section headers
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Header title text
 * @param {boolean} props.isMainHeader - Whether this is the main app header (true) or a section header (false)
 * @param {Array} props.favorites - Array of favorite dog IDs (for nav bar counter)
 * @param {Function} props.handleLogout - Function to handle logout (for main header)
 * @param {Object} props.customLink - Custom link object (optional)
 * @param {Function} props.actionButton - Optional action button config
 * @param {string} props.actionButton.text - Button text
 * @param {Function} props.actionButton.onClick - Button click handler
 * @param {string} props.actionButton.variant - Button style variant: "primary" (primary), "danger" (red), "light" (gray), "outline" (outlined)
 * @returns {JSX.Element} - Header component
 */
export default function Header({ 
  title,
  isMainHeader = true,
  favorites = [], 
  handleLogout = null, 
  customLink = null,
  actionButton = null
}) {
  // Helper to generate button class based on variant
  const getButtonClass = (variant = "primary") => {
    const baseClass = "inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    switch(variant) {
      case "danger":
        return `${baseClass} text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500 border-transparent`;
      case "light":
        return `${baseClass} text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500 border-transparent`;
      case "outline":
        return `${baseClass} text-primary-700 bg-white hover:bg-primary-50 focus:ring-primary-500 border-primary-500`;
      case "outline-danger":
        return `${baseClass} text-red-700 bg-white hover:bg-red-50 focus:ring-red-500 border-red-500`;
      case "primary":
      default:
        return `${baseClass} text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 border-transparent`;
    }
  };

  // Main app header
  if (isMainHeader) {
    return (
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 p-2 rounded-full bg-primary-500 flex items-center justify-center">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" fill="#f5b642" />
                
                <ellipse cx="25" cy="30" rx="15" ry="20" fill="#d49d38" />
                <ellipse cx="75" cy="30" rx="15" ry="20" fill="#d49d38" />
                
                <circle cx="35" cy="40" r="5" fill="#333" />
                <circle cx="65" cy="40" r="5" fill="#333" />
                
                <ellipse cx="50" cy="55" rx="10" ry="7" fill="#333" />
                
                <path d="M 40 65 Q 50 75 60 65" stroke="#333" stroke-width="2" fill="none" />
                
                <ellipse cx="50" cy="70" rx="5" ry="3" fill="#ff6b6b" />
              </svg>
            </div>
            <h1 className="ml-3 text-2xl font-bold text-gray-900">
              {title}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {customLink ? (
              <Link 
                href={customLink.href} 
                className={getButtonClass("primary")}
              >
                {customLink.text}
              </Link>
            ) : (
              <Link 
                href="/favoriteList" 
                className={getButtonClass("primary")}
              >
                Favorites
                {favorites.length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-primary-100 bg-primary-800 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </Link>
            )}
            {handleLogout && (
              <button
                onClick={handleLogout} 
                className={getButtonClass("outline-danger")}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Section header (replacing FavoritesHeader)
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-medium text-gray-900">
        {title}
      </h2>
      
      {actionButton && (
        <button
          onClick={actionButton.onClick}
          className={getButtonClass(actionButton.variant || "danger")}
        >
          {actionButton.text}
        </button>
      )}
    </div>
  );
}