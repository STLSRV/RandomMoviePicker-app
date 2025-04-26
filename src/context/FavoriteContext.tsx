import React, { createContext, useState, useContext } from 'react';
import { Movie } from '../types/movie';

interface FavoriteContextProps {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
}

const FavoriteContext = createContext<FavoriteContextProps | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const addFavorite = (movie: Movie) => {
    setFavorites(prev => [...prev, movie]);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorite must be used within FavoriteProvider');
  }
  return context;
};
