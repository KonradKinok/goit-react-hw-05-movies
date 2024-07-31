import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import style from "./Cast.module.scss";

interface CastMember {
    profile_path: string | null;
    name: string;
    character: string | null;
}

// Typ dla danych zwracanych przez API
interface MovieCastResponse {
    cast: CastMember[];
}

interface CastProps { }

export default function Cast(props: CastProps) {
    const { id } = useParams<{ id: string }>();
    const [dataCast, setDataCast] = useState<CastMember[]>([]);
    const { dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes } = useDataConfigurationTmdb();

    useEffect(() => {
        if (id) {
            ApiTmdb.getMovieCastTmdbApi(id)
                .then(data => {
                    setDataCast(data.cast);
                })
                .catch(error => {
                     console.log(
                    "%c Error ",
                    "color: white; background-color: #D33F49",
                    `${error}`
                    );
                });
        }
    }, [id]);

    return (
        <>
            <ul className={style["image-cast-gallery"]}>
                {
                    dataCast.map(({ profile_path, name, character }, index) => (
                        <li className={style.imageGalleryItem} key={index}  >
                            <img className={style["imageGalleryItem-image"]} src={ApiTmdb.getUrlSizePoster(dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes, profile_path)} alt={name} />
                            <p>{name} {character && <span>as {character}</span>}</p>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}