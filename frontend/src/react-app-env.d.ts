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
  user: UserState;
  UI: UIState;
}
interface Address {
  id: number;
  name: string;
  lastName: string;
  street: string;
  houseNumber: string;
  code: string;
  city: string;
  tel: string;
  email: string;
}
interface UserState {
  email: string;
  userId: string;
  exp: number;
  loggedIn: boolean;
}
interface UIState {
  warning;
}
interface IWarning {
  text: string;
  visible: boolean;
  flag: string;
}
