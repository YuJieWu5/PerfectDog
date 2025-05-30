'use client'

import FavoriteButton from './FavoriteButton';

/**
 * DogCard component for displaying a single dog
 * 
 * @param {Object} props - Component props
 * @param {Object} props.dog - Dog data
 * @param {boolean} props.isFavorite - Whether the dog is favorited
 * @param {Function} props.toggleFavorite - Function to toggle favorite status
 * @param {Function} props.onDogClick - Function to handle dog card clicks
 * @returns {JSX.Element} - Dog card component
 */
export default function DogCard({ dog, isFavorite, toggleFavorite, onDogClick }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg relative">
      {/* Favorite Button */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 right-2 z-10"
      >
        <FavoriteButton 
          isFavorite={isFavorite} 
          toggleFavorite={() => toggleFavorite(dog.id)} 
        />
      </div>

      <div 
        className="cursor-pointer"
        onClick={() => onDogClick && onDogClick(dog)}
      >
        <div className="h-48 w-full relative">
          <img 
            src={dog.img} 
            alt={`${dog.name} - ${dog.breed}`} 
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://place-puppy.com/300x300';
            }}
          />
        </div>
        <div className="px-4 py-4">
          <h3 className="text-lg font-medium text-gray-900">{dog.name}</h3>
          <p className="text-sm text-gray-500">{dog.breed}</p>
          <div className="mt-2 flex justify-between">
            <span className="text-sm text-gray-600">Age: {dog.age} {dog.age === 1 ? 'year' : 'years'}</span>
            <span className="text-sm text-gray-600">Zip: {dog.zip_code}</span>
          </div>
        </div>
      </div>
    </div>
  );
}