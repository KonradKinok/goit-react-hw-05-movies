import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as ApiTmdb from "../ApiTmdb/ApiTmdb";
import { languageList, en_language, pl_language } from "../Constans/Constans";
//Context
interface Language {
  language: string;
  pageName: string;
  title: string;
  backlink: string;
  overview: string;
  genres: string;
  noGenres: string;
  userScore: string;
  additionalInfo: string;
  //MovieDetails
  cast: string;
  reviews: string;
  video: string;
  voteCount: string;
  // Movies
  noData: string;
  numberOfResults: string;
  searchbarPlaceholder: string;
  navHome: string;
  navMovies: string;
  // Cast
  castAs: string;
  noCast: string;
  //Reviews
  noReviews: string;
  //Video
  trailers: string;
  trailersLanguage: string;
  // ApiTMdb
  pictureNoData: string;
  //ModalLibraries
  modalLibraries: string;
  //Footer
  footerLibraries: string;
}
interface DataConfigurationTmdbContextType {
  dataConfigurationBaseUrlToPoster: string;
  dataConfigurationPosterSizes: string[];
  language: Language;
  setLanguage: (language: Language) => void;
}

const DataConfigurationTmdb = createContext<
  DataConfigurationTmdbContextType | undefined
>(undefined);
// export const useDataConfigurationTmdb = () => useContext(DataConfigurationTmdb); -jsx
export const useDataConfigurationTmdb =
  (): DataConfigurationTmdbContextType => {
    const context = useContext(DataConfigurationTmdb);
    if (context === undefined) {
      throw new Error(
        "useDataConfigurationTmdb must be used within a DataConfigurationTmdbProvider",
      );
    }
    return context;
  };

interface DataConfigurationTmdbProviderProps {
  children: ReactNode;
}

export const DataConfigurationTmdbProvider: React.FC<
  DataConfigurationTmdbProviderProps
> = ({ children }) => {
  const [
    dataConfigurationBaseUrlToPoster,
    setDataConfigurationBaseUrlToPoster,
  ] = useState<string>("");
  const [dataConfigurationPosterSizes, setConfigurationPosterSizes] = useState<
    string[]
  >([]);
  const [language, setLanguage] = useState<Language>(pl_language);
  useEffect(() => {
    ApiTmdb.getConfigurationTmdbApi()
      .then((data) => {
        setConfigurationPosterSizes(data.images.poster_sizes);
        setDataConfigurationBaseUrlToPoster(data.images.secure_base_url);
      })
      .catch((error) => {
        console.log(
          "%c Error ",
          "color: white; background-color: #D33F49",
          `${error}`,
        );
      });
  }, []);

  return (
    <DataConfigurationTmdb.Provider
      value={{
        dataConfigurationBaseUrlToPoster,
        dataConfigurationPosterSizes,
        language,
        setLanguage,
      }}>
      {children}
    </DataConfigurationTmdb.Provider>
  );
};
