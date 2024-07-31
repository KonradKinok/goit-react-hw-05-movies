import React, { useState, useEffect, Suspense } from "react";
import { useParams, useLocation, Outlet, NavLink } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader"
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb"
import BackLink from "../../components/BackLink/BackLink";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import style from "./MovieDetails.module.scss"

// Typ dla pojedynczego gatunku filmu
interface Genre {
    id: number;
    name: string;
}

// Typ dla szczegółów filmu
interface MovieDetails {
    title: string;
    poster_path: string | null;
    overview: string;
    genres: Genre[];
    vote_average: number;
}

export const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [dataMoviesDetails, setDataMoviesDetails] = useState<MovieDetails | null>(null)
    const [error, setError] = useState<string|null>(null);
    const { dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes } = useDataConfigurationTmdb();
    
    const backLinkHref = location.state?.from ?? "/";

    useEffect(() => {
       setError(null);
        if (id) {
         ApiTmdb.getMovieDetailsTmdbApi(id)
             .then(data => {
                 setDataMoviesDetails(data);
             })
             .catch(error => {
                 setError(error.message);
                 console.log(
                    "%c Error ",
                    "color: white; background-color: #D33F49",
                    `${error}`
                );
             });
       }
    }, []);

    if (!dataMoviesDetails) {
        return (<p>{error}</p>);
    }
    
    const { title, poster_path, overview, genres, vote_average } = dataMoviesDetails;
    
    return (
        <div className={style["container"]}>
            <div>
                <BackLink to={backLinkHref}>Go back</BackLink>
            </div>
            <div className={style["container-top"]}>
                <div className={style["container-top-img"]}>
                    <img className={style["image"]} src={ApiTmdb.getUrlSizePoster(dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes, poster_path, "w185")} alt={title} />
                </div>
                <div className={style["container-top-text"]}>
                    <h2>{title}</h2>
                    <h3>Overview:</h3>
                    <p>{overview}</p>
                    <h3>Genres:</h3>
                    <p>{genres && genres.length > 0 ? genres.map(genre => genre.name).join(', ') : "No genres"}</p>
                    <p>User score: {Math.round(vote_average * 10)}%</p>
                </div>
            </div>
            <div className={style["container-bottom"]}>
                <div>
                    <h5>Additional information</h5>
                    <ul className={style["container-list"]}>
                        <li><NavLink to="cast" state={{ from: backLinkHref }} className={(navData) => navData.isActive ? style.active : ""}>Cast</NavLink></li>
                        <li><NavLink to="reviews" state={{ from: backLinkHref }} className={(navData) => navData.isActive ? style.active : ""}>Reviews</NavLink></li>
                    </ul>
                </div>
                <div>
                    <Suspense fallback={<Loader />}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </div >
    );
}