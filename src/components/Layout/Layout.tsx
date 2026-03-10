import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Particles from '../Particles/Particles';

const Layout = () => {
  return (
    <>
      <Particles />
      <Header />
      <main style={{ padding: '2rem' }}>
        <Outlet /> {}
      </main>
    </>
  );
};

export default Layout;