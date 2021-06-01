import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, Image, Descriptions, Tag, Spin } from 'antd';
import API from '../../utils/appAPI';

import './singleBookPage.scss';

const SingleBookPage = () => {
  const { bookId } = useParams();
  const [bookInfo, setBookInfo] = useState();

  useEffect(() => {
    if (bookId)
      API.books.getSingle(bookId).then((res) => setBookInfo(res.data));
  }, [bookId]);

  if (!bookInfo)
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
        <title>{bookInfo.volumeInfo.title} | Search Books</title>
      </Helmet>
      <Card>
        <h2 className="d-inline-block me-2">{bookInfo.volumeInfo.title}</h2>
        {bookInfo.volumeInfo.subtitle && (
          <h3 className="d-inline-block text-secondary">
            {bookInfo.volumeInfo.subtitle}
          </h3>
        )}
        <div className="row justify-content-between">
          <div className="col-12 col-md-auto">
            <Image
              width={200}
              src={bookInfo.volumeInfo?.imageLinks?.thumbnail}
            />
          </div>
          <div className="col">
            <Descriptions title="Details" column={1}>
              <Descriptions.Item label="Language">
                {bookInfo.volumeInfo.language}
              </Descriptions.Item>
              <Descriptions.Item label="Author">
                {bookInfo.volumeInfo.authors.join(', ')}
              </Descriptions.Item>
              <Descriptions.Item label="Publisher">
                {bookInfo.volumeInfo.publisher}
              </Descriptions.Item>
              <Descriptions.Item label="Print type">
                {bookInfo.volumeInfo.printType}
              </Descriptions.Item>
              <Descriptions.Item label="Published date">
                {bookInfo.volumeInfo.publishedDate}
              </Descriptions.Item>
              <Descriptions.Item label="Page count">
                {bookInfo.volumeInfo.pageCount}
              </Descriptions.Item>
              <Descriptions.Item label="Printed page count">
                {bookInfo.volumeInfo.printedPageCount}
              </Descriptions.Item>
              <Descriptions.Item label="Categories">
                <div>
                  {bookInfo.volumeInfo.categories?.map((itm) => (
                    <Tag key={itm} className="mb-2">
                      {itm}
                    </Tag>
                  ))}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Preview">
                <a
                  href={`${bookInfo.volumeInfo.previewLink}&printsec=frontcover`}
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
                    __html: bookInfo.volumeInfo.description,
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
