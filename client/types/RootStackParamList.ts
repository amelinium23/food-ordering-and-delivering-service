import { Restaurant as RestaurantType } from "../types/ApiResponseTypes";
import { Dish as DishType } from "./Dish";
import { OrderedItem as OrderedItemType } from "../types/ApiPostTypes";
import { User } from "./User";

export type RootStackParamList = {
  RestaurantList: Record<string, never>;
  Restaurant: { restaurantInfo: RestaurantType };
  Order: { orderInfo: OrderedItemType[]; restaurantInfo: RestaurantType };
  User: { user: User };
  History: {
    Order: { orderInfo: DishType[]; deliveryCost: number; summitCost: number };
  };
  Login: Record<string, never>;
  Register: Record<string, never>;
};
