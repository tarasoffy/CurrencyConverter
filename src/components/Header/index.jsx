import { useSelector } from "react-redux";
import { ExchangReates } from "../Exchange-rates";
import "./Header.css";

export const Header = () => {
  const currencyUSD = useSelector(item => item.converter.currencyUSD);

  const currencyEUR = useSelector(item => item.converter.currencyEUR);

  const date = useSelector(item => item.converter.date)

  const status = useSelector(item => item.converter.requestStatus);

  return (
    <header>
      <div className="header">

        {status === 'pending' && <div className="loader">Загрузка...</div> }

        {status === 'fulfilled' && 
        <div className="currency-header">
          <h1>Курс валюты к гривне на <span className="exchange-date">{date}</span></h1>
          <ExchangReates currency={currencyUSD.currency} rate={currencyUSD.rate}/>
          <ExchangReates currency={currencyEUR.currency} rate={currencyEUR.rate}/>
        </div>}
        
      </div>
    </header>
  );
};
