'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

/**
 * Custom hook for managing favorite dogs functionality
 * @returns {Object} - Favorite dogs state and functions
 */
export function useFavorites() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [dogData, setDogData] = useState([]);
  const [isMatchLoading, setIsMatchLoading] = useState(false);
  const [matchedDog, setMatchedDog] = useState(null);

  // Load favorites from localStorage
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/dogs/breeds`, {
          credentials: 'include',
        });
        
        if (response.status !== 200) {
          router.push('/');
          return;
        }
        
        const savedFavorites = localStorage.getItem('favoriteDogs');
        if (savedFavorites) {
          const ids = JSON.parse(savedFavorites);
          setFavoriteIds(ids);
          
          if (ids.length > 0) {
            await fetchDogDetails(ids);
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  // Fetch details for favorite dogs
  const fetchDogDetails = async (dogIds) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/dogs`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dogIds),
          credentials: 'include',
        }
      );
      
      if (response.status === 200) {
        const data = await response.json();
        setDogData(data);
        return data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching dog details:', error);
      return [];
    }
  };

  // Remove a dog from favorites
  const removeFavorite = (dogId) => {
    const updatedFavorites = favoriteIds.filter(id => id !== dogId);
    setFavoriteIds(updatedFavorites);
    localStorage.setItem('favoriteDogs', JSON.stringify(updatedFavorites));

    if (matchedDog && matchedDog.id === dogId) {
      setMatchedDog(null);
    }
    
    // Also update the displayed dog data
    setDogData(prevData => prevData.filter(dog => dog.id !== dogId));
  };

  // Clear all favorites
  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all dogs from your favorites?')) {
      setFavoriteIds([]);
      setDogData([]);
      setMatchedDog(null);
      localStorage.setItem('favoriteDogs', JSON.stringify([]));
    }
  };

  // Find a match using the API
  const findMatch = async () => {
    if (favoriteIds.length === 0) {
      alert("Please add some dogs to your favorites first!");
      return;
    }

    setIsMatchLoading(true);
    
    try {
      // Call the match endpoint with the favorite dog IDs
      const matchResponse = await fetch(
        `${API_BASE_URL}/dogs/match`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(favoriteIds),
          credentials: 'include',
        }
      );
      
      if (matchResponse.status === 200) {
        const matchData = await matchResponse.json();
        
        // Fetch the details of the matched dog
        if (matchData.match) {
          const dogResponse = await fetch(
            `${API_BASE_URL}/dogs`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify([matchData.match]),
              credentials: 'include',
            }
          );
          
          if (dogResponse.status === 200) {
            const dogDetails = await dogResponse.json();
            setMatchedDog(dogDetails[0]);
            return dogDetails[0];
          }
        }
      }
      return null;
    } catch (error) {
      console.error('Error finding match:', error);
      return null;
    } finally {
      setIsMatchLoading(false);
    }
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

  return {
    isLoading,
    favoriteIds,
    dogData,
    isMatchLoading,
    matchedDog,
    fetchDogDetails,
    removeFavorite,
    clearAllFavorites,
    findMatch,
    handleLogout
  };
}