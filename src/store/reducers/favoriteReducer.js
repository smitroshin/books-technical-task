import { createReducer } from '@reduxjs/toolkit';
import {
  ADD_TO_FAVORITES,
  DELETE_FROM_FAVORITES,
  IDS_TO_FAVORITES,
} from '../actionTypes';

const initialState = {
  list: [],
};

const favoriteReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_TO_FAVORITES, (state, action) => {
      state.list.push(action.payload);
    })
    .addCase(DELETE_FROM_FAVORITES, (state, action) => {
      state.list = state.list.filter((itm) => itm.id !== action.payload);
    })
    .addCase(IDS_TO_FAVORITES, (state, action) => {
      state.list = state.list.filter((itm) => action.payload.includes(itm.id));
    });
});

export default favoriteReducer;
