import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as ApiTmdb from "../ApiTmdb/ApiTmdb"
export function MovieList() {
    const [query, setQuery] = useState < string > ("");
    const [currentPage, setCurrentPage] = useState < number > (1);
    const [isModalOpen, setIsModalOpen] = useState < boolean > (false);
    const [isLoaderVisible, setIsLoaderVisible] = useState < boolean > (false);
    const [isButtonVisible, setIsButtonVisible] = useState < boolean > (false);
    const [imgUrlModal, setUrlModal] = useState < string > ("");
    const [tagModal, setTagModal] = useState < string > ("");
    const [dataMostPopularMovies, setDataMostPopularMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState < string | null > (null);

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

        const fetchPictures = async () => {
            try {
                const response = await ApiTmdb.getMostPopularMovies();
                if (response) {
                    setDataMostPopularMovies((prev) => [...response.hits]);
                    // const totalPages = Math.ceil(response.totalHits / 12);
                    // setTotalPages(totalPages);
                    // const showButton = currentPage < totalPages && response.hits.length > 0;

                }
            } catch (errors) {
                setError(errors.message);
                console.log(
                    "%c Error ",
                    "color: white; background-color: #D33F49",
                    `${error}`
                );
            } finally {

            }
        };
        fetchPictures();
    }, [query, currentPage]);

    // useEffect(() => {
    //     if (data.length > 0) {
    //         toast(`Info:\nAktualna strona: ${currentPage}\nLiczba stron: ${totalPages}\nLiczba obrazków na stronie: ${data.length}`, { position: "top-right" });
    //     }

    // }, [data])

    async function fetchPicturesPerPage(query, currentPage) {
        const searchParams = new URLSearchParams({
            key: apiKey,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: "12",
            page: currentPage.toString(),
        });
        if (query) {
            const url = `https://pixabay.com/api/?${searchParams}`;
            console.log(url);
            const response = await axios.get(url);

            return response.data;
        }
        return;
    }

    return (
        <>
            {dataMostPopularMovies.map((movie) => (
                <div key={movie.id}>
                    <Link to={`${movie.id}`} state={{ from: location }}>
                        <img src="https://via.placeholder.com/200x100" alt="" />
                        <p>{movie.title}</p>
                    </Link>
                </div>
            ))}
        </>
    );
};