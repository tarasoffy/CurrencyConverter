import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchConverter = createAsyncThunk(
  "converter/fetchConverter",
  async ({ first, second }) => {
    let response = await axios(
      `https://api.fastforex.io//fetch-one?from=${first}&to=${second}&api_key=140c6ff1c1-1a1cd3f413-ri6qp4`
    );
    return response;
  }
);

export const fetchUSD = createAsyncThunk("converter/fetchUSD", async () => {
  let response = await axios(
    "https://api.fastforex.io//fetch-one?from=USD&to=UAH&api_key=140c6ff1c1-1a1cd3f413-ri6qp4"
  );
  return response;
});

export const fetchEUR = createAsyncThunk("converter/fetchEUR", async () => {
  let response = await axios(
    "https://api.fastforex.io//fetch-one?from=EUR&to=UAH&api_key=140c6ff1c1-1a1cd3f413-ri6qp4"
  );
  return response;
});

const converterSlice = createSlice({
  name: "converter",
  initialState: {
    currency: {
      firstSelect: "USD",
      secondSelect: "UAH",
    },
    requestStatus: "pending",
    rate: null,
    currencyUSD: {
      currency: "USD",
      rate: null,
    },
    currencyEUR: {
      currency: "EUR",
      rate: null,
    },
    date: null,
    firstField: "",
    secondField: "",
    firstFieldImage: 'USD',
    secondFieldImage: 'UAH',
  },
  reducers: {
    currencySelection: (state, actions) => {
      if (actions.payload.field === "first") {
        state.currency.firstSelect = actions.payload.currency;
        state.firstFieldImage = actions.payload.currency
      } else {
        state.currency.secondSelect = actions.payload.currency;
        state.secondFieldImage = actions.payload.currency
      }
    },
    converterSliceMethod: (state, actions) => {

      const convertorField = () => {
        if (actions.payload.field === "first") {
          state.firstField = actions.payload.num;
          const num = actions.payload.num * state.rate;
          state.secondField = Math.floor(num * 100) / 100;
        } else {
          state.secondField = actions.payload.num;
          const num = actions.payload.num / state.rate;
          state.firstField = Math.floor(num * 100) / 100;
        }
        if (!actions.payload.num) {
          state.firstField = "";
          state.secondField = "";
        }
      };

      const convertorSelect = () => {
        if (actions.payload.field === "first") {
          const num = state.secondField / state.rate;
          state.firstField = Math.floor(num * 100) / 100;
        } else {
          const num = state.firstField * state.rate;
          state.secondField = Math.floor(num * 100) / 100;
        }
        if (!state.firstField || !state.secondField) {
          state.firstField = "";
          state.secondField = "";
        }
      };

      if (actions.payload.type === "field") {
        convertorField()
      } else {
        convertorSelect()
      }
    },
  },
  extraReducers: {
    [fetchConverter.fulfilled]: (state, actions) => {
      const currency = state.currency.secondSelect;
      let rate = actions.payload.data.result[currency];
      state.rate = rate;
    },
    [fetchUSD.fulfilled]: (state, actions) => {
      const spaceIndex = actions.payload.data.updated.indexOf(" ");
      state.date = actions.payload.data.updated.slice(0, spaceIndex);
      state.currencyUSD.rate = actions.payload.data.result.UAH.toFixed(2);
      state.currencyUSD.currency = "USD";
      state.requestStatus = actions.meta.requestStatus;
    },
    [fetchEUR.fulfilled]: (state, actions) => {
      state.currencyEUR.rate = actions.payload.data.result.UAH.toFixed(2);
      state.currencyEUR.currency = "EUR";
    },
  },
});

export const { currencySelection, newCurrencySelect, converterSliceMethod, convertorFirstField, convertorSecondField } =
  converterSlice.actions;

export default converterSlice.reducer;
