import { RotatingLines } from 'react-loader-spinner';
import React from "react";
import "./Loader.scss"

export const Loader: React.FC = () => {

    return (
        <>
            <div className='container'>
                <RotatingLines
                    visible={true}
                    width="96"
                    strokeColor="#ff4500"
                    strokeWidth="5"
                    ariaLabel="rotating-lines-loading"
                />
            </div>
        </>
    )
};
