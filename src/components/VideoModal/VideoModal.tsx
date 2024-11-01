import React, { useEffect, useState } from "react";
import { useDataConfigurationTmdb } from "../TmdbConfigurationContext/TmdbConfigurationContext";
import scss from "./VideoModal.module.scss";
import { languageList } from "../Constans/Constans";
import * as ApiTmdb from "../ApiTmdb/ApiTmdb";
import { TrailerUrl } from "../ApiTmdb/ApiTmdb";
import ReactPlayer from "react-player";
import { Loader } from "../Loader/Loader";

interface ModalProps {
  closeModal: (movieId: number | null) => void;
  isModalLibrariesOpen: boolean;
  movieId: number | null;
}

export function VideoModal({
  closeModal,
  isModalLibrariesOpen,
  movieId,
}: ModalProps) {
  const { language } = useDataConfigurationTmdb();
  const [loader, setLoader] = useState<boolean>(true);
  const [trailerUrl, setTrailerUrl] = useState<string>();
  const [noTrailer, setNoTrailer] = useState<boolean>(false);
  const handleCloseModal = () => {
    setTrailerUrl(""); // Wyczyść URL, aby zatrzymać odtwarzanie
    closeModal(null);
  };
  useEffect(() => {
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };
  console.log("urlTrailerVideoModalTopFunction", trailerUrl);
  useEffect(() => {
    if (movieId) {
      setLoader(true);
      setNoTrailer(false);
      // Wybieramy język dla pierwszej i drugiej listy trailerów w zależności od wyboru użytkownika
      const primaryLanguage =
        language.language === languageList.PL
          ? languageList.PL
          : languageList.ENG;
      const secondaryLanguage =
        primaryLanguage === languageList.PL
          ? languageList.ENG
          : languageList.PL;

      ApiTmdb.getMovieTrailerTmdbApi(movieId.toString(), primaryLanguage)
        .then((data: ApiTmdb.MovieTrailer[]) => {
          const url = ApiTmdb.FindFirstTrailer(data);
          setTrailerUrl(url);

          if (url === "") {
            ApiTmdb.getMovieTrailerTmdbApi(
              movieId.toString(),
              secondaryLanguage,
            )
              .then((data: ApiTmdb.MovieTrailer[]) => {
                const url = ApiTmdb.FindFirstTrailer(data);
                setTrailerUrl(url);
                const tempBool = url === "";
                setNoTrailer(tempBool);
              })
              .catch((error) => {
                console.log(
                  "%c Error ",
                  "color: white; background-color: #D33F49",
                  `${error}`,
                );
              });
          }
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
  }, [movieId]);

  return (
    <div
      className={`${scss["modal-libraries-overlay"]} ${isModalLibrariesOpen ? scss["is-open"] : ""} `}
      onClick={handleClickOutside}>
      {loader ? (
        <Loader />
      ) : trailerUrl && trailerUrl !== "" ? (
        <div className={scss["modal"]}>
          <ReactPlayer
            url={trailerUrl}
            width="640px"
            height="360px"
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
                }, // Ustawienia YouTube
              },
            }}
            onPause={() => console.log("Wideo zatrzymane!")}
            onPlay={() => console.log("Wideo odtwarzane!")}
            onError={() => console.log("Error!")}
          />
        </div>
      ) : (
        isModalLibrariesOpen &&
        noTrailer && (
          <>
            <p className={scss["modal-libraries-title"]}>
              {language.videoModalNoTrailers}
            </p>
          </>
        )
      )}
    </div>
  );
}
