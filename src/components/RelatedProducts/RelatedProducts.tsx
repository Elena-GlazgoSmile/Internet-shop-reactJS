import { Link } from 'react-router-dom';
import './RelatedProducts.css';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type RelatedProductsProps = {
  currentProductId: number;
  category?: string;
};

const RelatedProducts = ({ currentProductId, category }: RelatedProductsProps) => {
  const allProducts = [
    { id: 1, name: 'Кружка "Программист"', price: 790, image: 'https://placehold.co/200x200/6f42c1/white?text=Кружка' },
    { id: 2, name: 'Футболка React', price: 1590, image: 'https://placehold.co/200x200/6f42c1/white?text=React' },
    { id: 3, name: 'Блокнот для кода', price: 390, image: 'https://placehold.co/200x200/6f42c1/white?text=Блокнот' },
    { id: 4, name: 'Стикеры JS', price: 290, image: 'https://placehold.co/200x200/6f42c1/white?text=JS' },
  ];

  const related = allProducts
    .filter(p => p.id !== currentProductId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="related-products">
      <h2 className="related-title">Похожие товары</h2>
      <div className="related-grid">
        {related.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="related-card">
            <img src={product.image} alt={product.name} className="related-image" />
            <h3 className="related-name">{product.name}</h3>
            <p className="related-price">{product.price} ₽</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;