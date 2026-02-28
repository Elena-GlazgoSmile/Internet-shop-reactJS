import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ padding: '2rem' }}>
        <Outlet /> {}
      </main>
    </>
  );
};

export default Layout;