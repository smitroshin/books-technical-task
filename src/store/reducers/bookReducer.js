import { createReducer } from '@reduxjs/toolkit';
import { BOOK_GET_LIST, BOOK_CLEAR_STORE } from '../actionTypes';

const initialState = {
  list: [],
};

const bookReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(BOOK_GET_LIST, (state, action) => {
      state.list = action.payload;
    })
    .addCase(BOOK_CLEAR_STORE, () => initialState);
});

export default bookReducer;
