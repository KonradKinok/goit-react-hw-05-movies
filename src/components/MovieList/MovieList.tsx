import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as ApiTmdb from "../ApiTmdb/ApiTmdb.js";
import style from "./MovieList.module.scss";
import { useDataConfigurationTmdb } from "../TmdbConfigurationContext/TmdbConfigurationContext";
import { AiOutlineLike } from "react-icons/ai";
interface Movie {
    id: number;
    title: string;
    poster_path: string| null;
    release_date: string;
    genre_ids: number[];
    vote_average: number;
}

interface MovieListProps {
    dataMovies: Movie[];
}

export function MovieList({ dataMovies }: MovieListProps) {
    const location = useLocation();
    const { dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes } = useDataConfigurationTmdb();
    
    return (
        <div className={style.imageGallery}>
            {
                dataMovies.map(({ id, title, poster_path,release_date,vote_average }) => (
                    <Link className={style.imageGalleryItem} key={id} to={`/movies/${id}`} state={{ from: location }}>
                        <img className={style["imageGalleryItem-image"]} src={ApiTmdb.getUrlSizePoster(dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes, poster_path)} alt={title} />
                        <p className={style["p-title"]}>{title} {release_date.split('-')[0]}</p>
                        <p className={style["vote-average"]}>{vote_average.toFixed(1)}</p>
                    </Link>
                ))
            }
        </div>
    );
};