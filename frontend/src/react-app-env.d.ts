/// <reference types="react-scripts" />
interface RootState {
  cart: CartState;
  user: UserState;
  UI: UIState;
}
interface Product {
  _id: key;
  name: string;
  price: number;
  image: string;
  category?: string;
  createdAt?: string;
  description?: string;
  inStock: number;
  updatedAt?: string;
  quantity?: number;
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
  name: string;
  userId: string;
  exp: number;
  loggedIn: boolean;
}
interface UIState {
  warning: IWarning;
  headerExtendedInfo: IHeaderExtendedInfo;
  searchVisible: boolean;
}
interface IWarning {
  text: string;
  visible: boolean;
  flag: string;
}
interface IHeaderExtendedInfo {
  windowVisible: boolean;
  cartInfoVisible: boolean;
  accountInfoVisible: boolean;
}
interface IUser {
  _id: key;
  email: string;
  userType: string;
  status: string;
}
interface IOrderProduct {
  product: Product;
  quantity: number;
  _id: string;
  price: number;
}
interface IOrder {
  address: Address;
  shipping: IShipping;
  _id: key;
  orderNumber: string;
  orderProducts: [IOrderProduct];
  user: IUser;
  paid: boolean;
  totalPriceWithoutShipping: number;
  createdAt: string;
  updatedAt: Date;
}
