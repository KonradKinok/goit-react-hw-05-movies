import { MovieList } from "../../components/MovieList/MovieList";
import style from "./Home.module.scss"
export const Home = () => {
    return (
        <>
            <h1 className={style.text}>Tranding today</h1>
            <MovieList />
        </>
    );
}
