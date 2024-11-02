import React, { useEffect } from "react";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import scss from "./ModalLibraries.module.scss";

interface ModalProps {
  closeModal: () => void;
  isModalLibrariesOpen: boolean;
}

export function ModalLibraries({
  closeModal,
  isModalLibrariesOpen,
}: ModalProps) {
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
              href="https://www.npmjs.com/package/react"
              target="_blank"
              rel="noopener noreferrer">
              React
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
              href="https://github.com/ai/nanoid"
              target="_blank"
              rel="noopener noreferrer">
              Nanoid
            </a>
          </li>
          <li>
            <a
              href="https://react-hot-toast.com/"
              target="_blank"
              rel="noopener noreferrer">
              React Hot Toast
            </a>
          </li>
          <li>
            <a
              href="https://axios-http.com/docs/intro"
              target="_blank"
              rel="noopener noreferrer">
              Axios
            </a>
          </li>
          <li>
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noopener noreferrer">
              TypeScript
            </a>
          </li>
          <li>
            <a
              href="https://github.com/cookpete/react-player"
              target="_blank"
              rel="noopener noreferrer">
              React-Player
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
