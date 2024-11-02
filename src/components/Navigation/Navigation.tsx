import React from "react";
import { NavLink } from "react-router-dom";
import { useDataConfigurationTmdb } from "../TmdbConfigurationContext/TmdbConfigurationContext";
import { languageList, en_language, pl_language } from "../Constans/Constans";

interface NavigationProps {
  classNames: any;
  onLinkClick?: () => void; // Opcjonalny prop
}

export const Navigation: React.FC<NavigationProps> = ({
  classNames,
  onLinkClick,
}) => {
  const { nav, pLanguage, active } = classNames;
  const { language, setLanguage } = useDataConfigurationTmdb();

  const changeLanguage = () => {
    const newLanguage =
      language.language === languageList.ENG ? pl_language : en_language;
    setLanguage(newLanguage);
    if (onLinkClick) onLinkClick();
  };

  return (
    <nav className={nav}>
      <p className={pLanguage} onClick={changeLanguage}>
        {language.language}
      </p>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? active : "")}
        onClick={onLinkClick}>
        {language.navHome}
      </NavLink>
      <NavLink
        to="movies"
        className={({ isActive }) => (isActive ? active : "")}
        onClick={onLinkClick}>
        {language.navMovies}
      </NavLink>
    </nav>
  );
};
