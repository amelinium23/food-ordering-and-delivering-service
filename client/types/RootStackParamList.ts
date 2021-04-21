import { Restaurant as RestaurantType } from "./Restaurant";
import { Dish as DishType } from "./Dish";

export type RootStackParamList = {
  RestaurantList: { restaurants: RestaurantType[] };
  Restaurant: { restaurantInfo: RestaurantType };
  Order: { orderInfo: DishType[]; deliveryCost: number };
};
