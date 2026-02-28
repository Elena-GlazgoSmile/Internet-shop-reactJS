import { useParams, Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import './Product.css';

const products = [
  { 
    id: 1, 
    name: 'Кружка "Программист"', 
    price: 790, 
    description: 'Идеальная кружка для тех, кто пьёт кофе и пишет код. Не боится горячих напитков и сложных алгоритмов.',
    image: 'https://placehold.co/400x400/0d6efd/white?text=Кружка' 
  },
  { 
    id: 2, 
    name: 'Футболка React', 
    price: 1590, 
    description: 'Футболка с логотипом React. 100% хлопок, дышащая, удобная. Для настоящих фанатов компонентов и хуков.',
    image: 'https://placehold.co/400x400/0d6efd/white?text=React' 
  },
  { 
    id: 3, 
    name: 'Блокнот для кода', 
    price: 390, 
    description: 'Блокнот в клетку 80 листов. Удобно записывать алгоритмы, сниппеты и идеи для проектов.',
    image: 'https://placehold.co/400x400/0d6efd/white?text=Блокнот' 
  },
  { 
    id: 4, 
    name: 'Стикеры JS', 
    price: 290, 
    description: 'Набор стикеров с JavaScript мемами. Укрась ноутбук и порадуй коллег.',
    image: 'https://placehold.co/400x400/0d6efd/white?text=JS' 
  },
];

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="not-found">
        <h2>Товар не найден</h2>
        <Link to="/" className="back-link">Вернуться в каталог</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-detail-price">{product.price} ₽</p>
          <button className="add-to-cart-large" onClick={handleAddToCart}>
            Добавить в корзину
          </button>
          <Link to="/" className="back-to-catalog">
            ← Вернуться в каталог
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;