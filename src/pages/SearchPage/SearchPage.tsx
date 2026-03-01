import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import './SearchPage.css';

const products = [
  { 
    id: 1, 
    name: 'Кружка "Программист"', 
    price: 790, 
    description: 'Идеальная кружка для тех, кто пьёт кофе и пишет код.',
    image: 'https://placehold.co/200x200/6f42c1/white?text=Кружка',
    category: 'посуда'
  },
  { 
    id: 2, 
    name: 'Футболка React', 
    price: 1590, 
    description: 'Футболка с логотипом React. 100% хлопок.',
    image: 'https://placehold.co/200x200/6f42c1/white?text=React',
    category: 'одежда'
  },
  { 
    id: 3, 
    name: 'Блокнот для кода', 
    price: 390, 
    description: 'Блокнот в клетку 80 листов для идей и алгоритмов.',
    image: 'https://placehold.co/200x200/6f42c1/white?text=Блокнот',
    category: 'канцелярия'
  },
  { 
    id: 4, 
    name: 'Стикеры JS', 
    price: 290, 
    description: 'Набор стикеров с JavaScript мемами.',
    image: 'https://placehold.co/200x200/6f42c1/white?text=JS',
    category: 'канцелярия'
  },
];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

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