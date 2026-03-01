import { NavLink } from 'react-router-dom';
import './Categories.css';

type CategoriesProps = {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
};

const Categories = ({ selectedCategory, onCategoryChange }: CategoriesProps) => {
  const categories = [
    { id: 'all', name: 'Все товары', path: '/' },
    { id: 'посуда', name: 'Посуда', path: '/category/посуда' },
    { id: 'одежда', name: 'Одежда', path: '/category/одежда' },
    { id: 'канцелярия', name: 'Канцелярия', path: '/category/канцелярия' },
  ];

  return (
    <div className="categories">
      {categories.map(cat => (
        <NavLink
          key={cat.id}
          to={cat.path}
          className={({ isActive }) => 
            `category-link ${isActive ? 'active' : ''}`
          }
          onClick={() => onCategoryChange?.(cat.id)}
        >
          {cat.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Categories;