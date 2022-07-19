import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchConverter, fetchUSD, fetchEUR } from './store/converterSlice';
import './App.css';
import { Converter } from './components/Converter';
import { Header } from './components/Header';


function App() {

  const dispatch = useDispatch()

  const currency = useSelector(item => item.converter.currency)

  const firstField = useSelector(item => item.converter.firstField)  

  const secondField = useSelector(item => item.converter.secondField)

  useEffect(() => {
    dispatch(fetchConverter({first: currency.firstSelect, second: currency.secondSelect}))
    dispatch(fetchUSD())
    dispatch(fetchEUR())
  },[])


  return (
    <div className="App">
      <Header />
      <div className='wrapper'>
        <div className='currency'>
          <Converter currency={currency.firstSelect} field='first' fieldsState={firstField}/>
          <Converter currency={currency.secondSelect} field='second' fieldsState={secondField}/>
        </div>
      </div>
    </div>
  );
}

export default App;
