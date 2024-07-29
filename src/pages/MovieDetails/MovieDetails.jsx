import { useState, useEffect, Suspense } from "react";
import { useParams, useLocation, Outlet, NavLink } from "react-router-dom";
import style from "./MovieDetails.module.scss"
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb"
import BackLink from "../../components/BackLink/BackLink";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import { Loader } from "../../components/Loader/Loader"
export const MovieDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const [dataMoviesDetails, setDataMoviesDetails] = useState({});
    const [dataOverview, setDataOverview] = useState("");
    const { dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes } = useDataConfigurationTmdb();
    const { title, poster_path, overview, genres, vote_average } = dataMoviesDetails;
    const backLinkHref = location.state?.from ?? "/";

    useEffect(() => {
        ApiTmdb.getMovieDetailsTmdbApi(id)
            .then(data => {
                setDataMoviesDetails(data);
                setDataOverview(data.overview)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className={style["container"]}>
            <div>
                <BackLink to={backLinkHref}>Back to home</BackLink>
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