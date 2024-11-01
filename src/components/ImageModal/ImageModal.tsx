import React, { useEffect } from "react";
import { useDataConfigurationTmdb } from "../TmdbConfigurationContext/TmdbConfigurationContext";
import scss from "./ImageModal.module.scss";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";

interface ModalProps {
  closeModal: () => void;
  isModalLibrariesOpen: boolean;
  poster_path: string | null;
  backdrop_path: string | null;
  title: string;
}

export function ImageModal({
  closeModal,
  isModalLibrariesOpen,
  poster_path,
  backdrop_path,
  title,
}: ModalProps) {
  const { language } = useDataConfigurationTmdb();
  const { dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes } =
    useDataConfigurationTmdb();
  useEffect(() => {
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className={`${scss["modal-libraries-overlay"]} ${isModalLibrariesOpen ? scss["is-open"] : ""} `}
      onClick={handleClickOutside}>
      <div className={scss["modal"]}>
        <div className={scss["container-top-img"]}>
          <img
            className={scss["image"]}
            src={ApiTmdb.getUrlSizePoster(
              dataConfigurationBaseUrlToPoster,
              dataConfigurationPosterSizes,
              poster_path,
              language.pictureNoData,
              "w500",
            )}
            alt={title}
          />
        </div>
        <div className={scss["container-top-img"]}>
          <img
            className={scss["image"]}
            src={ApiTmdb.getUrlSizePoster(
              dataConfigurationBaseUrlToPoster,
              dataConfigurationPosterSizes,
              backdrop_path,
              language.pictureNoData,
              "w500",
            )}
            alt={title}
          />
        </div>
      </div>
    </div>
  );
}
