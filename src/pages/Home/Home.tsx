import ProductCard from '../../components/ProductCard/ProductCard';

const products = [
  { 
    id: 1, 
    name: 'Кружка "Программист"', 
    price: 790, 
    description: 'Идеальная кружка для тех, кто пьёт кофе и пишет код.',
    image: 'https://placehold.co/200x200/0d6efd/white?text=Кружка' 
  },
  { 
    id: 2, 
    name: 'Футболка React', 
    price: 1590, 
    description: 'Футболка с логотипом React. 100% хлопок.',
    image: 'https://placehold.co/200x200/0d6efd/white?text=React' 
  },
  { 
    id: 3, 
    name: 'Блокнот для кода', 
    price: 390, 
    description: 'Блокнот в клетку 80 листов для идей и алгоритмов.',
    image: 'https://placehold.co/200x200/0d6efd/white?text=Блокнот' 
  },
  { 
    id: 4, 
    name: 'Стикеры JS', 
    price: 290, 
    description: 'Набор стикеров с JavaScript мемами.',
    image: 'https://placehold.co/200x200/0d6efd/white?text=JS' 
  },
];

const Home = () => {
  return (
    <div>
      <h1>Каталог товаров</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Home;