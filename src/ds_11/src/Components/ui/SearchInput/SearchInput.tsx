import React, { FormEventHandler } from 'react';

import { ResetCrossIcon } from '../iconsComponents/ResetCrossIcon/ResetCrossIcon';

import './searchInput.scss';

type Props = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  searchTerm: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  handleClearFunc: () => void;
  error: boolean;
  errorText: string;
};

export const SearchInput = ({ handleSubmit, searchTerm, onChange, handleClearFunc, error, errorText }: Props) => {
  return (
    <>
      <form className="searchForm" onSubmit={handleSubmit}>
        <div className="searchForm__inputContainer">
          <input
            className={`${error ? 'searchForm__input input-error' : 'searchForm__input'}`}
            type="text"
            placeholder="Поиск..."
            value={searchTerm}
            onChange={onChange}
          />
          <button className="searchForm__reset-button" type="reset" onClick={handleClearFunc}>
            <ResetCrossIcon />
          </button>
          <div className="searchForm__error" style={{ fontSize: '18px', display: `${error ? 'block' : 'none'}` }}>
            {errorText}
          </div>
        </div>
      </form>
    </>
  );
};
