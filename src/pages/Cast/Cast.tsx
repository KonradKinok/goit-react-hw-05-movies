import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as ApiTmdb from "../../components/ApiTmdb/ApiTmdb";
import { useDataConfigurationTmdb } from "../../components/TmdbConfigurationContext/TmdbConfigurationContext";
import style from "./Cast.module.scss";
import { Loader } from "../../components/Loader/Loader";
interface CastMember {
  profile_path: string | null;
  name: string;
  character: string | null;
}

// Typ dla danych zwracanych przez API
interface MovieCastResponse {
  cast: CastMember[];
}

interface CastProps {}

export default function Cast(props: CastProps) {
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
        <ul className={style["image-cast-gallery"]}>
          {dataCast && dataCast.length > 0 ? (
            dataCast.map(({ profile_path, name, character }, index) => (
              <li className={style.imageGalleryItem} key={index}>
                <img
                  className={style["image-gallery-item-image"]}
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
            <li className={style["no-cast-text"]}>{language.noCast}</li>
          )}
        </ul>
      )}
    </>
  );
}
