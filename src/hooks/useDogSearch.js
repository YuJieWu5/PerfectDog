'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL, DOGS_PER_PAGE } from '../constants/searchOptions';

/**
 * Custom hook for dog search functionality
 * @returns {Object} - Dog search state and functions
 */
export function useDogSearch() {
  const router = useRouter();
  
  // Core state
  const [isLoading, setIsLoading] = useState(true);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  // Filter state
  const [filters, setFilters] = useState({
    zipCode: '',
    ageMin: '',
    ageMax: ''
  });
  
  // Sort state
  const [sortConfig, setSortConfig] = useState({
    field: 'breed',
    order: 'asc'
  });
  
  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalResults: 0,
    nextCursor: null,
    prevCursor: null,
    isLastPage: false
  });
  
  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteDogs');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);
  
  // Authentication check and load breeds
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/dogs/breeds`, {
          credentials: 'include',
        });
        
        if (response.status !== 200) {
          localStorage.removeItem('favoriteDogs');
          router.push('/');
        } else {
          const data = await response.json();
          // Sort the breeds alphabetically
          const sortedBreeds = data.sort((a, b) => a.localeCompare(b));
          setBreeds(sortedBreeds);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);
  
  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    
    setFilters(prev => ({
      ...prev,
      [id === 'zip-code' ? 'zipCode' : id === 'min-age' ? 'ageMin' : 'ageMax']: value
    }));
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      zipCode: '',
      ageMin: '',
      ageMax: ''
    });
  };
  
  // Search for dogs
  const searchDogs = async (options = {}) => {
    const { 
      breeds = selectedBreeds,
      fromCursor = null, 
      field = sortConfig.field, 
      order = sortConfig.order, 
      includeFilters = true
    } = options;
    
    if (!breeds || breeds.length === 0) return;
    
    setSearchLoading(true);
    
    try {
      let url;
      
      if (fromCursor) {
        url = `${API_BASE_URL}${fromCursor}`;
      } else {
        // Create new search query
        const queryParams = new URLSearchParams();
        
        // Add all selected breeds
        breeds.forEach(breed => {
          queryParams.append('breeds', breed);
        });
        
        // Set sort field and order
        queryParams.append('sort', `${field}:${order}`);
        queryParams.append('size', DOGS_PER_PAGE.toString());
        
        if (includeFilters) {
          const { zipCode, ageMin, ageMax } = filters;
          
          if (zipCode.trim()) {
            queryParams.append('zipCodes', zipCode.trim());
          }
          
          if (ageMin.trim()) {
            queryParams.append('ageMin', ageMin.trim());
          }
          
          if (ageMax.trim()) {
            queryParams.append('ageMax', ageMax.trim());
          }
        }
        
        url = `${API_BASE_URL}/dogs/search?${queryParams.toString()}`;
      }
      
      const searchResponse = await fetch(url, { credentials: 'include' });
      
      if (searchResponse.status === 200) {
        const searchData = await searchResponse.json();
        
        // Update pagination info
        setPagination(prev => {
          const newPage = fromCursor ? prev.currentPage : 1;
          return {
            currentPage: newPage,
            totalResults: searchData.total,
            nextCursor: searchData.next || null,
            prevCursor: searchData.prev || null,
            isLastPage: (newPage * DOGS_PER_PAGE >= searchData.total)
          };
        });
        
        if (searchData.resultIds && searchData.resultIds.length > 0) {
          // Fetch the actual dog details using the IDs
          const dogsResponse = await fetch(
            `${API_BASE_URL}/dogs`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(searchData.resultIds),
              credentials: 'include',
            }
          );
          
          if (dogsResponse.status === 200) {
            const dogsData = await dogsResponse.json();
            setDogs(dogsData);
          }
        } else {
          setDogs([]);
        }
      }
    } catch (error) {
      console.error('Error searching dogs:', error);
    } finally {
      setSearchLoading(false);
    }
  };
  
  // Handle breed selection
  const toggleBreedSelection = (breed) => {
    setSelectedBreeds(prev => {
      // If already selected, remove it
      if (prev.includes(breed)) {
        return prev.filter(b => b !== breed);
      } 
      // Otherwise add it
      else {
        return [...prev, breed];
      }
    });
  };
  
  // Apply breed selection and search
  const applyBreedSelection = (includeFilters = true) => {
    if (selectedBreeds.length > 0) {
      searchDogs({ includeFilters });
    }
  };
  
  // Handle sort field change
  const setSortField = (field) => {
    setSortConfig(prev => ({ ...prev, field }));
    
    // Re-search with the new sort field if breeds are selected
    if (selectedBreeds.length > 0) {
      searchDogs({ field });
    }
  };
  
  // Handle sort order change
  const setSortOrder = (order) => {
    setSortConfig(prev => ({ ...prev, order }));
    
    // Re-search with the new sort order if breeds are selected
    if (selectedBreeds.length > 0) {
      searchDogs({ order });
    }
  };
  
  // Pagination handlers
  const goToNextPage = () => {
    if (pagination.nextCursor) {
      setPagination(prev => ({
        ...prev,
        currentPage: prev.currentPage + 1
      }));
      searchDogs({ fromCursor: pagination.nextCursor });
    }
  };
  
  const goToPreviousPage = () => {
    if (pagination.prevCursor) {
      setPagination(prev => ({
        ...prev,
        currentPage: prev.currentPage - 1
      }));
      searchDogs({ fromCursor: pagination.prevCursor });
    }
  };
  
  // Toggle favorite status for a dog
  const toggleFavorite = (dogId) => {
    let newFavorites;
    if (favorites.includes(dogId)) {
      // Remove from favorites
      newFavorites = favorites.filter(id => id !== dogId);
    } else {
      // Add to favorites
      newFavorites = [...favorites, dogId];
    }
    
    // Update state and localStorage
    setFavorites(newFavorites);
    localStorage.setItem('favoriteDogs', JSON.stringify(newFavorites));
  };
  
  // Logout functionality
  const handleLogout = async () => {
    try {
      // Clear favorites from localStorage
      localStorage.removeItem('favoriteDogs');
      
      // Call the logout API
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // Helper functions
  const getSelectedBreedsText = () => {
    if (selectedBreeds.length === 0) return "Select Breeds";
    if (selectedBreeds.length === 1) return selectedBreeds[0];
    return `${selectedBreeds.length} breeds selected`;
  };
  
  return {
    // State
    isLoading,
    breeds,
    selectedBreeds,
    dogs,
    searchLoading,
    favorites,
    filters,
    sortConfig,
    pagination,
    
    // Actions
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
    
    // Helpers
    getSelectedBreedsText
  };
}