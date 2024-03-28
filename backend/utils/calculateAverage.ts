interface item {
  _id: string;
  name: string;
  price: number;
}

export default function calculateAverage(items: item[]): number | null {
  if (!items || !items || items.length === 0) {
    return null;
  }

  const totalPrices: number = items.reduce((acc: number, item: item) => acc + item.price, 0);

  const averagePrice: number = totalPrices / items.length;

  return averagePrice;
}
