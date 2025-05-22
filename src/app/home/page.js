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
    setSelectedDog(null);
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
              {/* Use DogGrid component */}
              <DogGrid 
                dogs={dogs}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                onDogClick={openDogDetails}
              />
              
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
      
      {/* Use DogDetailsPopup component */}
      <DogDetailsPopup
        dog={selectedDog}
        isOpen={isPopupOpen}
        onClose={closeDogDetails}
        isFavorite={selectedDog ? favorites.includes(selectedDog.id) : false}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}