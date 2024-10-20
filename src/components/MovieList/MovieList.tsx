import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as ApiTmdb from "../ApiTmdb/ApiTmdb.js";
import style from "./MovieList.module.scss";
import { useDataConfigurationTmdb } from "../TmdbConfigurationContext/TmdbConfigurationContext";
import { AiOutlineLike } from "react-icons/ai";
import { Movie } from "../ApiTmdb/ApiTmdb.js";

interface MovieListProps {
  dataMovies: Movie[];
}

export function MovieList({ dataMovies }: MovieListProps) {
  const location = useLocation();

  const {
    dataConfigurationBaseUrlToPoster,
    dataConfigurationPosterSizes,
    language,
  } = useDataConfigurationTmdb();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || 1;
  return (
    <div className={style.imageGallery}>
      {dataMovies.map(
        ({ id, title, poster_path, release_date, vote_average }) => (
          <Link
            className={style.imageGalleryItem}
            key={id}
            to={`/movies/${page}/${id}`}
            state={{ from: location }}>
            <img
              className={style["imageGalleryItem-image"]}
              src={ApiTmdb.getUrlSizePoster(
                dataConfigurationBaseUrlToPoster,
                dataConfigurationPosterSizes,
                poster_path,
                language.pictureNoData,
              )}
              alt={title}
            />
            <p className={style["p-title"]}>
              {title} {release_date ? release_date.split("-")[0] : ""}
            </p>
            <p className={style["vote-average"]}>
              {vote_average ? vote_average.toFixed(1) : ""}
            </p>
          </Link>
        ),
      )}
    </div>
  );
}
