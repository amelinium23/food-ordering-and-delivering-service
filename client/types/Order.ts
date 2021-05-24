import { Restaurant } from "./Restaurant";

export default interface Order {
  id: number;
  date: string;
  price: number;
  restaurant: Restaurant;
}
