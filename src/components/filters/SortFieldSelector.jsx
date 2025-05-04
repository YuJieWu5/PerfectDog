'use client'

/**
 * SortFieldSelector component for selecting how to sort dog results
 * 
 * @param {Object} props - Component props
 * @param {string} props.sortField - Current sort field
 * @param {Function} props.setSortField - Function to set sort field
 * @param {Array} props.sortFields - Array of available sort fields
 * @returns {JSX.Element} - Sort field selector component
 */
export default function SortFieldSelector({ 
  sortField, 
  setSortField, 
  sortFields 
}) {
  return (
    <div className="w-full md:w-auto flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Sort By
      </label>
      <div className="flex space-x-4">
        {sortFields.map((field) => (
          <div className="flex items-center" key={field.id}>
            <input
              id={`sort-${field.id}`}
              name="sort-field"
              type="radio"
              checked={sortField === field.id}
              onChange={() => setSortField(field.id)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <label htmlFor={`sort-${field.id}`} className="ml-2 block text-sm text-gray-700">
              {field.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}