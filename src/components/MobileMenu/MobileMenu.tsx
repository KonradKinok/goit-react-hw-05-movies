import React, { useState } from "react";
import footerLogoText from "../../images/footer/3KLogo.png";
import { MdMenu } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { Navigation } from "../Navigation/Navigation";
import scss from "./MobileMenu.module.scss";

export const MobileMenu: React.FC = () => {
  const [isMenuMobileModalOpen, setIsMenuMobileModalOpen] =
    useState<boolean>(false);

  const handleMenuMobileModalOpen = () => {
    setIsMenuMobileModalOpen((prevState) => !prevState);
  };

  const closeModalOnClick = () => {
    setIsMenuMobileModalOpen(false);
  };

  return (
    <>
      <button
        className={scss["mobile-menu-open"]}
        type="button"
        onClick={handleMenuMobileModalOpen}>
        <MdMenu className={scss["mobile-menu-open-icon"]} size={50} />
      </button>

      <div
        className={`${scss["mobile-menu-container"]} ${isMenuMobileModalOpen ? scss["is-open"] : ""}`}>
        <div className={scss["mobile-menu-wrapper"]}>
          <button
            className={scss["mobile-menu-close"]}
            type="button"
            onClick={handleMenuMobileModalOpen}>
            <IoIosClose className={scss["mobile-menu-close-icon"]} size={32} />
          </button>
          <Navigation classNames={scss} onLinkClick={closeModalOnClick} />
          <address className={scss["mobile-menu-contacts"]}>
            <ul>
              <li>
                <a
                  className={scss["mobile-menu-contacts-mail"]}
                  href="mailto:3K.nexgen@gmail.com">
                  3K.nexgen@gmail.com
                </a>
              </li>
            </ul>
            <div className={scss["logo"]}>
              <img src={footerLogoText} alt="logoText" />
            </div>
          </address>
        </div>
      </div>
    </>
  );
};
