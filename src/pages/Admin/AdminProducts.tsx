import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, type Product } from '../../api/products';
import { getCategories, type Category } from '../../api/categories';
import './Admin.css';

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    categoryId: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [productsData, categoriesData] = await Promise.all([
      getProducts(),
      getCategories()
    ]);
    setProducts(productsData);
    setCategories(categoriesData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        image: formData.image,
        categoryId: Number(formData.categoryId)
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await createProduct(productData);
      }

      setFormData({ name: '', price: '', description: '', image: '', categoryId: '' });
      setEditingProduct(null);
      loadData();
    } catch (error) {
      alert('Ошибка при сохранении');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      image: product.image,
      categoryId: product.categoryId.toString()
    });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Удалить товар?')) {
      try {
        await deleteProduct(id);
        loadData();
      } catch (error) {
        alert('Ошибка при удалении');
      }
    }
  };

  return (
    <div className="admin-products">
      <h1>Управление товарами</h1>

      <form onSubmit={handleSubmit} className="product-form">
        <h2>{editingProduct ? 'Редактировать' : 'Добавить'} товар</h2>
        
        <input
          type="text"
          placeholder="Название"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        
        <input
          type="number"
          placeholder="Цена"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          required
        />
        
        <textarea
          placeholder="Описание"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        
        <input
          type="text"
          placeholder="URL изображения"
          value={formData.image}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
          required
        />
        
        <select
          value={formData.categoryId}
          onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
          required
        >
          <option value="">Выберите категорию</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <button type="submit">
          {editingProduct ? 'Сохранить' : 'Добавить'}
        </button>
        
        {editingProduct && (
          <button type="button" onClick={() => {
            setEditingProduct(null);
            setFormData({ name: '', price: '', description: '', image: '', categoryId: '' });
          }}>
            Отмена
          </button>
        )}
      </form>

      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Категория</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price} ₽</td>
              <td>{product.category?.name}</td>
              <td>
                <button onClick={() => handleEdit(product)}>
                    <img src="/images/edit.jpg" alt="Поиск" className="edit-icon" />
                </button>
                <button onClick={() => handleDelete(product.id)}>
                    <img src="/images/trash.jpg" alt="Поиск" className="trash-icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;