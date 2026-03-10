import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavigationPath from '../../components/NavigationPath/NavigationPath';
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts';
import useCartStore from '../../store/cartStore';
import { getProduct, type Product as ProductType } from '../../api/products';
import './Product.css';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (!id) return;
    
    getProduct(parseInt(id))
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: 1,
        category: product.category?.name || ''
      });
    }
  };

  if (loading) return <div className="loading">Загрузка товара...</div>;
  
  if (error || !product) {
    return (
      <div className="not-found">
        <h2>Товар не найден</h2>
        <Link to="/" className="back-link">Вернуться в каталог</Link>
      </div>
    );
  }

  return (
    <>
      <div className="product-page">
        <NavigationPath />
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
      <RelatedProducts 
        currentProductId={product.id} 
        categoryId={product.categoryId}
      />
    </>
  );
};

export default Product;