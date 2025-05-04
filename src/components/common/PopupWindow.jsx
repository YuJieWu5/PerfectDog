'use client'

/**
 * A reusable popup/modal window component
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the popup is open
 * @param {Function} props.onClose - Function to close the popup
 * @param {React.ReactNode} props.children - Content to display inside the popup
 * @param {string} props.title - Optional title for the popup
 * @param {string} props.size - Size of the popup: 'sm', 'md', 'lg', 'xl' (default: 'md')
 * @returns {JSX.Element|null} - Popup window component or null if closed
 */
export default function PopupWindow({ 
  isOpen, 
  onClose, 
  children, 
  title = null,
  size = 'md'
}) {
  if (!isOpen) return null;

  // Determine max width based on size
  const getSizeClass = () => {
    switch(size) {
      case 'sm': return 'sm:max-w-sm';
      case 'lg': return 'sm:max-w-lg';
      case 'xl': return 'sm:max-w-xl';
      case 'md':
      default: return 'sm:max-w-md';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center" 
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
      onClick={onClose} // Close when clicking the outer container
    >
      <div className="relative pt-4 px-4 text-center">
        {/* Removed full-screen background overlay */}
        
        <div 
          className={`inline-block bg-white rounded-lg text-left overflow-hidden shadow-[2px_3px_10px_rgba(0,0,0,0.2)] transition-all ${getSizeClass()} w-full`}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
        >
          {/* Close button - added gray background */}
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 hover:text-gray-900 rounded-lg text-sm p-3 ml-auto inline-flex items-center"
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          {/* Modal header */}
          {title && (
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {title}
              </h3>
            </div>
          )}

          {/* Modal body */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}