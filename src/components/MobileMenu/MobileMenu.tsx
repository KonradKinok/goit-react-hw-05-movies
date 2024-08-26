import React, { Suspense, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { Loader } from "../Loader/Loader";
import { useDataConfigurationTmdb } from "../TmdbConfigurationContext/TmdbConfigurationContext";
import { languageList, en_language, pl_language } from "../Constans/Constans";
import { Footer } from "../Footer/Footer";
import scss from "./MobileMenu.module.scss";
import { Navigation } from "../Navigation/Navigation";
import footerLogoText from '../../images/footer/3KLogo.png';
import footerLogoImage from "../../images/footer/konikMaly24x24Squoosh.png";

export const MobileMenu: React.FC = () => {
    
  const [isMenuMobileModalOpen, setIsMenuMobileModalOpen] = useState<boolean>(false);
  
    
        const handleMenuMobileModalOpen = () => {
          setIsMenuMobileModalOpen(prevState => !prevState);

    //   openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    // openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    // mobileMenu.classList.toggle('is-open');

    // const scrollLockMethod = !isMenuOpen
    //   ? 'disableBodyScroll'
    //   : 'enableBodyScroll';
    // bodyScrollLock[scrollLockMethod](document.body);
  };
const closeModalOnClick = () => {
        setIsMenuMobileModalOpen(false);
    };
  // openMenuBtn.addEventListener('click', toggleMenu);
  // closeMenuBtn.addEventListener('click', toggleMenu);

  // Close the mobile menu on wider screens if the device orientation changes
  // window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
  //   if (!e.matches) return;
  //   mobileMenu.classList.remove('is-open');
  //   openMenuBtn.setAttribute('aria-expanded', false);
  //   bodyScrollLock.enableBodyScroll(document.body);
  // });
    return (
        <>
        <button className={scss["mobile-menu-open"]} type="button" onClick={handleMenuMobileModalOpen}>
          <MdMenu className={scss["mobile-menu-open-icon"]} size={50}/>
        </button>
      
        <div className={`${scss["mobile-menu-container"]} ${isMenuMobileModalOpen ? scss["is-open"] : ""}`}>
          <div className={scss["mobile-menu-wrapper"]}>
            <button className={scss["mobile-menu-close"]} type="button" onClick={handleMenuMobileModalOpen}>
             <IoIosClose className={scss["mobile-menu-close-icon"]} size={32}/>
              </button>
            <Navigation classNames={scss} onLinkClick={ closeModalOnClick} />
            <address className={scss["mobile-menu-contacts"]}>
              <ul >
                <li >
                  <a
                    className={scss["mobile-menu-contacts-tel"]}
                    href="tel:+110001111111"
                  >+11 (000) 111-11-11
                  </a>
                </li>
                <li >
                  <a
                    className={scss["mobile-menu-contacts-mail"]}
                    href="mailto:info@devstudio.com"
                    >info@devstudio.com</a>
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