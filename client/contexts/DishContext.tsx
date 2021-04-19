import * as React from "react";
import { Dish as DishType } from "../types/Dish";

const DishContext = React.createContext<
  [DishType[], (dishes: DishType[]) => void]
>([
  [
    {
      name: "Dish",
      price: 1,
      image: "https://placeholder.com/",
    },
  ],
  () => {},
]);

export const DishProvider = DishContext.Provider;

export default DishContext;
