import React, { useCallback, useState } from 'react';
import { Button } from 'antd';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import BookCard from '../../components/bookCard/bookCard';
import { updateFavoritesByIds } from '../../store/actions/favoriteAction';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((store) => ({
    favorites: store.favorite.list,
  }));
  const [favoritesIds, setFavoritesIds] = useState(
    favorites.map((itm) => itm.id),
  );
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  const handleOnFavoriteClick = useCallback(
    (book) => () => {
      setShowSaveBtn(true);
      setFavoritesIds((prevState) =>
        prevState.includes(book.id)
          ? prevState.filter((id) => id !== book.id)
          : [...prevState, book.id],
      );
    },
    [setFavoritesIds],
  );

  const handleSaveBtn = useCallback(() => {
    updateFavoritesByIds(favoritesIds)(dispatch);
    setShowSaveBtn(false);
  }, [dispatch, favoritesIds]);

  return (
    <div>
      <Helmet>
        <title>Favorites | Search Books</title>
      </Helmet>
      {showSaveBtn && (
        <div className="mb-4 text-center">
          <Button type="primary" size="large" onClick={handleSaveBtn}>
            Save
          </Button>
        </div>
      )}
      <div className="container">
        <div className="row gy-4">
          {favorites.map((itm) => (
            <div key={`book-${itm.id}`} className="col-12 col-sm-6 col-lg-3">
              <BookCard
                imageSrc={itm.volumeInfo?.imageLinks?.thumbnail}
                title={itm.volumeInfo.title}
                subtitle={itm.volumeInfo.subtitle}
                searchInfo={itm.searchInfo?.textSnippet}
                liked={favoritesIds.includes(itm.id)}
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

export default FavoritesPage;
