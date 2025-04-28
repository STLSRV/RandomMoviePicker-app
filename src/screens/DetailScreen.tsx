import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, ActivityIndicator, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getMovieTrailer } from '../services/tmdbApi';
import { Movie } from '../types/movie';
import { TMDB_IMAGE_BASE_URL, PRIMARY_COLOR, SECONDARY_COLOR } from '../utils/constants';
import { useFavorite } from '../context/FavoriteContext';

type RootStackParamList = {
  Home: undefined;
  Detail: { movie: Movie };
  Favorite: undefined;
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const DetailScreen: React.FC = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const { movie } = route.params;
  const { favorites, addFavorite } = useFavorite();
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const handleWatchTrailer = async () => {
    setLoadingTrailer(true);
    try {
      const trailerUrl = await getMovieTrailer(movie.id);
      if (trailerUrl) {
        Linking.openURL(trailerUrl);
      } else {
        Alert.alert('Trailer Not Available', 'No trailer found for this movie.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load trailer.');
    }
    setLoadingTrailer(false);
  };

  const handleAddFavorite = () => {
    const exists = favorites.some((fav) => fav.id === movie.id);
    if (exists) {
      Alert.alert('Already in Favorites', 'You have already added this movie.');
      return;
    }
    addFavorite(movie);
    Alert.alert('Success', 'Movie added to your favorites! ❤️');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>

        <TouchableOpacity style={styles.button} onPress={handleWatchTrailer} disabled={loadingTrailer}>
          <Text style={styles.buttonText}>
            {loadingTrailer ? 'Loading...' : '▶️ Watch Trailer'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: SECONDARY_COLOR }]} onPress={handleAddFavorite}>
          <Text style={styles.buttonText}>💖 Add to Favorites</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  rating: {
    fontSize: 18,
    color: '#888',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
