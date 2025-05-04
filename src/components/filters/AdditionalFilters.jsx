'use client'

/**
 * AdditionalFilters component for filtering dogs by age and location
 * 
 * @param {Object} props - Component props
 * @param {Object} props.filters - Current filter values
 * @param {Function} props.handleFilterChange - Function to handle filter changes
 * @param {Function} props.applyBreedSelection - Function to apply filters
 * @param {Array} props.selectedBreeds - Array of selected breeds
 * @returns {JSX.Element} - Additional filters component
 */
export default function AdditionalFilters({ 
  filters, 
  handleFilterChange, 
  applyBreedSelection, 
  selectedBreeds 
}) {
  const handleApplyFilters = () => {
    if (selectedBreeds.length > 0) {
      applyBreedSelection(true);
    }
  };

  return (
    <div className="pt-4 pb-2 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700 mb-1">
            Zip Code
          </label>
          <input
            type="text"
            id="zip-code"
            value={filters.zipCode}
            onChange={handleFilterChange}
            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter zip code"
            style={{padding: "5px"}}
          />
        </div>
        <div>
          <label htmlFor="min-age" className="block text-sm font-medium text-gray-700 mb-1">
            Age Min
          </label>
          <input
            type="number"
            id="min-age"
            min="0"
            value={filters.ageMin}
            onChange={handleFilterChange}
            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Minimum age"
            style={{padding: "5px"}}
          />
        </div>
        <div>
          <label htmlFor="max-age" className="block text-sm font-medium text-gray-700 mb-1">
            Age Max
          </label>
          <input
            type="number"
            id="max-age"
            min="0"
            value={filters.ageMax}
            onChange={handleFilterChange}
            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Maximum age"
            style={{padding: "5px"}}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleApplyFilters}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          disabled={selectedBreeds.length === 0}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}