import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as ApiTmdb from "../ApiTmdb/ApiTmdb";
import style from "./Movie.module.scss";

export function Movie({ dataMostPopularMovies, dataConfigurationPosterSizes, dataConfigurationBaseUrlToPoster }) {
    return (
        <>
            {
                dataMostPopularMovies.map(({ id, title, poster_path, release_date, genre_ids, vote_average }) => (
                    <Link className={style.imageGalleryItem} key={id} to={`movies/${id}`} state={{ from: location.pathname }}>
                        <img className={style["imageGalleryItem-image"]} src={ApiTmdb.getUrlSizePoster(dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes, poster_path)} alt={title} />
                        <p>{title}</p>
                    </Link>

                ))
            }
        </>
    );
};