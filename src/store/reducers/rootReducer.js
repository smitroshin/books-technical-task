import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import favoriteReducer from './favoriteReducer';

const rootReducer = combineReducers({
  book: bookReducer,
  favorite: favoriteReducer,
});

export default rootReducer;
