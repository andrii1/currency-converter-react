import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Select from "./Select";
import SearchInput from "./SearchInput";
import { useCurrency } from "../CurrencyContext";
import "./ConverterStyles.css";
let myHeaders = new Headers();
myHeaders.append("apikey", "HT4t5cXeIq5Ea1GqgIXmSkSnsVrGi1x1");

let requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

function CurrencyConverter() {
  const {
    loading,
    setLoading,
    loadingConvert,
    setLoadingConvert,
    apiError,
    setApiError,
  } = useCurrency();

  const [inputError, setInputError] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [searchToCurrency, setSearchToCurrency] = useState("");
  const [searchFromCurrency, setSearchFromCurrency] = useState("");
  const [fromCurrencyAmount, setFromCurrencyAmount] = useState("");
  const [toCurrencyAmount, setToCurrencyAmount] = useState("");
  const [currenciesList, setCurrenciesList] = useState("");

  const handleSubmit = (amount) => {
    if (amount.trim().length !== 0) {
      fetchConvertCurrency(amount);
    } else {
      setInputError("Enter currency amount");
    }
  };
  const searchCurrency = (searchInput) => {
    return Object.keys(currenciesList).filter(
      (symbol) => symbol.toLowerCase() === searchInput.toLowerCase()
    );
  };
  const fetchConvertCurrency = async (amount) => {
    setApiError(false);
    try {
      setLoadingConvert(true);
      const response = await fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`,
        requestOptions
      );
      const data = await response.json();
      setLoadingConvert(false);
      setToCurrencyAmount(data.result);
      setSearchToCurrency();
      setSearchFromCurrency();
    } catch (error) {
      setApiError(true);
      console.log(error);
      setLoadingConvert(false);
    }
  };

  const fetchSymbols = async () => {
    setApiError(false);
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.apilayer.com/exchangerates_data/symbols",
        requestOptions
      );
      const data = await response.json();
      setLoading(false);
      setCurrenciesList(data.symbols);
    } catch (error) {
      setApiError(true);
      setLoading(false);
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSymbols();
  }, []);

  return (
    <div className="main-container">
      <h1>Currency converter</h1>
      {apiError && (
        <div style={{ color: `red` }}>
          Some error occurred, while fetching api
        </div>
      )}
      <div className="form">
        <div className="from-currency">
          <input
            className="input-amount"
            placeholder="Amount"
            type="text"
            onChange={(e) => setFromCurrencyAmount(e.target.value)}
          ></input>
          {loading ? (
            <>&nbsp;Loading..</>
          ) : (
            <>
              <label for="from-symbols">&nbsp;From:&nbsp;</label>
              <Select
                from
                value={fromCurrency}
                currenciesList={currenciesList}
                onChange={(e) => setFromCurrency(e.target.value)}
              />
            </>
          )}
          &nbsp;
          <SearchInput
            onChange={(e) =>
              setSearchFromCurrency(searchCurrency(e.target.value))
            }
            onClick={() => setFromCurrency(searchFromCurrency)}
            searchCurrency={searchFromCurrency}
          />
        </div>
        <div className="to-currency">
          <input
            type="text"
            className="input-amount"
            value={loadingConvert ? "Loading.." : toCurrencyAmount}
          />
          <span>{apiError}</span>
          {loading ? (
            <>&nbsp;Loading..</>
          ) : (
            <>
              <label for="to-symbols">&nbsp;To:&nbsp;</label>
              <Select
                to
                value={toCurrency}
                currenciesList={currenciesList}
                onChange={(e) => setToCurrency(e.target.value)}
              />
            </>
          )}
          &nbsp;
          <SearchInput
            onChange={(e) =>
              setSearchToCurrency(searchCurrency(e.target.value))
            }
            onClick={() => setToCurrency(searchToCurrency)}
            searchCurrency={searchToCurrency}
          />
        </div>
        <button onClick={() => handleSubmit(fromCurrencyAmount)}>
          Convert
        </button>
        {inputError && <p style={{ color: "red" }}>{inputError}</p>}
      </div>
    </div>
  );
}

export default CurrencyConverter;
