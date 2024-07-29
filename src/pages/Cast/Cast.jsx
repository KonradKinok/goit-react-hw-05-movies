import { useState, useEffect, Suspense } from "react";
import { useParams, useLocation, Outlet, NavLink } from "react-router-dom";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import style from "./Cast.module.scss";
export default function Cast() {
    const { id } = useParams();
    const [dataCast, setDataCast] = useState([]);
    const { dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes } = useDataConfigurationTmdb();

    useEffect(() => {
        ApiTmdb.getMovieCastTmdbApi(id)
            .then(data => {
                setDataCast(data.cast);
                console.log("getMovieCastTmdbApi", data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <ul className={style["image-cast-gallery"]}>
                {
                    dataCast.map(({ profile_path, name, character }, index) => (
                        <li className={style.imageGalleryItem} key={index}  >
                            <img className={style["imageGalleryItem-image"]} src={ApiTmdb.getUrlSizePoster(dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes, profile_path)} alt={name} />
                            <p>{name} as {character}</p>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}