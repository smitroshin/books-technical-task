import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, Image, Descriptions, Tag, Spin, Result, Button } from 'antd';
import API from '../../utils/appAPI';
import history from '../../utils/history';

import './singleBookPage.scss';

const SingleBookPage = () => {
  const { bookId } = useParams();
  const [error, setError] = useState({ status: undefined, message: '' });
  const [bookInfo, setBookInfo] = useState({ isLoaded: false, data: {} });

  useEffect(() => {
    if (bookId)
      API.books
        .getSingle(bookId)
        .then((res) =>
          setBookInfo((prevState) => ({
            ...prevState,
            isLoaded: true,
            data: res.data,
          })),
        )
        .catch((err) => {
          if (err.response.data.error)
            setError((prevState) => ({
              ...prevState,
              status:
                [404, 403, 500].find(
                  (itm) => itm === err.response.data.error.code,
                ) || 'error',
              message: err.response.data.error.message,
            }));
          else
            setError((prevState) => ({
              ...prevState,
              status: 'error',
              message: 'Something went wrong',
            }));
        });
  }, [bookId]);

  const handleGoBack = useCallback(() => history.goBack(), []);

  if (error.status)
    return (
      <Result
        status={error.status}
        title={error.status}
        subTitle={error.message}
        extra={
          <Button type="primary" onClick={handleGoBack}>
            Go back
          </Button>
        }
      />
    );

  if (!bookInfo.isLoaded)
    return (
      <div
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ height: 554 }}
      >
        <Spin />
      </div>
    );

  return (
    <div className="single-book container-fluid mx-auto">
      <Helmet>
        <title>{bookInfo.data.volumeInfo.title} | Search Books</title>
      </Helmet>
      <Card>
        <h2 className="d-inline-block me-2">
          {bookInfo.data.volumeInfo.title}
        </h2>
        {bookInfo.data.volumeInfo.subtitle && (
          <h3 className="d-inline-block text-secondary">
            {bookInfo.data.volumeInfo.subtitle}
          </h3>
        )}
        <div className="row justify-content-between">
          <div className="col-12 col-md-auto">
            <Image
              width={200}
              src={bookInfo.data.volumeInfo?.imageLinks?.thumbnail}
            />
          </div>
          <div className="col">
            <Descriptions title="Details" column={1}>
              <Descriptions.Item label="Language">
                {bookInfo.data.volumeInfo.language}
              </Descriptions.Item>
              <Descriptions.Item label="Author">
                {bookInfo.data.volumeInfo.authors.join(', ')}
              </Descriptions.Item>
              <Descriptions.Item label="Publisher">
                {bookInfo.data.volumeInfo.publisher}
              </Descriptions.Item>
              <Descriptions.Item label="Print type">
                {bookInfo.data.volumeInfo.printType}
              </Descriptions.Item>
              <Descriptions.Item label="Published date">
                {bookInfo.data.volumeInfo.publishedDate}
              </Descriptions.Item>
              <Descriptions.Item label="Page count">
                {bookInfo.data.volumeInfo.pageCount}
              </Descriptions.Item>
              <Descriptions.Item label="Printed page count">
                {bookInfo.data.volumeInfo.printedPageCount}
              </Descriptions.Item>
              <Descriptions.Item label="Categories">
                <div>
                  {bookInfo.data.volumeInfo.categories?.map((itm) => (
                    <Tag key={itm} className="mb-2">
                      {itm}
                    </Tag>
                  ))}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Preview">
                <a
                  href={`${bookInfo.data.volumeInfo.previewLink}&printsec=frontcover`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click to preview
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Description" />
              <Descriptions.Item>
                <div
                  dangerouslySetInnerHTML={{
                    __html: bookInfo.data.volumeInfo.description,
                  }}
                />
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SingleBookPage;
