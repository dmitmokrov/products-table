import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

const SearchForm = () => {
  const [searchStr, setSearchStr] = useState('');
  const searchedStrQueryParameter = new URLSearchParams(useLocation().search)
    .get('search') || '';
  const history = useHistory();

  useEffect(() => {
    setSearchStr(searchedStrQueryParameter);
  }, [searchedStrQueryParameter]);

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      history.push(`?search=${searchStr}`);
    }}>
      <label className="visually-hidden" htmlFor="search"></label>
      <input
        className="search-input"
        id="search"
        type="text"
        placeholder="Фильтр по подстроке в имени товара"
        value={searchStr}
        onChange={(event) => setSearchStr(event.target.value)}
      />
      <button className="btn" type="submit">Искать</button>
    </form>
  );
};

export default SearchForm;
