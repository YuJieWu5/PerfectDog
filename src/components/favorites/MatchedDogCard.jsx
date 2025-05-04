'use client'

/**
 * MatchedDogCard component for displaying the matched dog
 * 
 * @param {Object} props - Component props
 * @param {Object} props.dog - Dog data for the match
 * @returns {JSX.Element} - MatchedDogCard component
 */
export default function MatchedDogCard({ dog }) {
  if (!dog) return null;
  
  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Matching Result</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex items-center">
          <div className="h-24 w-24 relative mr-6">
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
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Meet {dog.name}!
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {dog.breed}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Age:</span> {dog.age} {dog.age === 1 ? 'year' : 'years'}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">ID:</span> {dog.id}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Zip Code:</span> {dog.zip_code}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-700">
                Congratulations! {dog.name} has been matched with you based on your preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}