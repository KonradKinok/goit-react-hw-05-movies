import { createContext, useContext, useState, useEffect, Suspense } from "react";
import { useParams, useLocation, Outlet, NavLink } from "react-router-dom";
import * as ApiTmdb from "../ApiTmdb/ApiTmdb";
const DataConfigurationTmdb = createContext();
export const useDataConfigurationTmdb = () => useContext(DataConfigurationTmdb);

export const DataConfigurationTmdbProvider = ({ children }) => {
    const [dataConfigurationBaseUrlToPoster, setDataConfigurationBaseUrlToPoster] = useState("");
    const [dataConfigurationPosterSizes, setConfigurationPosterSizes] = useState([]);

    useEffect(() => {
        ApiTmdb.getConfigurationTmdbApi()
            .then(data => {
                setConfigurationPosterSizes(data.images.poster_sizes);
                setDataConfigurationBaseUrlToPoster(data.images.secure_base_url);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <DataConfigurationTmdb.Provider value={{ dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes }}>
            {children}
        </DataConfigurationTmdb.Provider>
    );
};