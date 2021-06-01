import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Input } from 'antd';
import history from '../../utils/history';
import useQuery from '../../hooks/useQuery';
import { clearBookStore, getBookList } from '../../store/actions/bookAction';
import BookCard from '../../components/bookCard/bookCard';
import {
  addToFavorites,
  deleteFromFavorites,
} from '../../store/actions/favoriteAction';
import condStrings from '../../utils/condStrings';

const BooksPage = () => {
  const queryParams = useQuery();
  const query = queryParams.get('q');
  const dispatch = useDispatch();
  const { books, favorites } = useSelector((store) => ({
    books: store.book.list,
    favorites: store.favorite.list,
  }));

  // Clear store in case if no query
  useEffect(() => {
    if (!query) clearBookStore()(dispatch);
  }, [dispatch, query]);

  // Get books
  useEffect(() => {
    if (query) getBookList({ params: { q: query } })(dispatch);
  }, [query, dispatch]);

  const handleSearch = useCallback(
    (value) =>
      history.push({
        pathname: '/books',
        search: `?q=${value}`,
      }),
    [],
  );

  const handleOnFavoriteClick = useCallback(
    (book) => () => {
      if (favorites.some((itm) => itm.id === book.id))
        deleteFromFavorites(book.id)(dispatch);
      else addToFavorites(book)(dispatch);
    },
    [dispatch, favorites],
  );

  return (
    <div>
      <Helmet>
        <title>
          {condStrings(query && `Query "${query}" | `, 'Search Books')}
        </title>
      </Helmet>
      <div className="mb-4 mx-auto" style={{ maxWidth: 350 }}>
        <Input.Search
          placeholder="Type book name..."
          enterButton="Search"
          size="large"
          defaultValue={query}
          onSearch={handleSearch}
        />
      </div>
      <div className="container">
        <div className="row gy-4">
          {books.map((itm) => (
            <div key={`book-${itm.id}`} className="col-12 col-sm-6 col-lg-3">
              <BookCard
                imageSrc={itm.volumeInfo?.imageLinks?.thumbnail}
                title={itm.volumeInfo.title}
                subtitle={itm.volumeInfo.subtitle}
                searchInfo={itm.searchInfo?.textSnippet}
                query={query}
                liked={favorites.some((itm2) => itm2.id === itm.id)}
                onFavoriteClick={handleOnFavoriteClick(itm)}
                detailsLink={`/books/${itm.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
