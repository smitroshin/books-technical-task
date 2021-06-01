import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import {
  FileSearchOutlined,
  HeartFilled,
  HeartOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import condStrings from '../../utils/condStrings';

import './bookCard.scss';

const FakeButton = ({ ...rest }) => (
  <span role="button" tabIndex={0} onKeyDown={() => {}} {...rest} />
);

function BookCard(props) {
  const {
    className,
    imageSrc,
    title,
    subtitle,
    liked,
    searchInfo,
    query,
    onFavoriteClick,
    detailsLink,
    ...rest
  } = props;

  /**
   * * Google Books API returns searchInfo with html entities and sometimes
   * * don't mark searched value.
   */
  const formattedSearchInfo = useMemo(() => {
    const regExp = new RegExp(`${query}`, 'gi');
    return searchInfo
      .replace(regExp, (match) => `*${match}*`)
      .split('*')
      .map((itm) =>
        regExp.test(itm)
          ? `<span
              class="autocomplete__match fw-bold"
            >
              ${itm}
            </span>`
          : `<span class="autocomplete__not-match">
              ${itm}
            </span>`,
      )
      .join('');
  }, [searchInfo, query]);

  return (
    <Card
      {...rest}
      className={condStrings('book-card', className)}
      cover={
        imageSrc ? (
          <img className="book-card__img" alt="Book cover" src={imageSrc} />
        ) : (
          <div className="h-100 d-flex justify-content-center align-items-center">
            <FileImageOutlined style={{ fontSize: 80 }} />
          </div>
        )
      }
      actions={[
        <Link key="more" to={detailsLink}>
          <FileSearchOutlined className="book-card__action-ic" />
        </Link>,
        <FakeButton key="like" onClick={onFavoriteClick}>
          {liked ? (
            <HeartFilled className="book-card__action-ic" />
          ) : (
            <HeartOutlined className="book-card__action-ic" />
          )}
        </FakeButton>,
      ]}
    >
      <p className={condStrings('fw-bold', subtitle && 'mb-0')}>{title}</p>
      {subtitle && <p>{subtitle}</p>}
      {searchInfo && (
        <p
          dangerouslySetInnerHTML={{
            __html: query ? formattedSearchInfo : searchInfo,
          }}
        />
      )}
    </Card>
  );
}

BookCard.defaultProps = {
  className: '',
  imageSrc: '',
  title: '',
  subtitle: '',
  query: '',
  searchInfo: '',
  liked: false,
  onFavoriteClick: () => null,
  detailsLink: '',
};

BookCard.propTypes = {
  className: PropTypes.string,
  imageSrc: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  searchInfo: PropTypes.string,
  query: PropTypes.string,
  liked: PropTypes.bool,
  onFavoriteClick: PropTypes.func,
  detailsLink: PropTypes.string,
};

export default BookCard;
