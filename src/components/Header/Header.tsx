import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import Categories from '../Categories/Categories';
import Search from '../Search/Search';
import './Header.css';

const Header = () => {
  const cartItemsCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🛍️ Мой магазин</Link>
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">Каталог</Link>
        <Link to="/cart" className="nav-link">
          Корзина {cartItemsCount > 0 && `(${cartItemsCount})`}
        </Link>
      </nav>
      <Categories />
      <Search />
    </header>
  );
};

export default Header;