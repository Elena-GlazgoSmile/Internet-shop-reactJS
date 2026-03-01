import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import Categories from '../../components/Categories/Categories';
import './CategoryPage.css';

const products = [
  { 
    id: 1, 
    name: 'Кружка "Программист"', 
    price: 790, 
    description: 'Идеальная кружка для тех, кто пьёт кофе и пишет код.',
    image: 'https://placehold.co/200x200/0d6efd/white?text=Кружка',
    category: 'посуда'
  },
  { 
    id: 2, 
    name: 'Футболка React', 
    price: 1590, 
    description: 'Футболка с логотипом React. 100% хлопок.',
    image: 'https://placehold.co/200x200/0d6efd/white?text=React',
    category: 'одежда'
  },
  { 
    id: 3, 
    name: 'Блокнот для кода', 
    price: 390, 
    description: 'Блокнот в клетку 80 листов для идей и алгоритмов.',
    image: 'https://placehold.co/200x200/0d6efd/white?text=Блокнот',
    category: 'канцелярия'
  },
  { 
    id: 4, 
    name: 'Стикеры JS', 
    price: 290, 
    description: 'Набор стикеров с JavaScript мемами.',
    image: 'https://placehold.co/200x200/0d6efd/white?text=JS',
    category: 'канцелярия'
  },
];

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

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

  const categoryProducts = products.filter(p => p.category === categoryName);

  const filteredProducts = categoryProducts.filter(product => {
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

  return (
    <div className="category-page">
      <Categories />
      
      <h1 className="category-title">
        {categoryName === 'посуда' && 'Посуда'}
        {categoryName === 'одежда' && 'Одежда'}
        {categoryName === 'канцелярия' && 'Канцелярия'}
      </h1>

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

      {sortedProducts.length === 0 ? (
        <p className="no-products">В этой категории нет товаров</p>
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

export default CategoryPage;