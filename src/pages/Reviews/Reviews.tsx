import React, { useState, useEffect } from "react";
import { useParams, useLocation, Outlet, NavLink } from "react-router-dom";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";
import * as globalFunction from "../../globalFunctions/functions"
import style from "./Reviews.module.scss";

interface Review {
    author: string;
    content: string;
    created_at: string;
}

interface ReviewsApiResponse {
    results: Review[];
}

interface ReviewsProps { }

export default function Reviews(props: ReviewsProps) {
    const { id } = useParams<{ id: string | undefined}>();
    const [dataCast, setDataReviews] = useState<Review[]>([]);


    useEffect(() => {
       if (id) {
         ApiTmdb.getMovieReviewsTmdbApi(id)
             .then((data: ReviewsApiResponse) => {
                 setDataReviews(data.results);
             })
             .catch(error => {
                 console.error(error);
             });
       }
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