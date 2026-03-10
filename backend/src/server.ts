import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { ProductSchema, ProductUpdateSchema, CategorySchema } from './validation/schemas';
import { validate, validateId } from './middleware/validate';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

interface ProductData {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
}

app.get('/api/products', async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении товаров' });
  }
});

app.get('/api/products/:id', validateId, async (req: Request, res: Response) => {
  try {
    const id = (req as any).validatedId;
    
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении товара' });
  }
});

app.post('/api/products', validate(ProductSchema), async (req: Request, res: Response) => {
  try {
    const { name, price, description, image, categoryId } = req.body;
    
    const product = await prisma.product.create({
      data: { name, price, description, image, categoryId },
      include: { category: true }
    });
    
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании товара' });
  }
});

app.put('/api/products/:id', validateId, validate(ProductUpdateSchema), async (req: Request, res: Response) => {
  try {
    const id = (req as any).validatedId;
    const { name, price, description, image, categoryId } = req.body;
    
    const product = await prisma.product.update({
      where: { id },
      data: { name, price, description, image, categoryId },
      include: { category: true }
    });
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении товара' });
  }
});

app.delete('/api/products/:id', validateId, async (req: Request, res: Response) => {
  try {
    const id = (req as any).validatedId;
    
    await prisma.product.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении товара' });
  }
});

app.get('/api/categories', async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: { products: true }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении категорий' });
  }
});

app.get('/api/categories/:id', validateId, async (req: Request, res: Response) => {
  try {
    const id = (req as any).validatedId;
    
    const category = await prisma.category.findUnique({
      where: { id },
      include: { products: true }
    });
    
    if (!category) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении категории' });
  }
});

app.get('/api/categories/:id/products', validateId, async (req: Request, res: Response) => {
  try {
    const id = (req as any).validatedId;
    
    const products = await prisma.product.findMany({
      where: { categoryId: id },
      include: { category: true }
    });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении товаров категории' });
  }
});

app.post('/api/categories', validate(CategorySchema), async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    
    const category = await prisma.category.create({
      data: { name }
    });
    
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании категории' });
  }
});

app.put('/api/categories/:id', validateId, validate(CategorySchema.partial()), async (req: Request, res: Response) => {
  try {
    const id = (req as any).validatedId;
    const { name } = req.body;
    
    const category = await prisma.category.update({
      where: { id },
      data: { name }
    });
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении категории' });
  }
});

app.delete('/api/categories/:id', validateId, async (req: Request, res: Response) => {
  try {
    const id = (req as any).validatedId;
    
    const productsCount = await prisma.product.count({
      where: { categoryId: id }
    });
    
    if (productsCount > 0) {
      return res.status(400).json({ 
        error: 'Нельзя удалить категорию с товарами' 
      });
    }
    
    await prisma.category.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении категории' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});