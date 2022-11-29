import React from "react";

function Select({ value, currenciesList, onChange, from, to }) {
  let name;
  from ? (name = "from-symbols") : (name = "to-symbols");
  return (
    <>
      <select value={value} name={name} id={name} onChange={onChange}>
        {Object.keys(currenciesList).map((key, index) => {
          return (
            <option value={key} key={index}>
              {key}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default Select;
