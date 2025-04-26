import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Movie } from '../types/movie';
import { TMDB_IMAGE_BASE_URL } from '../utils/constants';

interface Props {
  movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
        <Text style={styles.overview} numberOfLines={3}>{movie.overview}</Text>
      </View>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    width: 300,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 400,
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  rating: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
    color: '#555',
  },
});
