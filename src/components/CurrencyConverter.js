import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./styles.css";
var myHeaders = new Headers();
myHeaders.append("apikey", "HT4t5cXeIq5Ea1GqgIXmSkSnsVrGi1x1");

var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

function CurrencyConverter() {
  const [fromCurrencyAmount, setFromCurrencyAmount] = useState("");
  const [toCurrencyAmount, setToCurrencyAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  async function convertCurrency() {
    const finalCurrency = fromCurrencyAmount * 5;
    const text = await fetchCurrency();
  }

  const fetchCurrency = async (amount) => {
    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`,
      requestOptions
    );
    const data = await response.json();
    console.log(data.result);
    setToCurrencyAmount(data.result);
  };

  return (
    <div className="main-container">
      <h1>Currency converter</h1>
      <div className="form">
        <input
          type="text"
          onChange={(e) => setFromCurrencyAmount(e.target.value)}
        ></input>{" "}
        USD
        <br />
        <button onClick={() => fetchCurrency(fromCurrencyAmount)}>
          Convert
        </button>
        <br />
        <input type="text" value={toCurrencyAmount} /> EUR
      </div>
    </div>
  );
}

export default CurrencyConverter;
