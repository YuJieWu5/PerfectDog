// 'use client'

// /**
//  * FavoriteButton component for toggling favorite status
//  * 
//  * @param {Object} props - Component props
//  * @param {boolean} props.isFavorite - Whether the dog is favorited
//  * @param {Function} props.toggleFavorite - Function to toggle favorite status
//  * @returns {JSX.Element} - Favorite button component
//  */
// export default function FavoriteButton({ isFavorite, toggleFavorite }) {
//   return (
//     <button
//       onClick={toggleFavorite}
//       className="absolute top-2 right-2 h-10 w-10 rounded-full bg-gray-200 bg-opacity-70 flex items-center justify-center z-10 hover:bg-gray-300 transition-colors duration-200"
//       aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6"
//         fill={isFavorite ? "currentColor" : "none"}
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//         style={{ color: isFavorite ? "#ef4444" : "#6b7280" }}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//         />
//       </svg>
//     </button>
//   );
// }

'use client'

/**
 * FavoriteButton component for toggling favorite status
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isFavorite - Whether the dog is favorited
 * @param {Function} props.toggleFavorite - Function to toggle favorite status
 * @returns {JSX.Element} - Favorite button component
 */
export default function FavoriteButton({ isFavorite, toggleFavorite }) {
  const handleClick = (e) => {
    // Prevent click from propagating to parent elements (like the card)
    e.stopPropagation();
    toggleFavorite();
  };
  
  return (
    <button
      onClick={handleClick}
      className="h-10 w-10 rounded-full bg-gray-200 bg-opacity-70 flex items-center justify-center z-10 hover:bg-gray-300 transition-colors duration-200"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill={isFavorite ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        style={{ color: isFavorite ? "#ef4444" : "#6b7280" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}