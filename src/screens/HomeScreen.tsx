import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getRandomMovie } from '../services/tmdbApi';
import { Movie } from '../types/movie';
import { useFavorite } from '../context/FavoriteContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { addFavorite } = useFavorite();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomMovie = async () => {
    try {
      setLoading(true);
      const randomMovie = await getRandomMovie();
      setMovie(randomMovie);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ปุ่มไป Favorites */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => navigation.navigate('Favorite')}
      >
        <Text style={styles.favoriteButtonText}>❤️ Favorites</Text>
      </TouchableOpacity>

      {/* ปุ่มสุ่มหนัง */}
      <TouchableOpacity
        style={styles.randomButton}
        onPress={fetchRandomMovie}
      >
        <Text style={styles.randomButtonText}>🎲 Random Movie</Text>
      </TouchableOpacity>

      {/* กำลังโหลด */}
      {loading && <ActivityIndicator size="large" color="#ff6b81" style={{ marginTop: 20 }} />}

      {/* แสดงหนังที่สุ่มได้ */}
      {movie && (
        <TouchableOpacity
          style={styles.movieContainer}
          onPress={() => navigation.navigate('Detail', { movie })}
        >
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.poster} />
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
          <Text style={styles.overview} numberOfLines={3}>
            {movie.overview}
          </Text>

        
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    flexGrow: 1,
  },
  favoriteButton: {
    backgroundColor: '#ff6b81',
    padding: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  favoriteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  randomButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  randomButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  movieContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
  },
  rating: {
    fontSize: 16,
    color: '#999',
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  addFavoriteButton: {
    backgroundColor: '#ff6b81',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addFavoriteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
