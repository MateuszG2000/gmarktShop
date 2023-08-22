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
  shipping: IShippingCart;
  totalPrice: number;
  address: Address;
}
interface IShipping {
  id: key;
  name: string;
  price: number;
  cashOnDelivery: boolean;
}
interface IShippingCart extends IShipping {
  price: number | string;
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
interface Address {
  id: number;
  name: string;
  lastName: string;
  street: string;
  code: string;
  city: string;
  tel: string;
  mail: string;
}
