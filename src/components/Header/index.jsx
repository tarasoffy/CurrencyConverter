import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ExchangReates } from "../Exchange-rates";
import "./Header.css";

export const Header = () => {

  const {converter} = useSelector((item) => item);

  const [date, setDate] = useState(null);

  const reverseDate = () => {
    const splitDate = converter.date.split("-");
    splitDate.reverse();
    const joinDate = splitDate.join(".");
    setDate(joinDate);
  }


  useEffect(() => {
    if(converter.date) {
      reverseDate();
    }
  }, [converter.date]);

 
  return (
    <header>
      <div className="header">
        {converter.requestStatus === "pending" && <div className="loader">Загрузка...</div>}

        {converter.requestStatus === "fulfilled" && (
          <div className="currency-header">
            <h1>
              Курс валюты к гривне на{" "}
              <span className="exchange-date">{date}</span>
            </h1>
            <ExchangReates
              currency={converter.currencyUSD.currency}
              rate={converter.currencyUSD.rate}
            />
            <ExchangReates
              currency={converter.currencyEUR.currency}
              rate={converter.currencyEUR.rate}
            />
          </div>
        )}
      </div>
    </header>
  );
};
