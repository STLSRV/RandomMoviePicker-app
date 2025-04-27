import axios from 'axios';
import { TMDB_BASE_URL } from '../utils/constants';
import { Movie } from '../types/movie';
import { TMDB_API_KEY } from '@env';

const API_KEY = TMDB_API_KEY;

export const getRandomMovie = async (): Promise<Movie> => {
  const page = Math.floor(Math.random() * 10) + 1;
  const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY, page },
  });
  const movies = response.data.results;
  return movies[Math.floor(Math.random() * movies.length)];
};

export const getMovieTrailer = async (movieId: number) => {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/videos`, {
    params: { api_key: API_KEY },
  });
  const trailer = response.data.results.find((vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube');
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
};
