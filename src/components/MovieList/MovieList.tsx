import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as ApiTmdb from "../ApiTmdb/ApiTmdb.js";
import style from "./MovieList.module.scss";
import { useDataConfigurationTmdb } from "../TmdbConfigurationContext/TmdbConfigurationContext";
import { AiOutlineLike } from "react-icons/ai";
import { Movie } from "../ApiTmdb/ApiTmdb.js";
import { TfiYoutube } from "react-icons/tfi";
import { FaYoutube } from "react-icons/fa";
import { VideoModal } from "../VideoModal/VideoModal.js";
import movieCursor from "../../images/movieList/videoCursor.svg";
import { Console } from "console";
interface MovieListProps {
  dataMovies: Movie[];
}

export function MovieList({ dataMovies }: MovieListProps) {
  const location = useLocation();
  const [isModalLibrariesOpen, setIsModalLibrariesOpen] =
    useState<boolean>(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const handleMenuMobileModalOpen = (movieId: number | null) => {
    setSelectedMovieId(movieId); // Ustawienie id wybranego filmu
    setIsModalLibrariesOpen((prevState) => !prevState);
    console.log("MovieList: movieId", movieId);
  };

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
            <TfiYoutube
              className={style["video-icon"]}
              onClick={(e) => {
                e.preventDefault(); // Zapobiegaj nawigacji przy kliknięciu na ikonę
                e.stopPropagation(); // Zatrzymaj propagację zdarzenia
                handleMenuMobileModalOpen(id);
              }}
            />
          </Link>
        ),
      )}
      <VideoModal
        closeModal={handleMenuMobileModalOpen}
        isModalLibrariesOpen={isModalLibrariesOpen}
        movieId={selectedMovieId} // Przekazanie id filmu do modalu
      />
    </div>
  );
}
