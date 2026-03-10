const API_URL = 'http://localhost:5000/api';

export interface Category {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  products?: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  category?: Category;
}

export interface CreateCategoryData {
  name: string;
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке категорий');
  }
  return response.json();
}

export async function getCategoryWithProducts(id: number): Promise<Category> {
  const response = await fetch(`${API_URL}/categories/${id}`);
  if (!response.ok) {
    throw new Error('Категория не найдена');
  }
  return response.json();
}

export async function getProductsByCategory(id: number): Promise<Product[]> {
  const response = await fetch(`${API_URL}/categories/${id}/products`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке товаров категории');
  }
  return response.json();
}

export async function createCategory(data: CreateCategoryData): Promise<Category> {
  const response = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Ошибка при создании категории');
  }
  return response.json();
}

export async function updateCategory(id: number, data: CreateCategoryData): Promise<Category> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Ошибка при обновлении категории');
  }
  return response.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Ошибка при удалении категории');
  }
}