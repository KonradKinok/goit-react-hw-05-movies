import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Searchbar } from "../../components/Searchbar/Searchbar";
import { MovieList } from "../../components/MovieList/MovieList";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import Pagination from "../../components/Pagination/Pagination";
import scss from "./Movies.module.scss";
// Typ dla pojedynczego filmu
import { Movie } from "../../components/ApiTmdb/ApiTmdb";
import toast from "react-hot-toast";
import { FaInfoCircle } from "react-icons/fa";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useDataConfigurationTmdb();
  const [query, setQuery] = useState<string>("");
  const [dataMovies, setDataMovies] = useState<Movie[]>([]);

  const pageFromUrl = searchParams.get("page");
  const initialPage = pageFromUrl ? Number(pageFromUrl) : 1;
  const [page, setPage] = useState<PageState>({
    paginationPage: initialPage,
    firstPage: 2 * initialPage - 1,
    lastPage: 2 * initialPage,
  });
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const updateQueryString = (value: string) => {
    setQuery(value);

    // Zaktualizowanie obu parametrów, query i page
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set("query", value);
      params.set("page", "1"); // resetowanie strony do 1 po wpisaniu nowego query
      return params;
    });

    // Zresetowanie strony do pierwszej
    setPage({
      paginationPage: 1,
      firstPage: 1,
      lastPage: 2,
    });
  };

  useEffect(() => {
    const pageFromUrl = searchParams.get("page");
    if (pageFromUrl) {
      const pageNum = Number(pageFromUrl);
      setPage({
        paginationPage: pageNum,
        firstPage: 2 * pageNum - 1,
        lastPage: 2 * pageNum,
      });
    }
    const query = searchParams.get("query") || "";
    setQuery(query);
  }, [searchParams]);

  useEffect(() => {
    setError(null);
    setDataMovies([]);

    const fetchMovies = async () => {
      try {
        let allMovies: Movie[] = [];
        let totalPages = 0;
        let resultsCount = 0;
        for (
          let currentPageLoop = page.firstPage;
          currentPageLoop <= page.lastPage;
          currentPageLoop++
        ) {
          const data = await ApiTmdb.getMoviesTmdbApi(
            query,
            language.language,
            currentPageLoop,
          );
          allMovies = [...allMovies, ...data.results];
          totalPages = data.total_pages > 500 ? 500 : data.total_pages;
          totalPages = Math.floor(totalPages / 2);
          resultsCount = data.total_results > 5000 ? 5000 : data.total_results;
        }
        setTotalPages(totalPages);
        setDataMovies(allMovies);

        if (query !== "" && allMovies.length === 0 && !error) {
          const errorMessage = `${language.noData}`;
          toast(errorMessage, {
            position: "top-center",
            duration: 3000,
            className: scss["toast-info-message"],
            icon: <FaInfoCircle />,
          });
        } else if (page.firstPage === 1 && allMovies.length > 0) {
          const infoMessage = `${language.numberOfResults}: ${resultsCount}`;
          toast(infoMessage, {
            position: "top-center",
            duration: 3000,
            className: scss["toast-info-message"],
            // Custom Icon
            icon: <FaInfoCircle />,
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error occurred");
        }
        console.error(
          "%c Error ",
          "color: white; background-color: #D33F49",
          `${error}`,
        );
      }
    };
    fetchMovies();
  }, [query, language.language, page.firstPage, page.lastPage]);

  const onPageChange = (newPage: number) => {
    const newFirstPage = 2 * newPage - 1;
    const newLastPage = newFirstPage + 1;
    const currentQuery = searchParams.get("query") || "";
    setPage({
      paginationPage: newPage,
      firstPage: newFirstPage,
      lastPage: newLastPage,
    });

    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set("page", newPage.toString());
      if (currentQuery) {
        params.set("query", currentQuery);
      }
      return params;
    });
  };

  return (
    <>
      <Searchbar updateQueryString={updateQueryString} />
      {error ? (
        <p>Sorry, something went wrong</p>
      ) : (
        <>
          <MovieList dataMovies={dataMovies} />
          {query !== "" && (
            <Pagination
              className={scss.pagination}
              currentPage={page.paginationPage}
              totalCount={totalPages}
              onPageChange={(page) => onPageChange(page)}
            />
          )}
        </>
      )}
    </>
  );
};
