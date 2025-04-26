import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { getRandomMovie } from '../services/tmdbApi';
import { Movie } from '../types/movie';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TMDB_IMAGE_BASE_URL, PRIMARY_COLOR } from '../utils/constants';
import MovieCard from '../components/MovieCard';

type RootStackParamList = {
  Home: undefined;
  Detail: { movie: Movie };
  Favorite: undefined;
};

const HomeScreen: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRandomMovie = async () => {
    setLoading(true);
    try {
      const randomMovie = await getRandomMovie();
      setMovie(randomMovie);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleMoviePress = () => {
    if (movie) {
      navigation.navigate('Detail', { movie });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Discover a Movie</Text>

      <TouchableOpacity style={styles.button} onPress={handleRandomMovie}>
        <Text style={styles.buttonText}>🎲 Random Movie</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color={PRIMARY_COLOR} style={{ marginTop: 20 }} />}

      {movie && !loading && (
        <TouchableOpacity onPress={handleMoviePress}>
          <MovieCard movie={movie} />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
