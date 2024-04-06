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

export default function calculateWeights(userMatchingData: IuserData, config: IConfig, categories: ICategories[]): ICategories[] {
  if (userMatchingData.cartCategory && config.basketCategoryOptions.isOn) {
    let points = config.basketCategoryOptions.weight;
    if (config.basketCategoryOptions.quantity === 'less') {
      points = -points;
    }
    const element = categories.find((el) => el.name === userMatchingData.cartCategory);
    if (element) {
      element.weight += points;
    } else {
      categories.push({ name: userMatchingData.cartCategory, weight: points });
    }
  }
  if (userMatchingData.historyCategory && config.historyCategoryOptions.isOn) {
    let points = config.historyCategoryOptions.weight;
    if (config.historyCategoryOptions.quantity === 'less') {
      points = -points;
    }
    const element = categories.find((el) => el.name === userMatchingData.historyCategory);
    if (element) {
      element.weight += points;
    } else {
      categories.push({ name: userMatchingData.historyCategory, weight: points });
    }
  }
  if (userMatchingData.gender == 'men' && config.maleOptions.isOn && config.maleOptions.category) {
    let points = config.maleOptions.weight;
    if (config.maleOptions.quantity === 'less') {
      points = -points;
    }
    const element = categories.find((el) => el.name === config.maleOptions.category);
    if (element) {
      element.weight += points;
    } else {
      categories.push({ name: config.maleOptions.category, weight: points });
    }
  }
  if (userMatchingData.gender == 'women' && config.femaleOptions.isOn && config.femaleOptions.category) {
    let points = config.femaleOptions.weight;
    if (config.femaleOptions.quantity === 'less') {
      points = -points;
    }
    const element = categories.find((el) => el.name === config.femaleOptions.category);
    if (element) {
      element.weight += points;
    } else {
      categories.push({ name: config.femaleOptions.category, weight: points });
    }
  }
  const city: City | undefined = config.cities.find((city: City) => city.name === userMatchingData.userCity);
  if (city && city.category != undefined) {
    const element = categories.find((el: ICategories) => el.name === city.category);
    if (element) {
      let points = city.weight;
      if (city.quantity === 'less') points = -points;
      element.weight += points;
    }
  }
  return categories;
}
