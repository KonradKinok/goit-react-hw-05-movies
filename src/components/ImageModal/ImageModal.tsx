import React, { useEffect } from "react";
import { useDataConfigurationTmdb } from "../TmdbConfigurationContext/TmdbConfigurationContext";
import scss from "./ImageModal.module.scss";

interface ModalProps {
  closeModal: () => void;
  isModalLibrariesOpen: boolean;
}

export function ImageModal({ closeModal, isModalLibrariesOpen }: ModalProps) {
  const { language } = useDataConfigurationTmdb();
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
        <p className={scss["modal-libraries-title"]}>
          {language.modalLibraries}
        </p>
        <ul className={scss["container-unnumbered-list"]}>
          <li>
            <a
              href="https://react-icons.github.io/react-icons/"
              target="_blank"
              rel="noopener noreferrer">
              React
            </a>
          </li>
          <li>
            <a
              href="https://redux-toolkit.js.org/introduction/getting-started"
              target="_blank"
              rel="noopener noreferrer">
              Redux Toolkit
            </a>
          </li>
          <li>
            <a
              href="https://react-icons.github.io/react-icons/"
              target="_blank"
              rel="noopener noreferrer">
              React Icons
            </a>
          </li>
          <li>
            <a
              href="https://mhnpd.github.io/react-loader-spinner/docs/intro"
              target="_blank"
              rel="noopener noreferrer">
              React Loader Spinner
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Hacker0x01/react-datepicker"
              target="_blank"
              rel="noopener noreferrer">
              React Datepicker
            </a>
          </li>
          <li>
            <a
              href="https://react-select.com/home#creatable"
              target="_blank"
              rel="noopener noreferrer">
              React Select
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
