import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import useFavoritesStore from '../../store/favoritesStore';
import './ProductCard.css';

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

const ProductCard = ({ id, name, price, image, description }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image, description, quantity: 1, category: '' });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({ id, name, price, image, description, category: '' });
  };

  return (
    <Link to={`/product/${id}`} className="product-card-link">
      <div className="product-card">
        <button 
          className={`favorite-button ${isFavorite(id) ? 'active' : ''}`}
          onClick={handleToggleFavorite}
        >
          <img 
            src={isFavorite(id) ? '/images/heart-filled.svg' : '/images/heart-empty.svg'}
            alt={isFavorite(id) ? 'В избранном' : 'Добавить в избранное'}
            className="favorite-icon"
          />
        </button>
        <img src={image} alt={name} className="product-image" />
        <h3>{name}</h3>
        <p className="price">{price} ₽</p>
        <button className="add-to-cart" onClick={handleAddToCart}>
          В корзину
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;