'use client'

import Link from 'next/link';

/**
 * FavoriteDogList component for displaying favorites in a list view
 * 
 * @param {Object} props - Component props
 * @param {Array} props.dogData - Array of dog data
 * @param {Function} props.removeFavorite - Function to remove a dog from favorites
 * @returns {JSX.Element} - FavoriteDogList component
 */
export default function FavoriteDogList({ dogData, removeFavorite }) {
  if (dogData.length === 0) {
    return (
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-xl mb-4">You have not added any favorite dogs yet</p>
          <Link href="/home" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Find Dogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {dogData.map((dog) => (
          <li key={dog.id}>
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="flex-shrink-0 h-16 w-16 relative">
                <img 
                  src={dog.img} 
                  alt={`${dog.name} - ${dog.breed}`} 
                  className="h-full w-full object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://place-puppy.com/300x300';
                  }}
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">{dog.name}</h3>
                      <p className="ml-2 text-sm text-gray-500">ID: {dog.id.substring(0, 8)}...</p>
                    </div>
                    <p className="text-sm text-gray-500">{dog.breed}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => removeFavorite(dog.id)}
                      className="p-2 rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      aria-label={`Remove ${dog.name} from favorites`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-1 flex items-center">
                  <span className="text-sm text-gray-600 mr-4">Age: {dog.age} {dog.age === 1 ? 'year' : 'years'}</span>
                  <span className="text-sm text-gray-600">Zip: {dog.zip_code}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}