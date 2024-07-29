import { useState, useEffect, Suspense } from "react";
import { useParams, useLocation, Outlet, NavLink } from "react-router-dom";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";
import * as globalFunction from "../../globalFunctions/functions"
import style from "./Reviews.module.scss";
export default function Reviews() {
    const { id } = useParams();
    const [dataCast, setDataReviews] = useState([]);


    useEffect(() => {
        ApiTmdb.getMovieReviewsTmdbApi(id)
            .then(data => {
                setDataReviews(data.results);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <ul className={style["reviews-list"]}>
                {
                    dataCast && dataCast.length > 0 ? (dataCast.map(({ author, content, created_at }, index) => (
                        <li key={index}  >
                            <h5>{author}<span>{globalFunction.formatDate(created_at)}</span></h5>
                            <p>{content} </p>
                        </li>
                    ))
                    ) : (
                        <li>There are no reviews yet</li>
                    )
                }
            </ul>
        </>
    )
}