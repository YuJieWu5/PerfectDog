'use client'

/**
 * Pagination component for navigating through search results
 * 
 * @param {Object} props - Component props
 * @param {Object} props.pagination - Pagination state
 * @param {Function} props.goToNextPage - Function to go to next page
 * @param {Function} props.goToPreviousPage - Function to go to previous page
 * @returns {JSX.Element} - Pagination component
 */
export default function Pagination({ 
  pagination, 
  goToNextPage, 
  goToPreviousPage 
}) {
  const { prevCursor, nextCursor, isLastPage } = pagination;
  
  return (
    <div className="flex items-center justify-center mt-6">
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button
          onClick={goToPreviousPage}
          disabled={!prevCursor}
          className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${!prevCursor ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <span className="sr-only">Previous</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
        </button>
        
        <button
          onClick={goToNextPage}
          disabled={!nextCursor || isLastPage}
          className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${!nextCursor || isLastPage ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <span className="sr-only">Next</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  );
}