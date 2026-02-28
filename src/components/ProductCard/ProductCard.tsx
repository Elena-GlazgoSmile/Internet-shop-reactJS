import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image, description, quantity: 1 });
  };

  return (
    <Link to={`/product/${id}`} className="product-card-link">
      <div className="product-card">
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