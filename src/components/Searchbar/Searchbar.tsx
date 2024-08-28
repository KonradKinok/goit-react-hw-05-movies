import React,{ useState, ChangeEvent, MouseEvent } from "react";

import { FiSearch } from "react-icons/fi";
import "./Searchbar.scss"
import { useDataConfigurationTmdb } from "../TmdbConfigurationContext/TmdbConfigurationContext";
import { useSearchParams } from "react-router-dom";

interface SearchbarProps {
    updateQueryString: (query: string) => void;
}

export function Searchbar({ updateQueryString }: SearchbarProps) {
    const { language } = useDataConfigurationTmdb();
     const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState<string>(searchParams.get("query") || "");

    const clickButtonSearch = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        updateQueryString(query);
    };

    const handleInputSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.currentTarget.value);
    };

    return (
        <form className="container-search">   
            <input
                className="input-search"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder={language.searchbarPlaceholder}
                value={query}
                name="query"
                onChange={handleInputSearchChange}
                />
            <button
                type="submit"
                className="button-search"
                onClick={clickButtonSearch}>
                <FiSearch
                    color={"rgb(255, 69, 0)"}
                    size={18} />
            </button>
        </form> 
    )
};