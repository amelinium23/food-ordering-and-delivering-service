import {
  Restaurant as RestaurantType,
  Dish as DishType,
  User as UserType,
} from "../types/ApiResponseTypes";
import { OrderedItem as OrderedItemType } from "../types/ApiPostTypes";

export type RootStackParamList = {
  RestaurantList: Record<string, never>;
  Restaurant: { restaurantInfo: RestaurantType };
  Order: { orderInfo: OrderedItemType[]; restaurantInfo: RestaurantType };
  User: { user: UserType };
  History: {
    Order: { orderInfo: DishType[]; deliveryCost: number; summitCost: number };
  };
  Login: Record<string, never>;
  Register: Record<string, never>;
};
