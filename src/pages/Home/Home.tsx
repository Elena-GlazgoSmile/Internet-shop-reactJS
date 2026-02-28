import ProductCard from '../../components/ProductCard/ProductCard';

const products = [
  { 
    id: 1, 
    name: 'Кружка "Программист"', 
    price: 790, 
    image: 'https://placehold.co/200x200/0d6efd/white?text=Кружка' 
  },
  { 
    id: 2, 
    name: 'Футболка React', 
    price: 1590, 
    image: 'https://placehold.co/200x200/0d6efd/white?text=React' 
  },
  { 
    id: 3, 
    name: 'Блокнот для кода', 
    price: 390, 
    image: 'https://placehold.co/200x200/0d6efd/white?text=Блокнот' 
  },
  { 
    id: 4, 
    name: 'Стикеры JS', 
    price: 290, 
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