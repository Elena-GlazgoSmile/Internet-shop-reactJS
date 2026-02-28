import './ProductCard.css';

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const ProductCard = ({ id, name, price, image }: ProductCardProps) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h3>{name}</h3>
      <p className="price">{price} ₽</p>
      <button 
        className="add-to-cart"
        onClick={() => console.log('Добавлен товар с id:', id)}
      >
        В корзину
      </button>
    </div>
  );
};

export default ProductCard;