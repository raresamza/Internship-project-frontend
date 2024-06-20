import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchQuery]); // Focus input on search query change

  return (
    <motion.div
      className="relative flex items-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 600, damping: 15 }}
      whileHover={{ scale: 1.05, x: 20 }}
    >
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-4 text-gray-400"
      />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        className="pl-12 pr-4 py-2 border border-gray-300 rounded-full w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform duration-300 ease-in-out"
      />
    </motion.div>
  );
};

export default SearchBar;
