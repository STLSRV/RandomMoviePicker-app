import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import { Movie } from '../types/movie';

export type RootStackParamList = {
  Home: undefined;
  Detail: { movie: Movie };
  Favorite: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

