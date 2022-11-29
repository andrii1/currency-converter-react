import logo from "./logo.svg";
import "./App.css";
import CurrencyConverter from "./components/CurrencyConverter";
import { CurrencyProvider } from "./CurrencyContext";

function App() {
  return (
    <div className="App">
      <CurrencyProvider>
        <CurrencyConverter />
      </CurrencyProvider>
    </div>
  );
}

export default App;
