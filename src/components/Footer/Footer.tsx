import React, { useState } from "react";
import footerLogoText from "../../images/footer/3KLogo.png";
import footerLogoImage from "../../images/footer/konikMaly24x24Squoosh.png";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import { IoLibrary } from "react-icons/io5";
import { ModalLibraries } from "../ModalLibraries/ModalLibraries";
import scss from "./Footer.module.scss";

export const Footer: React.FC = () => {
  const { language } = useDataConfigurationTmdb();
  const [isModalLibrariesOpen, setIsModalLibrariesOpen] =
    useState<boolean>(false);

  const handleModalLibrariesOpen = () => {
    setIsModalLibrariesOpen((prevState) => !prevState);
  };

  return (
    <footer className={scss["footer"]}>
      <div className={scss["footer-container"]}>
        <div className={scss["footer-logo"]}>
          <img src={footerLogoImage} alt="logoImage" width="24" />
          <img src={footerLogoText} alt="logoText" />
        </div>
        <address className={scss["footer-address"]}>
          <a href="mailto:3k.nexgen@gmail.com">3K.nexgen@gmail.com</a>
        </address>
      </div>

      <div className={scss["footer-container-libraries"]}>
        <div
          className={scss["footer-libraries"]}
          onClick={handleModalLibrariesOpen}>
          <IoLibrary size={32} />
          <small>{language.footerLibraries}</small>
        </div>
      </div>
      <ModalLibraries
        closeModal={handleModalLibrariesOpen}
        isModalLibrariesOpen={isModalLibrariesOpen}
      />
    </footer>
  );
};
