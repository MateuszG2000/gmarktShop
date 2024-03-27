interface IuserData {
  gender: string;
  cartCategory: string | null;
  averagePriceInCart: number | null;
  historyCategory: string | null;
  averagePriceInHistory: number | null;
}
interface Option {
  isOn: boolean;
  quantity: string;
  category?: string | null;
  price?: number | null;
  weight: number;
}

interface City {
  name: string;
  weight: string;
  quantity: string;
  category: string;
  _id: string;
}

interface IConfig {
  maleOptions: Option;
  femaleOptions: Option;
  basketCategoryOptions: Option;
  basketPriceOptions: Option;
  historyCategoryOptions: Option;
  historyPriceOptions: Option;
  cities: City[];
}
interface ICategories {
  name: string;
  weight: number;
}

export default function calculateWeights(
  userMatchingData: IuserData,
  config: IConfig
): ICategories[] {
  let categories: ICategories[] = [];
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

  return categories;
}
