import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";
import * as globalFunction from "../../globalFunctions/functions";
import style from "./Reviews.module.scss";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
interface Review {
  author: string;
  content: string;
  created_at: string;
}
import { Loader } from "../../components/Loader/Loader";
interface ReviewsApiResponse {
  results: Review[];
}

interface ReviewsProps {}

export default function Reviews(props: ReviewsProps) {
  const { id } = useParams<{ id: string | undefined }>();
  const [dataReviews, setDataReviews] = useState<Review[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const { language } = useDataConfigurationTmdb();
  useEffect(() => {
    if (id) {
      setLoader(true);
      ApiTmdb.getMovieReviewsTmdbApi(id, language.language)
        .then((data: ReviewsApiResponse) => {
          setDataReviews(data.results);
        })
        .catch((error) => {
          console.log(
            "%c Error ",
            "color: white; background-color: #D33F49",
            `${error}`,
          );
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, [language]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <ul className={style["reviews-list"]}>
          {dataReviews && dataReviews.length > 0 ? (
            dataReviews.map(({ author, content, created_at }, index) => (
              <li key={index}>
                <h5>
                  {author}
                  <span>{globalFunction.formatDate(created_at)}</span>
                </h5>
                <p>{content} </p>
              </li>
            ))
          ) : (
            <li>{language.noReviews}</li>
          )}
        </ul>
      )}
    </>
  );
}
