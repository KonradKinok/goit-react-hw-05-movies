import React from "react";
import style from "./NotFound.module.scss"

export const NotFound = () => {
    return (
        <>
            <h1 className={style.text}>Page does not exist</h1>
        </>
    );
}

export default NotFound;