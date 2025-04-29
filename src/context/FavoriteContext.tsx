import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../types/movie';

type FavoriteContextType = {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
};

const STORAGE_KEY = 'favorites';

const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const useFavorite = () => useContext(FavoriteContext);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Error loading favorites from storage', e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (e) {
        console.error('Error saving favorites to storage', e);
      }
    })();
  }, [favorites]);

  const addFavorite = (movie: Movie) => {
    const exists = favorites.some((fav) => fav.id === movie.id);
    if (exists) {
      Alert.alert('Already in Favorites', 'You have already added this movie.');
      return;
    }
    setFavorites((prev) => [...prev, movie]);
    Alert.alert('Success', 'Movie added to your favorites! ❤️');
  };

  const removeFavorite = (movieId: number) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== movieId));
    Alert.alert('Removed', 'Movie removed from your favorites.');
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
