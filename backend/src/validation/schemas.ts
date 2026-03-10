import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(3, 'Название должно быть не короче 3 символов').max(100, 'Название слишком длинное'),
  price: z.number().positive('Цена должна быть положительной').int('Цена должна быть целым числом'),
  description: z.string().min(10, 'Описание должно быть не короче 10 символов'),
  image: z.string().min(1, 'Путь к изображению обязателен'),
  categoryId: z.number().positive('ID категории должен быть положительным числом')
});

export const ProductUpdateSchema = ProductSchema.partial();

export const CategorySchema = z.object({
  name: z.string().min(2, 'Название категории должно быть не короче 2 символов').max(50, 'Название слишком длинное')
});

export const IdSchema = z.object({
  id: z.number().positive().int()
});