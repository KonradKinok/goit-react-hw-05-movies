import React, { Suspense } from "react";
import { Outlet, NavLink } from "react-router-dom";
import style from "./SharedLayout.module.scss";
import { FaFilm } from "react-icons/fa6";
import { Loader } from "../Loader/Loader";
export const SharedLayout: React.FC = () => {
    return (
        <div className={style.bodyContainer}>
            <header className={style.header}>
                <div className={style.title}>
                    <FaFilm color={"rgb(255, 69, 0)"} size={50} />
                    <p>Film Library</p>
                </div>
                <nav>
                    <NavLink to="/" className={(navData) => navData.isActive ? style.active : ""}>Home</NavLink>
                    <NavLink to="movies" className={(navData) => navData.isActive ? style.active : ""}>Movies</NavLink>
                </nav>
            </header>

            <main className={style.main}>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>

        </div>
    );
};