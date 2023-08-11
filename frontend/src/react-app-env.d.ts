/// <reference types="react-scripts" />
interface Product {
  _id: key;
  name: String;
  price?: Number;
  image?: String;
  category?: String;
  createdAt?: String;
  description?: String;
  inStock?: Number;
  updatedAt?: String;
}

interface ItemState {
  items: Product[];
  totalQuantity: Number;
  changed: boolean;
}
interface ICartProduct {
  _id: key;
  name: String;
  price?: Number;
  image?: String;
  inStock?: Number;
}
