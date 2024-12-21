import Chance from 'chance';

const chance = new Chance();

const colors = ['red', 'blue', 'green', 'yellow', 'black'];
const categories = ['Clothing', 'Books', 'Home', 'Sports', 'Toys', 'Beauty', 'Health', 'Furniture', 'Games'];
const imageUrls = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30', // Электроника
  'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg', // Одежда
  'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg', // Мебель
  'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f', // Спорт
  'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg', // Красота
  'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b', // Автомобили
  'https://images.pexels.com/photos/207589/pexels-photo-207589.jpeg', // Игрушки
  'https://images.unsplash.com/photo-1598327105666-5b89351aff97', // Кухонные принадлежности
  'https://images.unsplash.com/photo-1560343090-f0409e92791a', // Ювелирные изделия
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', // Косметика
  'https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg', // Электроника
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f', // Книги
  'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg', // Мебель
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d', // Автомобили
  'https://images.pexels.com/photos/2253835/pexels-photo-2253835.jpeg', // Игрушки
];

export const generateProduct = () => ({
  id: chance.guid(),
  name: chance.word({ length: 5 }),
  description: chance.sentence({ words: 10 }),
  color: chance.pickone(colors),
  category: chance.pickone(categories),
  price: chance.integer({ min: 10, max: 9999 }),
  rating: chance.floating({ min: 0, max: 5, fixed: 1 }),
  imageUrl: chance.pickone(imageUrls),
});

export const generateProducts = (count = 50) => {
  return Array.from({ length: count }, generateProduct);
};