import style from "./MovieDetails.module.scss"
import { useParams, useLocation } from "react-router-dom";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb"
import { useState, useEffect } from "react";
export const MovieDetails = () => {
    const { id } = useParams();
    const [dataConfigurationPosterSizes, setConfigurationPosterSizes] = useState([]);
    const [dataConfigurationBaseUrlToPoster, setDataConfigurationBaseUrlToPoster] = useState("");
    const [dataMoviesDetails, setDataMoviesDetails] = useState({});
    const [dataOverview, setDataOverview] = useState("");
    const { title, poster_path } = dataMoviesDetails;
    useEffect(() => {
        ApiTmdb.getConfigurationTmdbApi()
            .then(data => {
                setConfigurationPosterSizes(data.images.poster_sizes);
                console.log("MovieDetails getConfigurationTmdbApi()", data.images.poster_sizes)
                setDataConfigurationBaseUrlToPoster(data.images.secure_base_url)
                console.log("MovieDetails setDataConfigurationBaseUrlToPoster", data.images.secure_base_url)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        ApiTmdb.getMovieDetailsTmdbApi(id)
            .then(data => {
                setDataMoviesDetails(data);
                console.log("setDataMoviesDetails", data)
                setDataOverview(data.overview)
                console.log("setDataOverview", data.overview)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>

            <img className={style["imageGalleryItem-image"]} src={ApiTmdb.getUrlSizePoster(dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes, poster_path, "w185")} alt={title} />
            <p>{title}</p>
        </>
    );
}