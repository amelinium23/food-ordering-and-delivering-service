import { Dish } from "./Dish";
import { Restaurant } from "./Restaurant";
import { User } from "./User";

export interface HistoricalOrder {
  id: number;
  status: number;
  date: string;
  price: number;
  restaurant: Restaurant;
  orderedDishes: Dish[];
}

export interface RestaurantOrder {
  id: number;
  user: User;
  dishes: Dish[];
  status: number;
  orderPlacementDate: string;
  orderDeliveryDate: string;
  deliveryMan: User;
  orderCost: number;
}

export default interface Order {
  restaurantId: number;
  orderedItems: [
    {
      dishId: number;
      orderedExtras: number[];
    }
  ];
  orderCost: number;
}
