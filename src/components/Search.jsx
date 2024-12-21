import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  return (
    <div className="search-container relative">
      <div className="search-input-wrapper inline-block w-full max-w-6xl">
        <input
          type="text"
          placeholder="Поиск по названию или описанию"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-96 p-4 pl-5 text-lg border-2 border-primary-color rounded-lg shadow-md outline-none transition-colors duration-300 focus:border-pink-400"
        />
        <FiSearch className="search-icon absolute top-1/2 right-4 transform -translate-y-1/2 text-text-color text-2xl pointer-events-none" />
      </div>
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;