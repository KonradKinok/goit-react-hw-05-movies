import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Searchbar } from "../../components/Searchbar/Searchbar";
import { MovieList } from "../../components/MovieList/MovieList";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";

export const Movies = () => {
    const [query, setQuery] = useState("");
    const [dataMovies, setDataMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const updateQueryString = (value) => {
        setQuery(value);
        setSearchParams({ query: value });
    };

    useEffect(() => {
        const query = searchParams.get("query") || "";
        setQuery(query);
    }, [searchParams]);

    useEffect(() => {
        ApiTmdb.getMoviesTmdbApi(query)
            .then(dataMovies => {
                setDataMovies((prev) => [...dataMovies.results]);
            })
            .catch(error => {
                console.log(
                    "%c Error ",
                    "color: white; background-color: #D33F49",
                    `${error}`
                );
            });
    }, [query]);

    return (
        <>
            <Searchbar updateQueryString={updateQueryString} />
            <MovieList dataMostPopularMovies={dataMovies} />
        </>
    );
};

