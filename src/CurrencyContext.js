import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [loadingConvert, setLoadingConvert] = useState(false);
  const [apiError, setApiError] = useState(false);
  const value = {
    loading,
    setLoading,
    loadingConvert,
    setLoadingConvert,
    apiError,
    setApiError,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const currency = useContext(CurrencyContext);
  return currency;
}
