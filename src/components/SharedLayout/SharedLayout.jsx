import { Outlet, NavLink } from "react-router-dom";
import style from "./SharedLayout.module.scss";
import { Suspense } from "react";
import { FaFilm } from "react-icons/fa6";
export const SharedLayout = () => {
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

            <main >
                <Suspense fallback={<div>Loading page...</div>}>
                    <Outlet />
                </Suspense>
            </main>

        </div>
    );
};