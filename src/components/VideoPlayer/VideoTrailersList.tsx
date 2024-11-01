import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import * as ApiTmdb from "../ApiTmdb/ApiTmdb";
import * as globalFunction from "../../globalFunctions/functions";
import { MovieTrailer } from "../ApiTmdb/ApiTmdb";
import { useDataConfigurationTmdb } from "../TmdbConfigurationContext/TmdbConfigurationContext";
import ReactPlayer from "react-player";
import { Loader } from "../Loader/Loader";
import { TrailerUrl } from "../ApiTmdb/ApiTmdb";
import scss from "./VideoTrailersList.module.scss";

interface VideoTrailersListProps {
  dataTrailers: MovieTrailer[];
  loader: boolean;
}

export default function VideoTrailersList({
  dataTrailers,
  loader,
}: VideoTrailersListProps) {
  const { id } = useParams<{ id: string | undefined }>();
  // const [dataTrailers, setDataTrailers] = useState<MovieTrailer[]>([]);
  const { language } = useDataConfigurationTmdb();
  // const [loader, setLoader] = useState<boolean>(true);

  // useEffect(() => {
  //   if (id) {
  //     setLoader(true);
  //     ApiTmdb.getMovieTrailerTmdbApi(id, language.language)
  //       .then((data: MovieTrailer[]) => {
  //         setDataTrailers(data);
  //       })
  //       .catch((error) => {
  //         console.log(
  //           "%c Error ",
  //           "color: white; background-color: #D33F49",
  //           `${error}`,
  //         );
  //       })
  //       .finally(() => {
  //         setLoader(false);
  //       });
  //   }
  // }, [language]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        dataTrailers.length > 0 && (
          <ul className={scss["video-gallery"]}>
            {dataTrailers.map(
              ({ name, key, site, type }, index) =>
                type === "Trailer" && (
                  <li key={index} className={scss["video-gallery-item"]}>
                    <ReactPlayer
                      url={TrailerUrl(site, key, type)}
                      height="200px"
                      width="100%"
                      controls // Pokaż kontrolki playera
                      // playing // Automatyczne odtwarzanie
                      className={scss["video-gallery-item-video"]}
                      config={{
                        youtube: {
                          playerVars: {
                            modestbranding: 1,
                            rel: 0,
                            showinfo: 0,
                            iv_load_policy: 3,
                          }, // Ustawienia YouTube do ukrycia logo
                        },
                      }}
                      onPause={() => console.log("Wideo zatrzymane!")}
                      onPlay={() => console.log("Wideo odtwarzane!")}
                      onError={() => console.log("Error!")}
                    />
                  </li>
                ),
            )}
          </ul>
        )
      )}
    </>
  );
}
