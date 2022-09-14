import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  currencySelection,
  fetchConverter,
  converterSliceMethod,
} from "../../store/converterSlice";
import "./Converter.css";
import { flags } from "../../constants";

export const Converter = ({ currency, field, fieldsState, img }) => {
  const image = flags[img]

  const {converter} = useSelector((item) => item);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(converterSliceMethod({ field, num: null, type: "select" }));
  }, [converter.rate]);

  useEffect(() => {
    dispatch(
      fetchConverter({
        first: converter.currency.firstSelect,
        second: converter.currency.secondSelect,
      })
    );
  }, [currency]);

  return (
    <div className="converter">
      <img src={image} alt="" />
      <label>
        <select
          value={currency}
          onChange={(e) =>
            dispatch(
              currencySelection({ currency: e.target.value, field })
            )
          }
        >
          <option value="USD">USD (Доллар США)</option>
          <option value="EUR">EUR (Евро)</option>
          <option value="UAH">UAH (Украинская гривна)</option>
          <option value="GBP">GBP (Фунт стерлингов)</option>
          <option value="JPY">JPY (Японская иена)</option>
        </select>
      </label>
      <input
        type="number"
        value={fieldsState}
        onChange={(e) =>
          dispatch(
            converterSliceMethod({ field, num: e.target.value, type: "field" })
          )
        }
      />
    </div>
  );
};
