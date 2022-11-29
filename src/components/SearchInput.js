import React from "react";

function SearchInput({ onChange, onClick, searchCurrency }) {
  return (
    <>
      <input
        className="input-search"
        type="text"
        placeholder="Search..."
        onChange={onChange}
      ></input>
      &nbsp;
      <span className="search-result" onClick={onClick}>
        {searchCurrency}
      </span>
    </>
  );
}

export default SearchInput;
