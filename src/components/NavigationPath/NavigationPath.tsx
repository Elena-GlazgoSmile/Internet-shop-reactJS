import { Link, useLocation } from 'react-router-dom';
import './NavigationPath.css';

const NavigationPath = () => {
  const location = useLocation();
  
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

  const navigationPath = pathSegments.map((segment, index) => {
    const url = '/' + pathSegments.slice(0, index + 1).join('/');
    
    let displaySegment = decodeURIComponent(segment);
    
    let label = displaySegment;
    if (segment === 'product') {
      label = 'Товар';
    } else if (segment === 'cart') {
      label = 'Корзина';
    } else if (segment === 'favorites') {
      label = 'Избранное';
    } else if (segment === 'category') {
      label = 'Категория';
    } else if (segment === 'канцелярия' || displaySegment === 'канцелярия') {
      label = 'Канцелярия';
    } else if (segment === 'посуда' || displaySegment === 'посуда') {
      label = 'Посуда';
    } else if (segment === 'одежда' || displaySegment === 'одежда') {
      label = 'Одежда';
    }
    
    return { label, url, originalSegment: segment };
  });

  if (pathSegments.length === 0) return null;

  return (
    <nav className="navigationPath">
      <Link to="/" className="navigationPath-link">Главная</Link>
      {navigationPath.map((path, index) => (
        <span key={path.url}>
          <span className="navigationPath-separator">›</span>
          {index === navigationPath.length - 1 ? (
            <span className="navigationPath-current">{path.label}</span>
          ) : (
            path.originalSegment === 'product' || path.originalSegment === 'category' ? (
              <span className="navigationPath-current">{path.label}</span>
            ) : (
              <Link to={path.url} className="navigationPath-link">{path.label}</Link>
            )
          )}
        </span>
      ))}
    </nav>
  );
};

export default NavigationPath;