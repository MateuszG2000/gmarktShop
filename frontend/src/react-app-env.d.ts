/// <reference types="react-scripts" />
interface Product {
  _id: key;
  name: String;
  price: number;
  image: String;
  category?: String;
  createdAt?: String;
  description?: String;
  inStock: number;
  updatedAt?: String;
}

interface CartState {
  items: ICartProduct[];
  totalQuantity: number;
  shipping: IShipping;
  totalPrice: 0;
}
interface IShipping {
  id: key;
  name: string;
  price: number;
  cashOnDelivery: boolean;
}
interface ICartProduct {
  _id: key;
  name: String;
  price: number;
  image: String;
  inStock: number;
  quantity: number;
}
interface RootState {
  cart: CartState;
}
