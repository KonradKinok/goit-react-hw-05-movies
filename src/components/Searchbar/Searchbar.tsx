import "./Searchbar.scss"
import React,{ useState, ChangeEvent, MouseEvent } from "react";
import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";

interface SearchbarProps {
    handleSearch: (query: string) => void;
}

export function Searchbar({ handleSearch }: SearchbarProps) {
    const [query, setQuery] = useState<string>("");

    const clickButtonSearch = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        handleSearch(query);
    };

    const handleInputSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.currentTarget.value);
    };

    return (
        <header className="searchbar">
            <div className="searchForm">
                
                <input
                    className="searchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                    name="query"
                    onChange={handleInputSearchChange}
                />
                <button type="submit" className="searchForm-button" onClick={clickButtonSearch}>
                    <FiSearch />
                </button>
            </div>
        </header>
    )
};

Searchbar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};