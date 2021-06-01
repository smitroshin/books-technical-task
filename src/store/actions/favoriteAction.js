import {
  ADD_TO_FAVORITES,
  DELETE_FROM_FAVORITES,
  IDS_TO_FAVORITES,
} from '../actionTypes';

export const addToFavorites = (book) => (dispatch) =>
  dispatch({
    type: ADD_TO_FAVORITES,
    payload: book,
  });

export const deleteFromFavorites = (bookId) => (dispatch) =>
  dispatch({
    type: DELETE_FROM_FAVORITES,
    payload: bookId,
  });

export const updateFavoritesByIds = (booksIds) => (dispatch) =>
  dispatch({
    type: IDS_TO_FAVORITES,
    payload: booksIds,
  });
