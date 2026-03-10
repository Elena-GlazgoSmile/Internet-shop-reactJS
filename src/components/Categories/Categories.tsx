import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories, type Category } from '../../api/categories';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    getCategories()
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка загрузки категорий:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <div className="categories-loading">...</div>;

  if (isMobile) {
    return (
      <div className="categories-dropdown">
        <button 
          className="dropdown-button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Категории</span>
          <span style={{ transform: `rotate(${isOpen ? '180deg' : '0'})`, transition: 'transform 0.3s' }}>▼</span>
        </button>
        
        {isOpen && (
          <div className="dropdown-menu">
            <NavLink to="/" onClick={() => setIsOpen(false)}>
              Все товары
            </NavLink>
            {categories.map(cat => (
              <NavLink
                key={cat.id}
                to={`/category/${cat.id}`}
                onClick={() => setIsOpen(false)}
              >
                {cat.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="categories">
      <NavLink to="/" className={({ isActive }) => 
        `category-link ${isActive ? 'active' : ''}`
      }>
        Все товары
      </NavLink>
      
      {categories.map(cat => (
        <NavLink
          key={cat.id}
          to={`/category/${cat.id}`}
          className={({ isActive }) => 
            `category-link ${isActive ? 'active' : ''}`
          }
        >
          {cat.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Categories;