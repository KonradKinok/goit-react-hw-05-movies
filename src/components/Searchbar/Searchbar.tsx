import "./Searchbar.scss"
import React,{ useState, ChangeEvent, MouseEvent } from "react";
import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";

interface SearchbarProps {
    updateQueryString: (query: string) => void;
}

export function Searchbar({ updateQueryString }: SearchbarProps) {
    const [query, setQuery] = useState<string>("");

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
                placeholder="Search movies"
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

Searchbar.propTypes = {
    updateQueryString: PropTypes.func.isRequired,
};