import { lazy } from 'react';
import MainLayout from '../layouts/mainLayout';

const BooksPage = lazy(() => import('../containers/BooksPage'));
const SingleBookPage = lazy(() => import('../containers/SingleBookPage'));
const FavoritesPage = lazy(() => import('../containers/FavoritesPage'));

const routes = [
  {
    path: '/:par1?/:part2?',
    component: MainLayout,
    public: true,
    routes: [
      {
        path: '/books',
        component: BooksPage,
        exact: true,
        public: true,
      },
      {
        path: '/books/:bookId',
        component: SingleBookPage,
        exact: true,
        public: true,
      },
      {
        path: '/favorites',
        component: FavoritesPage,
        exact: true,
        public: true,
      },
      {
        redirectTo: '/books',
      },
    ],
  },
  {
    redirectTo: '/books',
  },
];

export default routes;
