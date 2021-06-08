import { Dish } from "./Dish";
import { Restaurant } from "./Restaurant";

export interface HistoricalOrder {
  id: number;
  status: number;
  date: string;
  price: number;
  restaurant: Restaurant;
  orderedDishes: Dish[];
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
