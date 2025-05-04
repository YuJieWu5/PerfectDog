'use client'

/**
 * BreedSelector component for selecting dog breeds
 * 
 * @param {Object} props - Component props
 * @param {Array} props.breeds - Array of available breeds
 * @param {Array} props.selectedBreeds - Array of selected breeds
 * @param {Function} props.toggleBreedSelection - Function to toggle breed selection
 * @param {Function} props.handleApplyBreedSelection - Function to apply breed selection
 * @param {Function} props.getSelectedBreedsText - Function to get text for selected breeds
 * @param {boolean} props.isOpen - Whether the dropdown is open
 * @param {Function} props.toggle - Function to toggle dropdown
 * @param {Object} props.dropdownRef - Ref for dropdown element
 * @returns {JSX.Element} - Breed selector component
 */
export default function BreedSelector({ 
  breeds, 
  selectedBreeds, 
  toggleBreedSelection, 
  handleApplyBreedSelection, 
  getSelectedBreedsText, 
  isOpen, 
  toggle, 
  dropdownRef 
}) {
  return (
    <div className="w-full md:w-64">
      <label htmlFor="breed-dropdown" className="block text-sm font-medium text-gray-700 mb-1">
        Dog Breeds
      </label>
      <div className="relative inline-block text-left w-full" ref={dropdownRef}>
        <div>
          <button 
            type="button" 
            id="breed-dropdown"
            className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" 
            aria-expanded={isOpen} 
            aria-haspopup="true"
            onClick={toggle}
          >
            {getSelectedBreedsText()}
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="absolute left-0 z-50 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="breed-dropdown" tabIndex="-1">
            <div className="max-h-60 overflow-y-auto py-1" role="none">
              {breeds.map((breed, index) => (
                <div 
                  key={index} 
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => toggleBreedSelection(breed)}
                >
                  <input
                    type="checkbox"
                    id={`breed-${index}`}
                    checked={selectedBreeds.includes(breed)}
                    onChange={() => {}}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`breed-${index}`} className="ml-2 block text-sm text-gray-700 cursor-pointer">
                    {breed}
                  </label>
                </div>
              ))}
            </div>
            <div className="py-1 border-t border-gray-200">
              <button
                onClick={handleApplyBreedSelection}
                className="w-full text-left block px-4 py-2 text-sm text-primary-600 hover:bg-gray-100"
              >
                Apply ({selectedBreeds.length} selected)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}