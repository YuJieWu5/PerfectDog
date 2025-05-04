'use client'

/**
 * SortOrderSelector component for selecting sort order
 * 
 * @param {Object} props - Component props
 * @param {string} props.sortField - Current sort field
 * @param {string} props.sortOrder - Current sort order
 * @param {Function} props.handleSortOrderSelection - Function to handle sort order selection
 * @param {boolean} props.isOpen - Whether the dropdown is open
 * @param {Function} props.toggle - Function to toggle dropdown
 * @param {Object} props.dropdownRef - Ref for dropdown element
 * @param {Array} props.sortOrders - Array of available sort orders
 * @returns {JSX.Element} - Sort order selector component
 */
export default function SortOrderSelector({ 
  sortField, 
  sortOrder, 
  handleSortOrderSelection, 
  isOpen, 
  toggle, 
  dropdownRef, 
  sortOrders 
}) {
  // Get display text for sort order
  const getSortOrderDisplay = () => {
    const currentOrder = sortOrders.find(order => order.id === sortOrder);
    return currentOrder.display(sortField);
  };

  return (
    <div className="w-full md:w-36">
      <label htmlFor="sort-dropdown" className="block text-sm font-medium text-gray-700 mb-1">
        Sort Order
      </label>
      <div className="relative inline-block text-left w-full" ref={dropdownRef}>
        <div>
          <button 
            type="button" 
            id="sort-dropdown"
            className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" 
            aria-expanded={isOpen} 
            aria-haspopup="true"
            onClick={toggle}
          >
            {getSortOrderDisplay()}
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="absolute right-0 z-50 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="sort-dropdown" tabIndex="-1">
            <div className="py-1" role="none">
              {sortOrders.map((order) => (
                <button 
                  key={order.id}
                  className={`${sortOrder === order.id ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100 block w-full text-left px-4 py-2 text-sm`}
                  onClick={() => handleSortOrderSelection(order.id)}
                >
                  {order.display(sortField)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}