import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as ApiTmdb from "../ApiTmdb/ApiTmdb";

//Context
interface DataConfigurationTmdbContextType {
    dataConfigurationBaseUrlToPoster: string;
    dataConfigurationPosterSizes: string[];
}

const DataConfigurationTmdb = createContext<DataConfigurationTmdbContextType | undefined>(undefined);
// export const useDataConfigurationTmdb = () => useContext(DataConfigurationTmdb); -jsx
export const useDataConfigurationTmdb = (): DataConfigurationTmdbContextType => {
    const context = useContext(DataConfigurationTmdb);
    if (context === undefined) {
        throw new Error("useDataConfigurationTmdb must be used within a DataConfigurationTmdbProvider");
    }
    return context;
};

interface DataConfigurationTmdbProviderProps {
    children: ReactNode;
}

export const DataConfigurationTmdbProvider: React.FC<DataConfigurationTmdbProviderProps> = ({ children }) => {
    const [dataConfigurationBaseUrlToPoster, setDataConfigurationBaseUrlToPoster] = useState<string>("");
    const [dataConfigurationPosterSizes, setConfigurationPosterSizes] = useState<string[]>([]);

    useEffect(() => {
        ApiTmdb.getConfigurationTmdbApi()
            .then(data => {
                setConfigurationPosterSizes(data.images.poster_sizes);
                setDataConfigurationBaseUrlToPoster(data.images.secure_base_url);
            })
            .catch(error => {
                console.log(
                    "%c Error ",
                    "color: white; background-color: #D33F49",
                    `${error}`
                );
            });
    }, []);

    return (
        <DataConfigurationTmdb.Provider value={{ dataConfigurationBaseUrlToPoster, dataConfigurationPosterSizes }}>
            {children}
        </DataConfigurationTmdb.Provider>
    );
};