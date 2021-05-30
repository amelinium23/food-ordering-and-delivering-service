import { Extra } from "./Extra";

export interface Dish {
  name: string;
  price: number;
  image: string;
  extras: Extra[];
}
