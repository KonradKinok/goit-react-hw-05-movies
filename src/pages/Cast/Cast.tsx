import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import { Loader } from "../../components/Loader/Loader";
import scss from "./Cast.module.scss";

interface CastMember {
  profile_path: string | null;
  name: string;
  character: string | null;
}

export default function Cast() {
  const { id } = useParams<{ id: string }>();
  const [loader, setLoader] = useState<boolean>(true);
  const [dataCast, setDataCast] = useState<CastMember[]>([]);
  const {
    dataConfigurationBaseUrlToPoster,
    dataConfigurationPosterSizes,
    language,
  } = useDataConfigurationTmdb();

  useEffect(() => {
    if (id) {
      setLoader(true);
      ApiTmdb.getMovieCastTmdbApi(id, language.language)
        .then((data) => {
          setDataCast(data.cast);
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
  }, [id]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <ul className={scss["image-cast-gallery"]}>
          {dataCast && dataCast.length > 0 ? (
            dataCast.map(({ profile_path, name, character }, index) => (
              <li className={scss["image-gallery-item"]} key={index}>
                <img
                  className={scss["image-gallery-item-image"]}
                  src={ApiTmdb.getUrlSizePoster(
                    dataConfigurationBaseUrlToPoster,
                    dataConfigurationPosterSizes,
                    profile_path,
                    language.pictureNoData,
                  )}
                  alt={name}
                />
                <p>
                  {name}{" "}
                  {character && (
                    <span>
                      {language.castAs} {character}
                    </span>
                  )}
                </p>
              </li>
            ))
          ) : (
            <li className={scss["no-cast-text"]}>{language.noCast}</li>
          )}
        </ul>
      )}
    </>
  );
}
