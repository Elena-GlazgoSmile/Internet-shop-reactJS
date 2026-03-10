import { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory, type Category } from '../../api/categories';
import './Admin.css';

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      alert('Ошибка при загрузке категорий');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, { name: categoryName });
      } else {
        await createCategory({ name: categoryName });
      }
      setCategoryName('');
      setEditingCategory(null);
      loadCategories();
    } catch (error) {
      alert('Ошибка при сохранении');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Удалить категорию?')) {
      try {
        await deleteCategory(id);
        loadCategories();
      } catch (error) {
        alert('Ошибка при удалении');
      }
    }
  };

  return (
    <div className="admin-categories">
      <h1>Управление категориями</h1>

      <form onSubmit={handleSubmit} className="category-form">
        <h2>{editingCategory ? 'Редактировать' : 'Добавить'} категорию</h2>
        
        <input
          type="text"
          placeholder="Название категории"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />

        <button type="submit">
          {editingCategory ? 'Сохранить' : 'Добавить'}
        </button>
        
        {editingCategory && (
          <button type="button" onClick={() => {
            setEditingCategory(null);
            setCategoryName('');
          }}>
            Отмена
          </button>
        )}
      </form>

      <table className="categories-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button onClick={() => handleEdit(category)}>
                    <img src="/images/edit.jpg" alt="Поиск" className="edit-icon" />
                </button>
                <button onClick={() => handleDelete(category.id)}>
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

export default AdminCategories;