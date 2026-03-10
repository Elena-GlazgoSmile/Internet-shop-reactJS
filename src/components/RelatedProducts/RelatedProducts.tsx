import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, type Product } from '../../api/products';
import './RelatedProducts.css';

type RelatedProductsProps = {
  currentProductId: number;
  categoryId?: number;
};

const RelatedProducts = ({ currentProductId, categoryId }: RelatedProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelated = async () => {
      try {
        const allProducts = await getProducts();

        let related = allProducts.filter(p => p.id !== currentProductId);
        
        if (categoryId) {
          related = related.filter(p => p.categoryId === categoryId);
        }
        
        const shuffled = related.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 4));
      } catch (error) {
        console.error('Ошибка загрузки похожих товаров:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRelated();
  }, [currentProductId, categoryId]);

  if (loading) return <div className="related-loading">Загрузка...</div>;
  if (products.length === 0) return null;

  return (
    <div className="related-products">
      <h2 className="related-title">Вам также может понравиться</h2>
      <div className="related-grid">
        {products.map(product => (
          <Link 
            to={`/product/${product.id}`} 
            key={product.id} 
            className="related-card"
          >
            <div className="related-image-container">
              <img 
                src={product.image} 
                alt={product.name} 
                className="related-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                }}
              />
            </div>
            <h3 className="related-name">{product.name}</h3>
            <p className="related-price">{product.price} ₽</p>
            <div className="related-category">{product.category?.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;