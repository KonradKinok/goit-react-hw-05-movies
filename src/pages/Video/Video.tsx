import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";
import * as globalFunction from "../../globalFunctions/functions";
import style from "./Video.module.scss";
import { MovieTrailer } from "../../components/ApiTmdb/ApiTmdb";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import ReactPlayer from "react-player/lazy";
export default function Video() {
  const { id } = useParams<{ id: string | undefined }>();
  const [dataTrailers, setDataTrailers] = useState<MovieTrailer[]>([]);
  const { language } = useDataConfigurationTmdb();

  function TrailerUrl(site: string, key: string, type: string): string {
    if (site === "YouTube" && type === "Trailer") {
      const url = `https://www.youtube.com/watch?v=${key}`;
      const reactPlayerCanPlay = ReactPlayer.canPlay(url);
      if (reactPlayerCanPlay) {
        return url;
      }
    }
    return "";
  }
  useEffect(() => {
    if (id) {
      ApiTmdb.getMovieTrailerTmdbApi(id, language.language)
        .then((data: MovieTrailer[]) => {
          setDataTrailers(data);
        })
        .catch((error) => {
          console.log(
            "%c Error ",
            "color: white; background-color: #D33F49",
            `${error}`,
          );
        });
    }
  }, [language]);

  return (
    <>
      <ul className={style["video-gallery"]}>
        {dataTrailers && dataTrailers.length > 0 ? (
          dataTrailers.map(
            ({ name, key, site, type }, index) =>
              type === "Trailer" && (
                <li key={index} className={style["video-gallery-item"]}>
                  <ReactPlayer
                    url={TrailerUrl(site, key, type)} // Link do Vimeo
                    height="195px"
                    width="100%"
                    controls // Pokaż kontrolki playera
                    // playing // Automatyczne odtwarzanie
                    className={style["video-gallery-item-video"]}
                    onPause={() => console.log("Wideo zatrzymane!")}
                    onPlay={() => console.log("Wideo odtwarzane!")}
                    onError={() => console.log("Error!")}
                  />
                  <p className={style["video-title"]}>{name} </p>
                </li>
              ),
          )
        ) : (
          <li>There are no reviews yet</li>
        )}
      </ul>
    </>
  );
}
