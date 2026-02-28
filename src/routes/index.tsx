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
    ],
  },
]);

export default router;