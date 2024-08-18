import React, { useState, useEffect } from "react";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb"
import { MovieList } from "../../components/MovieList/MovieList";
import style from "./Home.module.scss"

// Typ dla pojedynczego filmu
interface Movie {
    id: number;
    title: string;
    poster_path: string| null;
    release_date: string;
    genre_ids: number[];
    vote_average: number;
}

// Typ dla odpowiedzi z API
interface MoviesApiResponse {
    results: Movie[];
}

// Typ dla stanu komponentu Home
interface HomeState {
    dataMostPopularMovies: Movie[];
    error: string | null;
}

// Typ dla propsów komponentu MovieList
interface MovieListProps {
    dataMovies: Movie[];
}

export function Home() {
    const [dataMostPopularMovies, setDataMostPopularMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string|null>(null);

    useEffect(() => {
        setError(null);

        ApiTmdb.getMostPopularMoviesTmdbApi()
            .then((dataMovies: MoviesApiResponse) => {
                setDataMostPopularMovies(dataMovies.results);
            })
            .catch(error => {
                setError(error.message);
                console.log(
                    "%c Error ",
                    "color: white; background-color: #D33F49",
                    `${error}`
                );
            });
    }, []);

    return (
        <>
            <h1 className={style.text}>Tranding today</h1>
            {error ?
                (<p>Sorry, something went wrong</p>)
                :
                (< MovieList dataMovies={dataMostPopularMovies} />)
            }
        </>
    );
};