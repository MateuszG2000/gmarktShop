interface CartItem {
  _id: string;
  name: string;
  price: number;
}

interface Cart {
  items: CartItem[];
}

export default function calculateAverage(cart: Cart): number {
  if (!cart || !cart.items || cart.items.length === 0) {
    return 0;
  }

  const totalPrices: number = cart.items.reduce(
    (acc: number, item: CartItem) => acc + item.price,
    0
  );

  const averagePrice: number = totalPrices / cart.items.length;

  return averagePrice;
}
