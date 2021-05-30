import { Dish } from "./Dish";
import { Restaurant } from "./Restaurant";

export default interface Order {
  id: number;
  status: number;
  date: string;
  price: number;
  restaurant: Restaurant;
  orderedDishes: Dish[];
}
