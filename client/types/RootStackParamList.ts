import { Restaurant as RestaurantType } from "./Restaurant";

export type RootStackParamList = {
  RestaurantList: { restaurants: RestaurantType[] };
  Restaurant: { restaurantInfo: RestaurantType };
};
