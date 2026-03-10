import { Link, Outlet } from 'react-router-dom';
import './Admin.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Панель управления</h2>
        <nav>
          <Link to="/admin/products">Товары</Link>
          <Link to="/admin/categories">Категории</Link>
          <Link to="/admin/orders">Заказы</Link>
          <div className="nav-divider"></div>
          <Link to="/" className="nav-shop">Магазин</Link>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;