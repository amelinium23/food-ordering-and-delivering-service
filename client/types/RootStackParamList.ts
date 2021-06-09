import { Restaurant as RestaurantType } from "../types/ApiResponseTypes";
import { Dish as DishType } from "./Dish";
import { User } from "./User";

export type RootStackParamList = {
  RestaurantList: Record<string, never>;
  Restaurant: { restaurantInfo: RestaurantType };
  Order: { orderInfo: DishType[]; deliveryCost: number };
  User: { user: User };
  History: {
    Order: { orderInfo: DishType[]; deliveryCost: number; summitCost: number };
  };
  Login: Record<string, never>;
  Register: Record<string, never>;
};
