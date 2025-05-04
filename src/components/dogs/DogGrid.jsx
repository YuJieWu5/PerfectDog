'use client'

import DogCard from './DogCard';

/**
 * DogGrid component for displaying a grid of dog cards
 * 
 * @param {Object} props - Component props
 * @param {Array} props.dogs - Array of dog objects to display
 * @param {Array} props.favorites - Array of favorite dog IDs
 * @param {Function} props.toggleFavorite - Function to toggle favorite status
 * @returns {JSX.Element} - Dog grid component
 */
export default function DogGrid({ dogs, favorites, toggleFavorite }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dogs.map((dog) => (
        <DogCard 
          key={dog.id} 
          dog={dog} 
          isFavorite={favorites.includes(dog.id)} 
          toggleFavorite={toggleFavorite} 
        />
      ))}
    </div>
  );
}