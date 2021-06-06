import { ExtrasGroup as ExtrasGroupType } from "./ExtrasGroup";

export interface Dish {
  name: string;
  price: number;
  extras_group: ExtrasGroupType[];
  image: string;
}
