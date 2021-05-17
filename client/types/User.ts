import { Dish as DishType } from "./Dish";

export interface User {
  name: string;
  history: DishType[];
}
