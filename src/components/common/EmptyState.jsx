'use client'

/**
 * EmptyState component for displaying when no results are found
 * 
 * @param {Object} props - Component props
 * @param {Array} props.selectedBreeds - Array of selected breed filters
 * @param {string} props.customMessage - Optional custom message to display
 * @returns {JSX.Element} - Empty state component
 */
export default function EmptyState({ selectedBreeds = [], customMessage = null }) {
  const message = customMessage || (
    selectedBreeds.length > 0
      ? 'No dogs found with the current filters. Try adjusting your search criteria.'  
      : 'Select a breed to see available dogs'
  );

  return (
    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
      <p className="text-gray-500 text-xl text-center px-4">
        {message}
      </p>
    </div>
  );
}