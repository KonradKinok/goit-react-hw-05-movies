import React, { useState, useEffect } from "react";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb"
import { MovieList } from "../../components/MovieList/MovieList";
import style from "./Home.module.scss"
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import Pagination from "../../components/Pagination/Pagination";
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
interface PageState {
    firstPage: number;
    lastPage: number;
    paginationPage: number;
    
}
export function Home() {
    const { language } = useDataConfigurationTmdb();
    const [dataMostPopularMovies, setDataMostPopularMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string|null>(null);
    const [page, setPage] = useState<PageState>({paginationPage:1,firstPage:1, lastPage: 2});

    useEffect(() => {
        setError(null);
        setDataMostPopularMovies([]);
        for (let currentPageLoop = Number(page.firstPage); currentPageLoop <=Number(page.lastPage) ; currentPageLoop++) {
            ApiTmdb.getMostPopularMoviesTmdbForUseEffect(language.language, currentPageLoop,setDataMostPopularMovies,setError)
            // ApiTmdb.getMostPopularMoviesTmdbApi(language.language, currentPageLoop)
            //     .then((dataMovies: MoviesApiResponse) => {
            //         setDataMostPopularMovies((prev)=>[...prev, ...dataMovies.results]);
            //     })
            //     .catch(error => {
            //         setError(error.message);
            //         console.log(
            //             "%c Error ",
            //             "color: white; background-color: #D33F49",
            //             `${error}`
            //         );
            //     });
            // setCurrentPage(currentPageLoop.toString());
        }
    }, [language,page]);
    const onPageChange = (newPage: number) => {
        // setPage({
        //     paginationPage: newPage,
        //     firstPage: newPage * 2,
        //     lastPage: newPage *2+1
        // })
        setPage(prevPage => {
            const newFirstPage = 2 * newPage - 1;
            const newLastPage = newFirstPage + 1;
            return {
                paginationPage: newPage,       
                firstPage: newFirstPage,
                lastPage: newLastPage,
            }
        });
    };
    // useEffect(() => {
    //     setError(null);
    //     setDataMostPopularMovies([]);
    //         ApiTmdb.getMostPopularMoviesTmdbForUseEffect(language.language, page.currentPage,setDataMostPopularMovies,setError)
        
    // }, [page]);
    
    return (
        <>
            <h1 className={style.text}>{ language.title}:</h1>
            {error ?
                (<p>Sorry, something went wrong</p>)
                :
                <>
                < MovieList dataMovies={dataMostPopularMovies} />
                <Pagination
                    className={style.pagination}
                    currentPage={page.paginationPage}
                    totalCount={20}
                    onPageChange={page => onPageChange(page)} />
                </>
            }
        </>
    );
};

