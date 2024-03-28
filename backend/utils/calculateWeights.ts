interface IuserData {
  gender: string;
  cartCategory: string | null;
  averagePriceInCart: number | null;
  historyCategory: string | null;
  averagePriceInHistory: number | null;
  userCity: string | null;
}
interface Option {
  isOn: boolean;
  quantity: string;
  category?: string | null;
  price?: number | null;
  weight: number;
}
interface OptionPrice {
  isOn: boolean;
  quantity: string;
  weight: number;
}

interface City {
  name: string;
  weight: number;
  quantity: string;
  category: string;
  _id: string;
}

interface IConfig {
  maleOptions: Option;
  femaleOptions: Option;
  basketCategoryOptions: Option;
  basketPriceOptions: OptionPrice;
  historyCategoryOptions: Option;
  historyPriceOptions: OptionPrice;
  cities: City[];
  priceDeviation: number;
}

interface ICategories {
  name: string;
  weight: number;
}

export default function calculateWeights(
  userMatchingData: IuserData,
  config: IConfig,
  categories: ICategories[]
): ICategories[] {
  config.basketCategoryOptions.category = userMatchingData.cartCategory;
  config.historyCategoryOptions.category = userMatchingData.historyCategory;
  const options = Object.values(config);
  for (const option of options) {
    if (option.isOn && option.category) {
      let points = option.weight;
      if (option.quantity === 'less') {
        points = -points;
      }
      const element = categories.find((el) => el.name === option.category);
      if (element) {
        element.weight += points;
      } else {
        categories.push({ name: option.category, weight: points });
      }
    }
  }
  const city: City | undefined = config.cities.find(
    (city: City) => city.name === userMatchingData.userCity
  );
  if (city && city.category != undefined) {
    const element = categories.find(
      (el: ICategories) => el.name === city.category
    );
    if (element) {
      let points = city.weight;
      if (city.quantity === 'less') points = -points;
      element.weight += points;
    }
  }
  return categories;
}
