import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getProducts, type Product } from '../../api/products';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [sortBy, setSortBy] = useState(() => {
    const savedSort = localStorage.getItem('sortBy');
    return savedSort || 'default';
  });

  const [minPrice, setMinPrice] = useState<number | ''>(() => {
    const savedMin = localStorage.getItem('minPrice');
    return savedMin ? Number(savedMin) : '';
  });
  const [maxPrice, setMaxPrice] = useState<number | ''>(() => {
    const savedMax = localStorage.getItem('maxPrice');
    return savedMax ? Number(savedMax) : '';
  });

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
  }, [sortBy]);

  useEffect(() => {
    localStorage.setItem('minPrice', minPrice.toString());
  }, [minPrice]);

  useEffect(() => {
    localStorage.setItem('maxPrice', maxPrice.toString());
  }, [maxPrice]);

  const handleResetFilter = () => {
    setMinPrice('');
    setMaxPrice('');
  };

  const filteredProducts = products.filter(product => {
    if (minPrice !== '' && product.price < minPrice) return false;
    if (maxPrice !== '' && product.price > maxPrice) return false;
    return true;
  });

  const getSortedProducts = () => {
    let sortedProducts = [...filteredProducts];

    switch (sortBy) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sortedProducts.sort((a, b) => a.id - b.id);
    }

    return sortedProducts;
  };

  const sortedProducts = getSortedProducts();

  if (loading) return <div className="loading">Загрузка товаров...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="home">
      <div className="filter-sort-bar">
        <div className="filter-group">
          <label>Цена:</label>
          <input
            type="number"
            placeholder="от"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
            className="price-input"
          />
          <span>—</span>
          <input
            type="number"
            placeholder="до"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
            className="price-input"
          />
          <button onClick={handleResetFilter} className="reset-filter">
            Сбросить
          </button>
        </div>

        <div className="sort-group">
          <label htmlFor="sort">Сортировать:</label>
          <select 
            id="sort" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="default">По умолчанию</option>
            <option value="price-asc">По цене (сначала дешёвые)</option>
            <option value="price-desc">По цене (сначала дорогие)</option>
            <option value="name-asc">По названию (А-Я)</option>
            <option value="name-desc">По названию (Я-А)</option>
          </select>
        </div>
      </div>

      <h1>Каталог товаров</h1>

      {sortedProducts.length === 0 ? (
        <p className="no-products">Товаров не найдено</p>
      ) : (
        <div className="products-grid">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;