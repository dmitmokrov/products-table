import React from 'react';

const SearchForm = () => (
  <form>
    <label className="visually-hidden" htmlFor="search"></label>
    <input
      className="search-input"
      id="search"
      type="text"
      placeholder="Фильтр по подстроке в имени товара"
    />
    <button className="btn" type="submit">Искать</button>
  </form>
);

export default SearchForm;
