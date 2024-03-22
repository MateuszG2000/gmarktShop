export function getRandomCategory(categories: {
  [key: string]: number;
}): string | null {
  let categoryNames: string[] = Object.keys(categories);
  let weights: number[] = Object.values(categories);
  if (categoryNames.length !== weights.length) {
    console.log(
      'Error: Number of categories does not match number of weights.'
    );
    return null;
  }
  let totalWeight: number = weights.reduce((a, b) => a + b, 0);
  let randomValue: number = Math.random() * totalWeight;
  let currentSum: number = 0;
  for (let i = 0; i < categoryNames.length; i++) {
    currentSum += weights[i];
    if (randomValue <= currentSum) {
      return categoryNames[i];
    }
  }
  return null;
}
let categories: { [key: string]: number } = {
  'Desktop Computers': 10,
  Monitors: 5,
  Laptops: 7,
  Headphones: 8,
};

let randomCategory: string | null = getRandomCategory(categories);
console.log('Random category:', randomCategory);
