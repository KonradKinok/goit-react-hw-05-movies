import axios, { AxiosResponse } from 'axios';

const apiKey = '6bb894494c1a707618648b9164f393c2';
const AXIOS_AUTHORIZATION =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmI4OTQ0OTRjMWE3MDc2MTg2NDhiOTE2NGYzOTNjMiIsInN1YiI6IjVlZDdiZmY3ZTRiNTc2MDAyMDM3NjYzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kRGs0WRoomKwYXT7Mt8PNU2Zk6kAVasud5CyVVdf2mA';
//Axios header - api key
axios.defaults.headers.common['Authorization'] = AXIOS_AUTHORIZATION;

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
};

interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    genre_ids: number[];
    vote_average: number;
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
export async function getMostPopularMoviesTmdbApi(language:string, currentPage: number = 1): Promise<MoviesResponse> {
    const searchParams = new URLSearchParams({
        language: language,
        page: currentPage.toString(),
    });
    const url = `https://api.themoviedb.org/3/trending/movie/day?${searchParams}`;
    const response: AxiosResponse<MoviesResponse> = await axios.get(url);
    return response.data;
};

export function getMostPopularMoviesTmdbForUseEffect(
    language: string,
    currentPage: number,
    setDataMostPopularMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>)
{
    getMostPopularMoviesTmdbApi(language, currentPage)
                .then((dataMovies: MoviesApiResponse) => {
                    setDataMostPopularMovies((prev)=>[...prev, ...dataMovies.results]);
                })
                .catch(error => {
                    setError(error.message);
                    console.log(
                        "%c Error ",
                        "color: white; background-color: #D33F49",
                        `${error}`
                    );
                });
}

export async function getMoviesTmdbApi(query: string, language:string, currentPage: number = 1): Promise<MoviesResponse> {
    const searchParams = new URLSearchParams({
        query: encodeURIComponent(query),
        language: language,
        page: currentPage.toString(),
    });
    const url = `https://api.themoviedb.org/3/search/movie?${searchParams}`;
    const response: AxiosResponse<MoviesResponse> = await axios.get(url);
    return response.data;
};

//getMovieDetailsTmdbApi
interface MovieDetails {
    id: string;
    title: string;
    poster_path: string | null;
    release_date: string;
    genres: { id: number; name: string }[];
    vote_average: number;
    overview: string;
    runtime: number;
}

export async function getMovieDetailsTmdbApi(id: string, language:string): Promise<MovieDetails> {
    const searchParams = new URLSearchParams({
        language: language,
    });
    const url = `https://api.themoviedb.org/3/movie/${id}?${searchParams}`;
    const response: AxiosResponse<MovieDetails> = await axios.get(url);
    return response.data;
};

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

export async function getMovieCastTmdbApi(id: string): Promise<CastResponse> {
    const searchParams = new URLSearchParams({
        language: 'pl-PL',
    });
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?${searchParams}`;
    const response: AxiosResponse<CastResponse> = await axios.get(url);
    return response.data;
};

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

export async function getMovieReviewsTmdbApi(id: string, currentPage: number = 1): Promise<ReviewsResponse> {
    const searchParams = new URLSearchParams({
        language: 'en-US',
        page: currentPage.toString(),
    });
    const url = `https://api.themoviedb.org/3/movie/${id}/reviews?${searchParams}`;
    const response: AxiosResponse<ReviewsResponse> = await axios.get(url);
    return response.data;
};

//getUrlSizePoster
export const getUrlSizePoster = (baseUrl: string, sizes: string[], path: string | null, choiceSize: string = "w92") => {
    if (sizes.length > 0 && path) {
        const size = sizes.find(size => size === choiceSize) || sizes[0];
        return `${baseUrl}${size}${path}`;
    }
    const match = choiceSize.match(/\d+/);
    const number = match ? parseInt(match[0], 10) : null;
    const width = number|| 92;
    const height = Math.round(width * 1.5);
    const text = encodeURIComponent("There is\nno picture");
    const bgColor = "008c3d";
    const textColor = "000"
    return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${text}`;
};