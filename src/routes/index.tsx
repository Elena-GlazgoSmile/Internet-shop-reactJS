import Favorites from '../pages/Favorites/Favorites';
import SearchPage from '../pages/SearchPage/SearchPage';
import CategoryPage from '../pages/CategoryPage/CategoryPage';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Cart from '../pages/Cart/Cart';
import Product from '../pages/Product/Product';
import NotFound from '../pages/NotFound/NotFound';
import AdminLayout from '../pages/Admin/AdminLayout';
import AdminProducts from '../pages/Admin/AdminProducts';
import AdminCategories from '../pages/Admin/AdminCategories';

import Layout from '../components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'cart', element: <Cart /> },
      { path: 'product/:id', element: <Product /> },
      { path: '*', element: <NotFound /> },
      { path: 'category/:id', element: <CategoryPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'favorites', element: <Favorites /> },
    ],
  },

  { 
    path: 'admin', 
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminProducts /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'categories', element: <AdminCategories /> },
    ]
  },
]);

export default router;