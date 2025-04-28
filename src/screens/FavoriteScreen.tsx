import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
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
  const { favorites } = useFavorite();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { movie: item })}>
      <MovieCard movie={item} />
    </TouchableOpacity>
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
});
