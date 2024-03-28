interface Category {
  name: string;
  weight: number;
}

export function getRandomCategory(categories: Category[]): string | null {
  let totalWeight = 0;
  for (const category of categories) {
    totalWeight += category.weight;
  }

  let randomValue = Math.random() * totalWeight;
  let currentSum = 0;

  for (const category of categories) {
    currentSum += category.weight;
    if (randomValue <= currentSum) {
      return category.name;
    }
  }

  return null;
}

// Przykładowe użycie
// const categories: Category[] = [
//   {
//     name: 'phones',
//     weight: 5,
//   },
//   {
//     name: 'pcs',
//     weight: 5,
//   },
//   {
//     name: 'headphones',
//     weight: 5,
//   },
//   {
//     name: 'accessories',
//     weight: 5,
//   },
//   {
//     name: 'laptops',
//     weight: 5,
//   },
//   {
//     name: 'monitors',
//     weight: 5,
//   },
// ];

// const randomCategory: string | null = getRandomCategory(categories);
// console.log('Random category:', randomCategory);
