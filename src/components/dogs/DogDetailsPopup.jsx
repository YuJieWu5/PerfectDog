'use client'

import PopupWindow from '../common/PopupWindow';
import FavoriteButton from './FavoriteButton';

/**
 * DogDetailsPopup component for displaying detailed dog information in a popup
 * 
 * @param {Object} props - Component props
 * @param {Object} props.dog - Dog data to display
 * @param {boolean} props.isOpen - Whether the popup is open
 * @param {Function} props.onClose - Function to close the popup
 * @param {boolean} props.isFavorite - Whether the dog is a favorite
 * @param {Function} props.toggleFavorite - Function to toggle favorite status
 * @returns {JSX.Element} - Dog details popup component
 */
export default function DogDetailsPopup({ 
  dog, 
  isOpen, 
  onClose, 
  isFavorite, 
  toggleFavorite 
}) {
  if (!dog) return null;

  return (
    <PopupWindow
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={dog.name}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-1/2 relative">
          <img 
            src={dog.img} 
            alt={`${dog.name} - ${dog.breed}`}
            className="w-full h-auto object-cover rounded-lg shadow-md max-h-96"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://place-puppy.com/300x300';
            }}
          />
          <div className="absolute top-2 right-2">
            <FavoriteButton 
              isFavorite={isFavorite} 
              toggleFavorite={() => toggleFavorite(dog.id)} 
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{dog.name}</h3>
          <p className="text-lg text-gray-700 mb-4">{dog.breed}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="block text-sm text-gray-500">Age</span>
              <span className="block text-lg font-medium">{dog.age} {dog.age === 1 ? 'year' : 'years'}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="block text-sm text-gray-500">Location</span>
              <span className="block text-lg font-medium">{dog.zip_code}</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <span className="block text-sm text-gray-500 mb-1">Dog ID</span>
            <span className="block text-sm font-mono bg-gray-100 p-2 rounded overflow-x-auto">
              {dog.id}
            </span>
          </div>
          
          <p className="text-gray-600">
            {dog.name} is a {dog.age}-year-old {dog.breed} located in the {dog.zip_code} area.
            {isFavorite 
              ? ' This dog is in your favorites list.'
              : ' Add this dog to your favorites to find a potential match!'}
          </p>
        </div>
      </div>
    </PopupWindow>
  );
}
