import React, { useState, useEffect } from "react";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";
import { MovieList } from "../../components/MovieList/MovieList";
import style from "./Home.module.scss";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import Pagination from "../../components/Pagination/Pagination";
import * as globalFunctions from "../../globalFunctions/functions";
import { useSearchParams } from "react-router-dom";
// Typ dla pojedynczego filmu
import { Movie } from "../../components/ApiTmdb/ApiTmdb";
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
  const [dataMostPopularMovies, setDataMostPopularMovies] = useState<Movie[]>(
    [],
  );
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  //   const [page, setPage] = useState<PageState>({
  //     paginationPage: 1,
  //     firstPage: 1,
  //     lastPage: 2,
  //   });
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = searchParams.get("page");

  const initialPage = pageFromUrl ? Number(pageFromUrl) : 1;
  const [page, setPage] = useState<PageState>({
    paginationPage: initialPage,
    firstPage: 2 * initialPage - 1,
    lastPage: 2 * initialPage,
  });

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
  }, [searchParams]);

  useEffect(() => {
    setError(null);
    setDataMostPopularMovies([]);
    for (
      let currentPageLoop = Number(page.firstPage);
      currentPageLoop <= Number(page.lastPage);
      currentPageLoop++
    ) {
      ApiTmdb.getMostPopularMoviesTmdbForUseEffect(
        language.language,
        currentPageLoop,
        setDataMostPopularMovies,
        setTotalPages,
        setError,
      );
    }
  }, [language, page.firstPage, page.lastPage]);

  const onPageChange = (newPage: number) => {
    const newFirstPage = 2 * newPage - 1;
    const newLastPage = newFirstPage + 1;

    setPage({
      paginationPage: newPage,
      firstPage: newFirstPage,
      lastPage: newLastPage,
    });

    setSearchParams({ page: newPage.toString() });
  };

  useEffect(() => {
    console.log("totalPages", totalPages);
    console.log("paginationPage", page);
  }, [dataMostPopularMovies]);

  return (
    <>
      <h1 className={style.text}>{language.title}:</h1>
      {error ? (
        <p>Sorry, something went wrong</p>
      ) : (
        <>
          <MovieList dataMovies={dataMostPopularMovies} />
          <Pagination
            className={style.pagination}
            currentPage={page.paginationPage}
            totalCount={totalPages}
            onPageChange={(page) => onPageChange(page)}
          />
        </>
      )}
    </>
  );
}
