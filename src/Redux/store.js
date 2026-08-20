import { configureStore } from '@reduxjs/toolkit'
import  dilsediaryReducer  from './dilsediary'

export const store = configureStore({
  reducer: {
blog:dilsediaryReducer
  },
})