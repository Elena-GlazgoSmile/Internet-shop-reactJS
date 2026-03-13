import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getProducts, type Product } from '../../api/products';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts()
      .then(data => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки товаров');
        setLoading(false);
      });
  }, []);

  const searchResults = allProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="search-page">
      <h1 className="search-title">
        Результаты поиска: <span className="search-query">"{query}"</span>
      </h1>
      
      {searchResults.length === 0 ? (
        <div className="no-results">
          <p className="no-results-text">Ничего не найдено</p>
          <Link to="/" className="back-home">Вернуться в каталог</Link>
        </div>
      ) : (
        <>
          <p className="results-count">Найдено товаров: {searchResults.length}</p>
          <div className="search-grid">
            {searchResults.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;