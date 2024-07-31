import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as ApiTmdb from "../ApiTmdb/ApiTmdb.js";
import style from "./MovieList.module.scss";
import { useDataConfigurationTmdb } from "../TmdbConfigurationContext/TmdbConfigurationContext";

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
                dataMovies.map(({ id, title, poster_path }) => (
                    <Link className={style.imageGalleryItem} key={id} to={`/movies/${id}`} state={{ from: location }}>
                        <img className={style["imageGalleryItem-image"]} src={ApiTmdb.getUrlSizePoster(dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes, poster_path)} alt={title} />
                        <p>{title}</p>
                    </Link>
                ))
            }
        </div>
    );
};