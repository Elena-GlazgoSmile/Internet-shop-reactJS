import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'посуда' },
      update: {},
      create: { name: 'посуда' }
    }),
    prisma.category.upsert({
      where: { name: 'одежда' },
      update: {},
      create: { name: 'одежда' }
    }),
    prisma.category.upsert({
      where: { name: 'канцелярия' },
      update: {},
      create: { name: 'канцелярия' }
    })
  ]);

  console.log(`Создано категорий: ${categories.length}`);

  const [posuda, odezhda, kantslyariya] = categories;

  const products = [
    {
      name: 'Кружка "Программист"',
      price: 790,
      description: 'Идеальная кружка для тех, кто пьёт кофе и пишет код.',
      image: '/images/Fliqpy.jpg',
      categoryId: posuda.id
    },
    {
      name: 'Футболка React',
      price: 1590,
      description: 'Футболка с логотипом React. 100% хлопок.',
      image: '/images/Lucy.jpg',
      categoryId: odezhda.id
    },
    {
      name: 'Блокнот для кода',
      price: 390,
      description: 'Блокнот в клетку 80 листов для идей и алгоритмов.',
      image: '/images/Mita.jpeg',
      categoryId: kantslyariya.id
    },
    {
      name: 'Стикеры JS',
      price: 290,
      description: 'Набор стикеров с JavaScript мемами.',
      image: '/images/Paint.jpg',
      categoryId: kantslyariya.id
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
    console.log(`Добавлен товар: ${product.name}`);
  }
  
  console.log('База данных успешно заполнена!');
}

main()
  .catch((e) => {
    console.error('Ошибка:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });