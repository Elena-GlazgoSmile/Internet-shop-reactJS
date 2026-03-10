import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import useFavoritesStore from '../../store/favoritesStore';
import Categories from '../Categories/Categories';
import Search from '../Search/Search';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const cartItemsCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const favoritesCount = useFavoritesStore((state) => state.items.length);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link to="/">Мой магазин</Link>
      </div>
      
      <nav className="nav">
        <Link 
          to="/" 
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
        >
          Каталог
        </Link>
        <Link 
          to="/favorites" 
          className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}
        >
          Избранное {favoritesCount > 0 && `(${favoritesCount})`}
        </Link>
        <Link 
          to="/cart" 
          className={`nav-link ${isActive('/cart') ? 'active' : ''}`}
        >
          Корзина {cartItemsCount > 0 && `(${cartItemsCount})`}
        </Link>
      </nav>

      <Categories />
      <Search />
    </header>
  );
};

export default Header;