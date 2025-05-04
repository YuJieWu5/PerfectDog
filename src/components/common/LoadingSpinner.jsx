'use client'

/**
 * LoadingSpinner component for displaying a loading indicator
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - Loading message to display
 * @param {boolean} props.fullScreen - Whether to display full screen or in a container
 * @returns {JSX.Element} - Loading spinner component
 */
export default function LoadingSpinner({ message = "Loading...", fullScreen = false }) {
  const spinner = (
    <div className="text-center">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-primary-600" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p className="mt-2 text-gray-700">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {spinner}
      </div>
    );
  }

  return (
    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
      {spinner}
    </div>
  );
}