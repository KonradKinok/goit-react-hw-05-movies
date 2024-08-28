import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Searchbar } from "../../components/Searchbar/Searchbar";
import { MovieList } from "../../components/MovieList/MovieList";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";

// Typ dla pojedynczego filmu
interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    genre_ids: number[];
    vote_average: number;
    total_pages: number;
}

// Typ dla odpowiedzi z API
interface MoviesApiResponse {
    results: Movie[];
}
interface PageState {
    firstPage: number;
    lastPage: number;
    paginationPage: number;
    
}
export const Movies = () => {
    const { language } = useDataConfigurationTmdb();
    const [query, setQuery] = useState<string>("");
    const [dataMovies, setDataMovies] = useState<Movie[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState<PageState>({paginationPage:1,firstPage:1, lastPage: 2});
    const [error, setError] = useState<string | null>(null);
    
    const updateQueryString = (value: string) => {
        setQuery(value);
        setSearchParams({ query: value });
    };

    useEffect(() => {
        const query = searchParams.get("query") || "";
        setQuery(query);
    }, [searchParams]);

    useEffect(() => {
        setError(null);
        setDataMovies([]);
        if (query) {
            for (let currentPageLoop = Number(page.firstPage); currentPageLoop <= Number(page.lastPage); currentPageLoop++) {
                ApiTmdb.getMoviesTmdbForUseEffect(query, language.language, currentPageLoop, setDataMovies, setError)
                
            }
        }
    }, [query, language.language]);

    return (
        <>
            <Searchbar updateQueryString={updateQueryString} />
            {error ?
                (<p>Sorry, something went wrong</p>)
                :
                (<MovieList dataMovies={dataMovies}/>)
            }
            
        </>
    );
};

