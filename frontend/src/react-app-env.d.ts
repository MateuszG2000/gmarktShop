/// <reference types="react-scripts" />
interface RootState {
  cart: CartState;
  user: UserState;
  UI: UIState;
}
interface Error {
  statusCode: number;
  data: string;
  message?: string;
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
}
interface IShipping {
  _id: key;
  name: string;
  price: number;
  company: string;
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
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  phoneNumber: string;
  email: string;
}
interface UserState {
  email: string;
  name: string;
  userId: string;
  exp: number;
  loggedIn: boolean;
  type: string;
  addressState?: boolean;
  address: Address;
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
