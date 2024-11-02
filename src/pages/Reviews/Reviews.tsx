import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";
import * as globalFunction from "../../globalFunctions/functions";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import { Review, ReviewsResponse } from "../../components/ApiTmdb/ApiTmdb";
import { Loader } from "../../components/Loader/Loader";
import scss from "./Reviews.module.scss";

export default function Reviews() {
  const { id } = useParams<{ id: string | undefined }>();
  const [dataReviews, setDataReviews] = useState<Review[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const { language } = useDataConfigurationTmdb();
  useEffect(() => {
    if (id) {
      setLoader(true);
      ApiTmdb.getMovieReviewsTmdbApi(id, language.language)
        .then((data: ReviewsResponse) => {
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
        <ul className={scss["reviews-list"]}>
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
