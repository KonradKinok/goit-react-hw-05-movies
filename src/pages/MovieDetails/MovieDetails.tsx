import React, { useState, useEffect, Suspense } from "react";
import { useParams, useLocation, Outlet, NavLink } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";
import BackLink from "../../components/BackLink/BackLink";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import style from "./MovieDetails.module.scss";
import { ImageModal } from "../../components/ImageModal/ImageModal";
import { MovieDetails as MovieDetailsInterface } from "../../components/ApiTmdb/ApiTmdb";
import {
  en_language,
  pl_language,
  languageList,
} from "../../components/Constans/Constans";
// Typ dla pojedynczego gatunku filmu
interface Genre {
  id: number;
  name: string;
}

// Typ dla szczegółów filmu
// interface MovieDetails {
//   title: string;
//   poster_path: string | null;
//   overview: string;
//   genres: Genre[];
//   vote_average: number;
//   vote_count: string;
//   release_date: string;
// }

export const MovieDetails = () => {
  const { language } = useDataConfigurationTmdb();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [dataMoviesDetails, setDataMoviesDetails] =
    useState<MovieDetailsInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes } =
    useDataConfigurationTmdb();
  const [isModalLibrariesOpen, setIsModalLibrariesOpen] =
    useState<boolean>(false);

  const handleMenuMobileModalOpen = () => {
    setIsModalLibrariesOpen((prevState) => !prevState);
  };
  const backLinkHref = location.state?.from ?? "/";

  useEffect(() => {
    setError(null);
    if (id) {
      ApiTmdb.getMovieDetailsTmdbApi(id, language.language)
        .then((data) => {
          setDataMoviesDetails(data);
        })
        .catch((error) => {
          setError(error.message);
          console.log(
            "%c Error ",
            "color: white; background-color: #D33F49",
            `${error}`,
          );
        });
    }
  }, [language]);

  if (!dataMoviesDetails) {
    return <p>{error}</p>;
  }

  const {
    title,
    poster_path,
    backdrop_path,
    overview,
    genres,
    vote_average,
    vote_count,
    release_date,
  } = dataMoviesDetails;

  return (
    <div className={style["container"]}>
      <div>
        <BackLink to={backLinkHref}>{language.backlink}</BackLink>
      </div>
      <div className={style["container-top"]}>
        <div
          className={style["container-top-img"]}
          onClick={handleMenuMobileModalOpen}>
          <img
            className={style["image"]}
            src={ApiTmdb.getUrlSizePoster(
              dataConfigurationBaseUrlToPoster,
              dataConfigurationPosterSizes,
              poster_path,
              language.pictureNoData,
              "w185",
            )}
            alt={title}
          />
        </div>
        <div className={style["container-top-text"]}>
          <h2>{title}</h2>
          <h3>{language.overview}:</h3>
          <p>{overview}</p>
          <h3>{language.genres}:</h3>
          <p>
            {genres && genres.length > 0
              ? genres.map((genre) => genre.name).join(", ")
              : `${language.userScore}`}{" "}
            | {release_date}
          </p>
          <p>
            {language.userScore}: {Math.round(vote_average * 10)}% |{" "}
            {language.voteCount}: {vote_count}
          </p>
        </div>
      </div>
      <div className={style["container-bottom"]}>
        <div className={style["container-bottom-menu"]}>
          <h5>{language.additionalInfo}</h5>
          <ul className={style["container-list"]}>
            <li>
              <NavLink
                to="cast"
                state={{ from: backLinkHref }}
                className={(navData) => (navData.isActive ? style.active : "")}>
                {language.cast}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="reviews"
                state={{ from: backLinkHref }}
                className={(navData) => (navData.isActive ? style.active : "")}>
                {language.reviews}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="video"
                state={{ from: backLinkHref }}
                className={(navData) => (navData.isActive ? style.active : "")}>
                {language.video}
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
      <ImageModal
        closeModal={handleMenuMobileModalOpen}
        isModalLibrariesOpen={isModalLibrariesOpen}
        poster_path={poster_path}
        backdrop_path={backdrop_path}
        title={title}
      />
    </div>
  );
};
