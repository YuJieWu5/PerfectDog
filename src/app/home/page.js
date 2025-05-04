'use client'

import { useState } from 'react';
import { useDogSearch } from '@/hooks/useDogSearch';
import { useToggle } from '@/hooks/useToggle';
import { SORT_FIELDS, SORT_ORDERS } from '@/constants/searchOptions';

// Common components
import Header from '@/components/common/Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import Pagination from '@/components/common/Pagination';
import PopupWindow from '@/components/common/PopupWindow';

// Dog components
import DogGrid from '@/components/dogs/DogGrid';
import DogDetailsPopup from '@/components/dogs/DogDetailsPopup';

// Filter components 
import BreedSelector from '@/components/filters/BreedSelector';
import SortFieldSelector from '@/components/filters/SortFieldSelector';
import SortOrderSelector from '@/components/filters/SortOrderSelector';
import AdditionalFilters from '@/components/filters/AdditionalFilters';

export default function Home() {
  // Custom hooks
  const {
    isLoading,
    breeds,
    selectedBreeds,
    dogs,
    searchLoading,
    favorites,
    filters,
    sortConfig,
    pagination,
    searchDogs,
    toggleBreedSelection,
    applyBreedSelection,
    handleFilterChange,
    resetFilters,
    setSortField,
    setSortOrder,
    goToNextPage,
    goToPreviousPage,
    toggleFavorite,
    handleLogout,
    getSelectedBreedsText
  } = useDogSearch();

  // Toggle state for dropdowns and filters
  const breedDropdown = useToggle(false);
  const sortDropdown = useToggle(false);
  const filterSection = useToggle(false);
  
  // State for dog details popup
  const [selectedDog, setSelectedDog] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // Function to open popup with selected dog
  const openDogDetails = (dog) => {
    setSelectedDog(dog);
    setIsPopupOpen(true);
  };
  
  // Function to close popup
  const closeDogDetails = () => {
    setIsPopupOpen(false);
  };

  // Apply breed selection and close dropdown
  const handleApplyBreedSelection = () => {
    breedDropdown.close();
    applyBreedSelection(true);
  };

  // Handle sort order selection
  const handleSortOrderSelection = (order) => {
    setSortOrder(order);
    sortDropdown.close();
  };

  // Toggle filter section
  const handleToggleFilter = () => {
    if (filterSection.isOpen) {
      resetFilters();
      
      // If breeds are selected, re-search with just the breeds
      if (selectedBreeds.length > 0) {
        searchDogs({ includeFilters: false });
      }
    }
    
    filterSection.toggle();
  };

  // Generate the title for the section header based on selected breeds
  const getResultsTitle = () => {
    if (selectedBreeds.length > 0) {
      return `Showing dogs of breed${selectedBreeds.length > 1 ? 's' : ''}: ${selectedBreeds.join(', ')}${pagination.totalResults > 0 ? ` (${pagination.totalResults} results)` : ''}`;
    }
    return 'Select a breed to filter dogs';
  };

  // Loading state
  if (isLoading) {
    return <LoadingSpinner message="Loading..." fullScreen={true} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main App Header */}
      <Header 
        title="Find Your Perfect Dog"
        isMainHeader={true}
        favorites={favorites} 
        handleLogout={handleLogout} 
      />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Search and Filter Controls */}
        <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
          <div className="mb-4">
            {/* Top row with Breed and Sort Order */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              {/* Breed Selection */}
              <BreedSelector 
                breeds={breeds}
                selectedBreeds={selectedBreeds}
                toggleBreedSelection={toggleBreedSelection}
                handleApplyBreedSelection={handleApplyBreedSelection}
                getSelectedBreedsText={getSelectedBreedsText}
                isOpen={breedDropdown.isOpen}
                toggle={breedDropdown.toggle}
                dropdownRef={breedDropdown.ref}
              />

              {/* Sort Field Radio Buttons */}
              <SortFieldSelector 
                sortField={sortConfig.field}
                setSortField={setSortField}
                sortFields={SORT_FIELDS}
              />

              {/* Sort Order Dropdown */}
              <SortOrderSelector
                sortField={sortConfig.field}
                sortOrder={sortConfig.order}
                handleSortOrderSelection={handleSortOrderSelection}
                isOpen={sortDropdown.isOpen}
                toggle={sortDropdown.toggle}
                dropdownRef={sortDropdown.ref}
                sortOrders={SORT_ORDERS}
              />
            </div>
            
            {/* Additional Filters toggle */}
            <div className="flex justify-end mt-4">
              <button 
                onClick={handleToggleFilter}
                className="text-primary-600 hover:text-primary-800 text-sm font-medium transition-colors duration-200"
              >
                {filterSection.isOpen ? 'Close Filters' : 'Additional Filters'}
              </button>
            </div>
          </div>

          {/* Additional Filter Section */}
          {filterSection.isOpen && (
            <AdditionalFilters 
              filters={filters}
              handleFilterChange={handleFilterChange}
              applyBreedSelection={applyBreedSelection}
              selectedBreeds={selectedBreeds}
            />
          )}
        </div>

        {/* Results Section */}
        <div className="px-4 py-6 sm:px-0">
          {/* Results Section Header */}
          <Header
            title={getResultsTitle()}
            isMainHeader={false}
          />
          
          {searchLoading ? (
            <LoadingSpinner message="Searching for dogs..." />
          ) : dogs.length > 0 ? (
            <>
              {/* Pass openDogDetails to make cards clickable */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dogs.map((dog) => (
                  <div 
                    key={dog.id} 
                    className="bg-white overflow-hidden shadow rounded-lg relative cursor-pointer"
                    onClick={() => openDogDetails(dog)}
                  >
                    {/* Favorite Button */}
                    <div onClick={(e) => e.stopPropagation()} className="absolute top-2 right-2 z-10">
                      <button
                        onClick={() => toggleFavorite(dog.id)}
                        className="h-10 w-10 rounded-full bg-gray-200 bg-opacity-70 flex items-center justify-center z-10 hover:bg-gray-300 transition-colors duration-200"
                        aria-label={favorites.includes(dog.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill={favorites.includes(dog.id) ? "currentColor" : "none"}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          style={{ color: favorites.includes(dog.id) ? "#ef4444" : "#6b7280" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="h-48 w-full relative">
                      <img 
                        src={dog.img} 
                        alt={`${dog.name} - ${dog.breed}`} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://place-puppy.com/300x300';
                        }}
                      />
                    </div>
                    <div className="px-4 py-4">
                      <h3 className="text-lg font-medium text-gray-900">{dog.name}</h3>
                      <p className="text-sm text-gray-500">{dog.breed}</p>
                      <div className="mt-2 flex justify-between">
                        <span className="text-sm text-gray-600">Age: {dog.age} {dog.age === 1 ? 'year' : 'years'}</span>
                        <span className="text-sm text-gray-600">Zip: {dog.zip_code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {pagination.totalResults > 0 && (
                <Pagination 
                  pagination={pagination}
                  goToNextPage={goToNextPage}
                  goToPreviousPage={goToPreviousPage}
                />
              )}
            </>
          ) : (
            <EmptyState 
              selectedBreeds={selectedBreeds} 
            />
          )}
        </div>
      </main>
      
      {/* Dog Details Popup */}
      {selectedDog && (
        <PopupWindow
          isOpen={isPopupOpen}
          onClose={closeDogDetails}
          size="lg"
          title={selectedDog.name}
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative">
              <img 
                src={selectedDog.img} 
                alt={`${selectedDog.name} - ${selectedDog.breed}`}
                className="w-full h-auto object-cover rounded-lg shadow-md max-h-96"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://place-puppy.com/300x300';
                }}
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => toggleFavorite(selectedDog.id)}
                  className="h-10 w-10 rounded-full bg-gray-200 bg-opacity-70 flex items-center justify-center z-10 hover:bg-gray-300 transition-colors duration-200"
                  aria-label={favorites.includes(selectedDog.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill={favorites.includes(selectedDog.id) ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ color: favorites.includes(selectedDog.id) ? "#ef4444" : "#6b7280" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedDog.name}</h3>
              <p className="text-lg text-gray-700 mb-4">{selectedDog.breed}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="block text-sm text-gray-500">Age</span>
                  <span className="block text-lg font-medium">{selectedDog.age} {selectedDog.age === 1 ? 'year' : 'years'}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="block text-sm text-gray-500">Location</span>
                  <span className="block text-lg font-medium">{selectedDog.zip_code}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <span className="block text-sm text-gray-500 mb-1">Dog ID</span>
                <span className="block text-sm font-mono bg-gray-100 p-2 rounded overflow-x-auto">
                  {selectedDog.id}
                </span>
              </div>
              
              <p className="text-gray-600 italic">
                {selectedDog.name} is a {selectedDog.age}-year-old {selectedDog.breed} located in the {selectedDog.zip_code} area.
                {favorites.includes(selectedDog.id) 
                  ? ' This dog is in your favorites list.'
                  : ' Add this dog to your favorites to find a potential match!'}
              </p>
            </div>
          </div>
        </PopupWindow>
      )}
    </div>
  );
}