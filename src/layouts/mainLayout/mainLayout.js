import React from 'react';
import PropTypes from 'prop-types';
import { ReadOutlined, HeartFilled } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { useRouteMatch, Link } from 'react-router-dom';
import Router from '../../router';

import './mainLayout.scss';

const linksMap = {
  '/books': 'books',
  '/favorites': 'favorites',
};

const MainLayout = (props) => {
  const { routes } = props;
  const routeMatch = useRouteMatch();

  return (
    <Layout className="main-layout">
      <header className="mb-4">
        <nav>
          <Menu
            selectedKeys={linksMap[routeMatch.url]}
            mode="horizontal"
            className="d-flex justify-content-center"
          >
            <Menu.Item
              key="books"
              icon={<ReadOutlined className="menu-icon" />}
            >
              <Link to="/books">Books</Link>
            </Menu.Item>
            <Menu.Item
              key="favorites"
              icon={<HeartFilled className="menu-icon" />}
            >
              <Link to="/favorites">Favorites</Link>
            </Menu.Item>
          </Menu>
        </nav>
      </header>
      <Layout.Content>
        <Router routes={routes} />
      </Layout.Content>
    </Layout>
  );
};

MainLayout.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default MainLayout;
