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

interface ItemState {
  items: ICartProduct[];
  totalQuantity: number;
  changed: boolean;
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
  cart: ItemState;
}
