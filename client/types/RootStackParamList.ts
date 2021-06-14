import {
  Restaurant as RestaurantType,
  Dish as DishType,
  User as UserType,
  HistoricalOrder as OrderType,
  DeliveryMan as DeliveryManType,
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
  Orders: Record<string, never>;
  RestaurantOrder: { orderInfo: OrderType };
  PasswordChange: Record<string, never>;
  DeliveryMan: Record<string, never>;
  DeliveryMap: Record<string, never>;
  DeliveryList: Record<string, never>;
  DeliveryOrder: { orderInfo: OrderType };
  DeliveryManPicker: {
    setDeliveryMan: (x: DeliveryManType) => void;
  };
};
