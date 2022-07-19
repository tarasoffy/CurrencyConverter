import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { currencySelection, fetchConverter, converter } from '../../store/converterSlice'
import './Converter.css'

export const Converter = ({currency, field, fieldsState}) => {

    const dispatch = useDispatch()

    const rate = useSelector(item => item.converter.rate)

    useEffect(() => {
      dispatch(converter({field: field, num: null, type: 'select'}))
    }, [rate])

    const stateCurrency = useSelector(item => item.converter.currency)

    useEffect(() => {
      dispatch(fetchConverter({first: stateCurrency.firstSelect, second: stateCurrency.secondSelect}))
    },[currency])

  return (
    <div className='converter'>
        <label>
          <select value={currency} onChange={e => dispatch(currencySelection({currency: e.target.value, field: field}))}>
            <option value="USD">USD (Доллар США)</option>
            <option value="EUR">EUR (Евро)</option>
            <option value="UAH">UAH (Украинская гривна)</option>
            <option value="GBP">GBP (Фунт стерлингов)</option>
            <option value="JPY">JPY (Японская иена)</option>
          </select>
        </label>
        <input type="number" value={fieldsState} onChange={e => dispatch(converter({field: field, num: e.target.value, type: 'field'}))}/>
    </div>
  )
}
