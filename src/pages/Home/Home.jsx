import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb"
import { MovieList } from "../../components/MovieList/MovieList";
// import style from "./MovieList.module.scss"
import style from "./Home.module.scss"

export function Home() {
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [imgUrlModal, setUrlModal] = useState("");
    const [tagModal, setTagModal] = useState("");
    const [dataMostPopularMovies, setDataMostPopularMovies] = useState([]);

    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const location = useLocation();
    const handleSearch = (newQuery) => {
        if (query !== newQuery) {
            setQuery(newQuery);
            setCurrentPage(1);
            setDataMostPopularMovies([]);
            setTotalPages(0);
            setIsButtonVisible(false);
            setError(null);
        }
    };

    const handlePagination = () => {
        setCurrentPage((prev) => prev + 1);
    }

    const handleLoader = (isLoaderVisible) => {
        setIsLoaderVisible(isLoaderVisible);
    }

    const handleButton = (isButtonVisible) => {
        setIsButtonVisible(isButtonVisible);
    }

    const openModal = (imgUrlModal, tagModal) => {
        setUrlModal(imgUrlModal);
        setTagModal(tagModal);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    useEffect(() => {

        // const fetchPictures = async () => {
        //     try {
        //         const response = await ApiTmdb.getMostPopularMovies();
        //         if (response) {
        //             setDataMostPopularMovies((prev) => [...response.hits]);
        //             // const totalPages = Math.ceil(response.totalHits / 12);
        //             // setTotalPages(totalPages);
        //             // const showButton = currentPage < totalPages && response.hits.length > 0;

        //         }
        //     } catch (errors) {
        //         setError(errors.message);
        //         console.log(
        //             "%c Error ",
        //             "color: white; background-color: #D33F49",
        //             `${error}`
        //         );
        //     } finally {

        //     }
        // };
        // fetchPictures();
        ApiTmdb.getMostPopularMoviesTmdbApi()
            .then(dataMovies => {
                setDataMostPopularMovies((prev) => [...dataMovies.results]);
            })
            .catch(error => {
                console.log(
                    "%c Error ",
                    "color: white; background-color: #D33F49",
                    `${error}`
                );
            });
    }, [query, currentPage]);


    // useEffect(() => {
    //     if (data.length > 0) {
    //         toast(`Info:\nAktualna strona: ${currentPage}\nLiczba stron: ${totalPages}\nLiczba obrazków na stronie: ${data.length}`, { position: "top-right" });
    //     }

    // }, [data])



    return (
        <>
            <h1 className={style.text}>Tranding today</h1>
            <MovieList dataMostPopularMovies={dataMostPopularMovies} />
        </>
    );
};