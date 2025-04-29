import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFavorite } from '../context/FavoriteContext';
import { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Detail: { movie: Movie };
  Favorite: undefined;
};

const FavoriteScreen: React.FC = () => {
  const { favorites, removeFavorite } = useFavorite();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRemoveFavorite = (movieId: number) => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this movie from your favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeFavorite(movieId) },
      ]
    );
  };

  const renderItem = ({ item }: { item: Movie }) => (
    <View style={styles.favoriteItem}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => navigation.navigate('Detail', { movie: item })}
      >
        <MovieCard movie={item} />
      </TouchableOpacity>

      {/* ปุ่มลบ */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleRemoveFavorite(item.id)}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorites</Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet. 💔</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#ff6b81',
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
