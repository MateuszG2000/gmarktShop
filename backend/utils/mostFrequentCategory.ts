interface Item {
  _id: string;
  name: string;
  category: string;
  quantity: number;
}

export default function mostFrequentCategory(cart: Item[]): string | null {
  if (!cart || cart.length === 0) {
    return null;
  }
  const categoryCount: { [category: string]: number } = {};
  cart.forEach((item: Item) => {
    if (item.category && item.category.trim() !== '') {
      if (categoryCount[item.category]) {
        categoryCount[item.category] += item.quantity;
      } else {
        categoryCount[item.category] = item.quantity;
      }
    }
  });

  let mostFrequent: string = '';
  let maxCount: number = 0;
  for (const category in categoryCount) {
    if (categoryCount.hasOwnProperty(category)) {
      if (categoryCount[category] > maxCount) {
        maxCount = categoryCount[category];
        mostFrequent = category;
      }
    }
  }
  return mostFrequent;
}
