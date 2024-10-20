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
  const [totalResults, setTotalResults] = useState<number>(0);
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

  useEffect(() => {}, [searchParams]);

  useEffect(() => {
    setError(null);
    setDataMovies([]);
    if (query) {
      for (
        let currentPageLoop = Number(page.firstPage);
        currentPageLoop <= Number(page.lastPage);
        currentPageLoop++
      ) {
        ApiTmdb.getMoviesTmdbForUseEffect(
          query,
          language.language,
          currentPageLoop,
          setDataMovies,
          setTotalPages,
          setTotalResults,
          setError,
        );
      }
    }
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

  useEffect(() => {
    // if (
    //   query !== "" &&
    //   dataMovies.length === 0 &&
    //   !error &&
    //   totalResults === 0
    // ) {
    //   const errorMessage = `${language.noData}`;
    //   toast.error(errorMessage, {
    //     position: "top-center",
    //     duration: 2000,
    //   });
    // }
  }, [query]);

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
