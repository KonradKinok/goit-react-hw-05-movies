import axios, { AxiosResponse } from "axios";
import * as globalFunctions from "../../globalFunctions/functions";
import ReactPlayer from "react-player";
const apiKey = "6bb894494c1a707618648b9164f393c2";
const AXIOS_AUTHORIZATION =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmI4OTQ0OTRjMWE3MDc2MTg2NDhiOTE2NGYzOTNjMiIsInN1YiI6IjVlZDdiZmY3ZTRiNTc2MDAyMDM3NjYzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kRGs0WRoomKwYXT7Mt8PNU2Zk6kAVasud5CyVVdf2mA";
//Axios header - api key
axios.defaults.headers.common["Authorization"] = AXIOS_AUTHORIZATION;
import toast from "react-hot-toast";
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  total_pages: number;
}
//getConfigurationTmdbApi()
interface ConfigurationResponse {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}

export async function getConfigurationTmdbApi(): Promise<ConfigurationResponse> {
  const url = `https://api.themoviedb.org/3/configuration`;
  const response: AxiosResponse<ConfigurationResponse> = await axios.get(url);
  return response.data;
}

//getMostPopularMoviesTmdbApi
//getMoviesTmdbApi
interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
// Typ dla odpowiedzi z API
interface MoviesApiResponse {
  results: Movie[];
}
async function getMostPopularMoviesTmdbApi(
  language: string,
  currentPage: number = 1,
): Promise<MoviesResponse> {
  const searchParams = new URLSearchParams({
    language: language,
    page: currentPage.toString(),
  });
  const url = `https://api.themoviedb.org/3/trending/movie/day?${searchParams}`;
  const response: AxiosResponse<MoviesResponse> = await axios.get(url);
  return response.data;
}

export function getMostPopularMoviesTmdbForUseEffect(
  language: string,
  currentPage: number,
  setDataMostPopularMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) {
  getMostPopularMoviesTmdbApi(language, currentPage)
    .then((dataMovies: MoviesResponse) => {
      setDataMostPopularMovies((prev) => [...prev, ...dataMovies.results]);
      let totalPages =
        dataMovies.total_pages > 500 ? 500 : dataMovies.total_pages;
      totalPages = Math.floor(totalPages / 2);
      setTotalPages(totalPages);
    })
    .catch((error) => {
      setError(error.message);
      console.log(
        "%c Error ",
        "color: white; background-color: #D33F49",
        `${error}`,
      );
    });
}

export async function getMoviesTmdbApi(
  query: string,
  language: string,
  currentPage: number = 1,
): Promise<MoviesResponse> {
  const searchParams = new URLSearchParams({
    query: encodeURIComponent(query),
    language: language,
    page: currentPage.toString(),
  });
  const url = `https://api.themoviedb.org/3/search/movie?${searchParams}`;
  const response: AxiosResponse<MoviesResponse> = await axios.get(url);
  return response.data;
}
// function getMoviesTmdbForUseEffect(
//   query: string,
//   language: string,
//   currentPage: number,
//   setDataMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
//   setTotalPages: React.Dispatch<React.SetStateAction<number>>,
//   setError: React.Dispatch<React.SetStateAction<string | null>>,
//   setIsMoviesLoading: React.Dispatch<React.SetStateAction<boolean>>,
// ) {
//   getMoviesTmdbApi(query, language, currentPage)
//     .then((dataMovies: MoviesResponse) => {
//       setDataMovies((prev) => [...prev, ...dataMovies.results]);
//       let totalPages =
//         dataMovies.total_pages > 500 ? 500 : dataMovies.total_pages;
//       totalPages = Math.floor(totalPages / 2);
//       setTotalPages(totalPages);
//       console.log("dataMovies.total_results", dataMovies.total_results);
//     })
//     .catch((error) => {
//       setError(error.message);
//       console.log(
//         "%c Error ",
//         "color: white; background-color: #D33F49",
//         `${error}`,
//       );
//     })
//     .finally(() => {
//       // setIsMoviesLoading(false);
//     });
// }
//getMovieDetailsTmdbApi
interface MovieDetails {
  id: string;
  title: string;
  poster_path: string | null;
  release_date: string;
  genres: { id: number; name: string }[];
  vote_average: number;
  vote_count: string;
  overview: string;
  runtime: number;
}

export async function getMovieDetailsTmdbApi(
  id: string,
  language: string,
): Promise<MovieDetails> {
  const searchParams = new URLSearchParams({
    language: language,
  });
  const url = `https://api.themoviedb.org/3/movie/${id}?${searchParams}`;
  const response: AxiosResponse<MovieDetails> = await axios.get(url);
  return response.data;
}
//getMovieDetailsTmdbApi
export interface MovieTrailer {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: string;
  published_at: string;
  id: string;
}

interface MovieResponse {
  id: string;
  results: MovieTrailer[];
}
export async function getMovieTrailerTmdbApi(
  id: string,
  language: string,
): Promise<MovieTrailer[]> {
  const searchParams = new URLSearchParams({
    language: language,
  });
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?${searchParams}`;
  const response: AxiosResponse<MovieResponse> = await axios.get(url);
  return response.data.results;
}
//getMovieCastTmdbApi
interface CastMember {
  cast_id: number;
  character: string;
  name: string;
  profile_path: string | null;
}

interface CastResponse {
  id: string;
  cast: CastMember[];
}

export async function getMovieCastTmdbApi(
  id: string,
  language: string,
): Promise<CastResponse> {
  const searchParams = new URLSearchParams({
    language: language,
  });
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?${searchParams}`;
  const response: AxiosResponse<CastResponse> = await axios.get(url);
  return response.data;
}

//getMovieReviewsTmdbApi
interface Review {
  author: string;
  content: string;
  created_at: string;
}

interface ReviewsResponse {
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export async function getMovieReviewsTmdbApi(
  id: string,
  language: string,
  currentPage: number = 1,
): Promise<ReviewsResponse> {
  const searchParams = new URLSearchParams({
    language: language,
    page: currentPage.toString(),
  });
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews?${searchParams}`;
  const response: AxiosResponse<ReviewsResponse> = await axios.get(url);
  return response.data;
}

//getUrlSizePoster
export const getUrlSizePoster = (
  baseUrl: string,
  sizes: string[],
  path: string | null,
  language: string,
  choiceSize: string = "w92",
) => {
  if (sizes.length > 0 && path) {
    const size = sizes.find((size) => size === choiceSize) || sizes[0];
    return `${baseUrl}${size}${path}`;
  }
  const match = choiceSize.match(/\d+/);
  const number = match ? parseInt(match[0], 10) : null;
  const width = number || 92;
  const height = Math.round(width * 1.5);
  const text = encodeURIComponent(language);
  const bgColor = "008c3d";
  const textColor = "000";
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${text}`;
};

export function TrailerUrl(site: string, key: string, type: string): string {
  if (site === "YouTube" && type === "Trailer") {
    const url = `https://www.youtube.com/watch?v=${key}`;
    const reactPlayerCanPlay = ReactPlayer.canPlay(url);
    if (reactPlayerCanPlay) {
      return url;
    }
  }
  return "";
}

export function FindFirstTrailer(dataTrailers: MovieTrailer[]) {
  let url = "";
  for (const obj of dataTrailers) {
    url = TrailerUrl(obj.site, obj.key, obj.type);
    // Sprawdzenie warunku i wyjście z pętli, jeśli spełniony
    if (url !== "") {
      break;
    }
  }
  return url;
}
