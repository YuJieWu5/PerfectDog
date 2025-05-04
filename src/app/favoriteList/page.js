'use client'

import { useFavorites } from '@/hooks/useFavorites';
import Link from 'next/link';

// Common components
import Header from '@/components/common/Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Dog components
import FavoriteDogList from '@/components/favorites/FavoriteDogList';
import MatchedDogCard from '@/components/favorites/MatchedDogCard';

// Favorites components
import MatchButton from '@/components/favorites/MatchButton';

export default function FavoriteList() {
  const {
    isLoading,
    favoriteIds,
    dogData,
    isMatchLoading,
    matchedDog,
    removeFavorite,
    clearAllFavorites,
    findMatch,
    handleLogout
  } = useFavorites();

  if (isLoading) {
    return <LoadingSpinner message="Loading your favorites..." fullScreen={true} />;
  }

  // Generate the title for the section header based on the dog count
  const getSectionTitle = () => {
    if (dogData.length === 0) {
      return 'You have no favorite dogs yet';
    }
    return `You have ${dogData.length} favorite ${dogData.length === 1 ? 'dog' : 'dogs'}`;
  };

  // Action button configuration for the section header (Clear All button)
  const actionButton = dogData.length > 0 ? {
    text: 'Clear All',
    onClick: clearAllFavorites,
    variant: 'danger'
  } : null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main App Header */}
      <Header 
        title="My Favorite Dogs" 
        isMainHeader={true}
        handleLogout={handleLogout} 
        customLink={{
          href: "/home",
          text: "Search Dogs"
        }}
      />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Section Header (previously FavoritesHeader) */}
          <Header
            title={getSectionTitle()}
            isMainHeader={false}
            actionButton={actionButton}
          />

          <FavoriteDogList 
            dogData={dogData} 
            removeFavorite={removeFavorite} 
          />

          {dogData.length > 0 && (
            <MatchButton 
              isLoading={isMatchLoading} 
              findMatch={findMatch} 
            />
          )}

          {matchedDog && (
            <MatchedDogCard dog={matchedDog} />
          )}
        </div>
      </main>
    </div>
  );
}