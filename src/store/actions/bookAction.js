import API from '../../utils/appAPI';
import { BOOK_GET_LIST, BOOK_CLEAR_STORE } from '../actionTypes';

export const getBookList = (config) => (dispatch) =>
  API.books
    .getList(config)
    .then((res) => {
      dispatch({
        type: BOOK_GET_LIST,
        payload: res.data.items,
      });
      return Promise.resolve(res);
    })
    .catch((err) => Promise.reject(err));

export const clearBookStore = () => (dispatch) =>
  dispatch({
    type: BOOK_CLEAR_STORE,
  });
