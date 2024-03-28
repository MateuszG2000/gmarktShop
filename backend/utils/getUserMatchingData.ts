import calculateAverage from './calculateAverage';
import checkGender from './checkGender';
import mostFrequentCategory from './mostFrequentCategory';

interface Item {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface Cart {
  items: Item[];
}

interface UserData {
  email: string;
  userId: string;
  exp: number;
  loggedIn: boolean;
  type: string;
  addressState: boolean;
  address: {
    firstName: string;
    lastName: string;
    street: string;
    houseNumber: string;
    zipCode: string;
    city: string;
    phoneNumber: number;
  };
}

interface Data {
  cart: string;
  user: string;
  historyProducts: Item[];
}

export default function getUserMatchingData(data: Data) {
  const cart: Cart = JSON.parse(data.cart);
  const cartItems = cart.items;
  const user: UserData = JSON.parse(data.user);
  const productsInHistory = data.historyProducts;
  //gender
  const gender = checkGender(user.address.firstName);
  //cart category
  const mostFrequentCategoryInCart = mostFrequentCategory(cartItems);
  //cart price
  const averagePriceInCart = calculateAverage(cartItems);
  //history category
  const mostFrequentCategoryInHistory = mostFrequentCategory(productsInHistory);
  //history price
  const averagePriceInHistory = calculateAverage(productsInHistory);

  return {
    gender,
    cartCategory: mostFrequentCategoryInCart,
    averagePriceInCart,
    historyCategory: mostFrequentCategoryInHistory,
    averagePriceInHistory,
    userCity: user.address.city,
  };
}
