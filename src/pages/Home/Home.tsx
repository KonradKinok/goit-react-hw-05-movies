import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import Pagination from "../../components/Pagination/Pagination";
import { MovieList } from "../../components/MovieList/MovieList";
import { Movie } from "../../components/ApiTmdb/ApiTmdb";
import scss from "./Home.module.scss";

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

  return (
    <>
      <h1 className={scss.text}>{language.title}:</h1>
      {error ? (
        <p>Sorry, something went wrong</p>
      ) : (
        <>
          <MovieList dataMovies={dataMostPopularMovies} />
          <Pagination
            className={scss.pagination}
            currentPage={page.paginationPage}
            totalCount={totalPages}
            onPageChange={(page) => onPageChange(page)}
          />
        </>
      )}
    </>
  );
}
