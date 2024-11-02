import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as ApiTmdb from "../ApiTmdb/ApiTmdb.js";
import scss from "./MovieList.module.scss";
import { useDataConfigurationTmdb } from "../TmdbConfigurationContext/TmdbConfigurationContext";
import { Movie } from "../ApiTmdb/ApiTmdb.js";
import { TfiYoutube } from "react-icons/tfi";
import { VideoModal } from "../VideoModal/VideoModal.js";
import { nanoid } from "nanoid";

interface MovieListProps {
  dataMovies: Movie[];
}

export function MovieList({ dataMovies }: MovieListProps) {
  const location = useLocation();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const handleVideoModalOpen = (movieId: number | null) => {
    setSelectedMovieId(movieId); // Ustawienie id wybranego filmu
    setIsVideoModalOpen((prevState) => !prevState);
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
    <div className={scss["image-gallery"]}>
      {dataMovies.map(
        ({ id, title, poster_path, release_date, vote_average }) => (
          <Link
            className={scss["image-gallery-item"]}
            key={nanoid()}
            to={`/movies/${page}/${id}`}
            state={{ from: location }}>
            <img
              className={scss["image-gallery-item-image"]}
              src={ApiTmdb.getUrlSizePoster(
                dataConfigurationBaseUrlToPoster,
                dataConfigurationPosterSizes,
                poster_path,
                language.pictureNoData,
              )}
              alt={title}
            />
            <p className={scss["p-title"]}>
              {title} {release_date ? release_date.split("-")[0] : ""}
            </p>
            <p className={scss["vote-average"]}>
              {vote_average ? vote_average.toFixed(1) : ""}
            </p>
            <TfiYoutube
              className={scss["video-icon"]}
              onClick={(e) => {
                e.preventDefault(); // Zapobiegaj nawigacji przy kliknięciu na ikonę
                e.stopPropagation(); // Zatrzymaj propagację zdarzenia
                handleVideoModalOpen(id);
              }}
            />
          </Link>
        ),
      )}
      <VideoModal
        closeModal={handleVideoModalOpen}
        isVideoModalOpen={isVideoModalOpen}
        movieId={selectedMovieId} // Przekazanie id filmu do modalu
      />
    </div>
  );
}
