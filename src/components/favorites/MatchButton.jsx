'use client'

/**
 * MatchButton component for finding a match
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isLoading - Whether match is currently loading
 * @param {Function} props.findMatch - Function to find a match
 * @returns {JSX.Element} - MatchButton component
 */
export default function MatchButton({ isLoading, findMatch }) {
  return (
    <div className="flex justify-center mb-8">
      <button
        onClick={findMatch}
        disabled={isLoading}
        className="inline-flex items-center mt-3 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Finding Match...
          </>
        ) : (
          'Find Your Perfect Match!'
        )}
      </button>
    </div>
  );
}