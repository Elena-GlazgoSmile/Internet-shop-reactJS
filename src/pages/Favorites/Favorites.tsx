import { Link } from 'react-router-dom';
import useFavoritesStore from '../../store/favoritesStore';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Favorites.css';

const Favorites = () => {
  const { items, clearFavorites } = useFavoritesStore();

  const handleClearFavorites = () => {
    clearFavorites();
    window.location.reload();
  };

  if (items.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>Избранное пусто</h2>
        <p>Добавляйте товары в избранное, чтобы не потерять</p>
        <Link to="/" className="back-link">Вернуться в каталог</Link>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h1>Избранное</h1>
      <button onClick={handleClearFavorites} className="clear-favorites">
        Очистить всё
      </button>
      <div className="favorites-grid">
        {items.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;