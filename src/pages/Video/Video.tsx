import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";
import * as globalFunction from "../../globalFunctions/functions";
import scss from "./Video.module.scss";
import { MovieTrailer } from "../../components/ApiTmdb/ApiTmdb";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import ReactPlayer from "react-player";
import { Loader } from "../../components/Loader/Loader";
import VideoTrailersList from "../../components/VideoPlayer/VideoTrailersList";
import { languageList } from "../../components/Constans/Constans";

export default function Video() {
  const { id } = useParams<{ id: string | undefined }>();
  const [dataTrailersPrimary, setDataTrailersPrimary] = useState<
    MovieTrailer[]
  >([]);
  const [dataTrailersSecondary, setDataTrailersSecondary] = useState<
    MovieTrailer[]
  >([]);
  const { language } = useDataConfigurationTmdb();
  const [loader, setLoader] = useState<boolean>(true);

  const [trailersPrimaryMessage, setTrailersPrimaryMessage] =
    useState<string>("");
  const [trailersSecondaryMessage, setTrailersSecondaryMessage] =
    useState<string>("");
  const [noTrailersPrimaryMessage, setNoTrailersPrimaryMessage] =
    useState<string>("");
  const [noTrailersSecondaryMessage, setNoTrailersSecondaryMessage] =
    useState<string>("");
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
      setLoader(true);
      // Wybieramy język dla pierwszej i drugiej listy trailerów w zależności od wyboru użytkownika
      const primaryLanguage =
        language.language === languageList.PL
          ? languageList.PL
          : languageList.ENG;
      const secondaryLanguage =
        primaryLanguage === languageList.PL
          ? languageList.ENG
          : languageList.PL;

      //language
      const value = primaryLanguage === languageList.PL ? "polskim" : "English";
      const valueSecond =
        primaryLanguage === languageList.PL ? "angielskim" : "Polish";

      setTrailersPrimaryMessage(
        language.trailersLanguage.replace("{value}", value),
      );
      setTrailersSecondaryMessage(
        language.trailersLanguage.replace("{value}", valueSecond),
      );
      setNoTrailersPrimaryMessage(language.trailers.replace("{value}", value));
      setNoTrailersSecondaryMessage(
        language.trailers.replace("{value}", valueSecond),
      );

      ApiTmdb.getMovieTrailerTmdbApi(id, primaryLanguage)
        .then((data: MovieTrailer[]) => {
          setDataTrailersPrimary(data);
        })
        .catch((error) => {
          console.log(
            "%c Error ",
            "color: white; background-color: #D33F49",
            `${error}`,
          );
        })
        .finally(() => {
          setLoader(false);
        });
      ApiTmdb.getMovieTrailerTmdbApi(id, secondaryLanguage)
        .then((data: MovieTrailer[]) => {
          setDataTrailersSecondary(data);
        })
        .catch((error) => {
          console.log(
            "%c Error ",
            "color: white; background-color: #D33F49",
            `${error}`,
          );
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, [language]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <hr
            className={scss["video-trailers-separator"]}
            data-text={trailersPrimaryMessage}
          />
          <VideoTrailersList
            dataTrailers={dataTrailersPrimary}
            loader={loader}
          />
          {!loader &&
            dataTrailersPrimary &&
            dataTrailersPrimary.length === 0 && (
              <p className={scss["video-notrailers-text"]}>
                {noTrailersPrimaryMessage}
              </p>
            )}
          <hr
            className={scss["video-trailers-separator"]}
            data-text={trailersSecondaryMessage}
          />
          <VideoTrailersList
            dataTrailers={dataTrailersSecondary}
            loader={loader}
          />
          {!loader &&
            dataTrailersSecondary &&
            dataTrailersSecondary.length === 0 && (
              <p className={scss["video-notrailers-text"]}>
                {noTrailersSecondaryMessage}
              </p>
            )}
        </>
      )}
    </>
  );
}
