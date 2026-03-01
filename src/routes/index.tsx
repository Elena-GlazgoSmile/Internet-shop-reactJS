import SearchPage from '../pages/SearchPage/SearchPage';
import CategoryPage from '../pages/CategoryPage/CategoryPage';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Cart from '../pages/Cart/Cart';
import Product from '../pages/Product/Product';
import NotFound from '../pages/NotFound/NotFound';


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
      { path: 'category/:categoryName', element: <CategoryPage /> },
      { path: 'search', element: <SearchPage /> },
    ],
  },
]);

export default router;