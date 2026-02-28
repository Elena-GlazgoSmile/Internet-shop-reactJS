import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🛍️ Мой магазин</Link>
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">Каталог</Link>
        <Link to="/cart" className="nav-link">Корзина</Link>
      </nav>
    </header>
  );
};

export default Header;