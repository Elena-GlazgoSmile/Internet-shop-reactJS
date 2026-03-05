const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({});

async function main() {
  const products = [
    {
      name: 'Кружка "Программист"',
      price: 790,
      description: 'Идеальная кружка для тех, кто пьёт кофе и пишет код.',
      image: 'https://placehold.co/200x200/6f42c1/white?text=Кружка',
      category: 'посуда'
    },
    {
      name: 'Футболка React',
      price: 1590,
      description: 'Футболка с логотипом React. 100% хлопок.',
      image: 'https://placehold.co/200x200/6f42c1/white?text=React',
      category: 'одежда'
    },
    {
      name: 'Блокнот для кода',
      price: 390,
      description: 'Блокнот в клетку 80 листов для идей и алгоритмов.',
      image: 'https://placehold.co/200x200/6f42c1/white?text=Блокнот',
      category: 'канцелярия'
    },
    {
      name: 'Стикеры JS',
      price: 290,
      description: 'Набор стикеров с JavaScript мемами.',
      image: 'https://placehold.co/200x200/6f42c1/white?text=JS',
      category: 'канцелярия'
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
    console.log(`Добавлен товар: ${product.name}`);
  }

  console.log('База данных успешно заполнена!');
}

main()
  .catch(e => {
    console.error('Ошибка:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });