import React, { useState } from 'react';

import { ResetCrossIcon } from '../ResetCrossIcon/ResetCrossIcon';

import './searchInput.scss';

export const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Отправить searchTerm на сервер
    console.log('Поиск по:', searchTerm);
    setSearchTerm('');
  };

  const handleClearInput = () => {
    setSearchTerm('');
  };

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <input
        className="searchForm__input"
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className="searchForm__reset-button" type="reset" onClick={handleClearInput}>
        <ResetCrossIcon />
      </button>
    </form>
  );
};
