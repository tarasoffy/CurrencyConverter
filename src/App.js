import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchConverter, fetchUSD, fetchEUR } from "./store/converterSlice";
import "./App.css";
import { Converter } from "./components/Converter";
import { Header } from "./components/Header";

function App() {
  const dispatch = useDispatch();

  const {converter} = useSelector((item) => item);

  useEffect(() => {
    dispatch(
      fetchConverter({
        first: converter.currency.firstSelect,
        second: converter.currency.secondSelect,
      })
    );
    dispatch(fetchUSD());
    dispatch(fetchEUR());
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        <div className="currency">
          <Converter
            currency={converter.currency.firstSelect}
            field="first"
            fieldsState={converter.firstField}
            img={converter.firstFieldImage}
          />
          <Converter
            currency={converter.currency.secondSelect}
            field="second"
            fieldsState={converter.secondField}
            img={converter.secondFieldImage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
