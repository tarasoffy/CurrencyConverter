import { configureStore } from '@reduxjs/toolkit'
import converterSlice from './converterSlice'


export default configureStore({
    reducer: {
      converter: converterSlice,
    }
  })