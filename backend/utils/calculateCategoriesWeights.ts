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

export default function calculateCategoriesWeights(data: Data) {
  const cart: Cart = JSON.parse(data.cart);
  const Items = cart.items;
  const user: UserData = JSON.parse(data.user);
  const averagePriceInCart = calculateAverage(cart);
  const mostFrequentCategoryInCart = mostFrequentCategory(Items);
  const mostFrequentCategoryInHistory = mostFrequentCategory(
    data.historyProducts
  );
  const gender = checkGender(user.address.firstName);
  console.log(mostFrequentCategoryInCart, mostFrequentCategoryInHistory);
  return;
}
