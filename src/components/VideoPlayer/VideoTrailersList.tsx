import React from "react";
import ReactPlayer from "react-player";
import { MovieTrailer, TrailerUrl } from "../ApiTmdb/ApiTmdb";
import { Loader } from "../Loader/Loader";
import scss from "./VideoTrailersList.module.scss";

interface VideoTrailersListProps {
  dataTrailers: MovieTrailer[];
  loader: boolean;
}

export default function VideoTrailersList({
  dataTrailers,
  loader,
}: VideoTrailersListProps) {
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        dataTrailers.length > 0 && (
          <ul className={scss["video-gallery"]}>
            {dataTrailers.map(
              ({ key, site, type }, index) =>
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
