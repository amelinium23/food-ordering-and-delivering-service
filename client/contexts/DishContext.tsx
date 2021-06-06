import * as React from "react";
import { Dish as DishType } from "../types/Dish";
import { IExtraType } from "../types/ExtrasGroup";

const DishContext = React.createContext<
  [DishType[], (dishes: DishType[]) => void]
>([
  [
    {
      name: "Dish",
      price: 1,
      extras_group: [
        {
          name: "Rozmiar",
          extra_type: 1 as IExtraType,
          extras: [
            {
              name: "Mała",
              added_price: 0.0,
            },
            {
              name: "Duża",
              added_price: 5.0,
            },
          ],
        },
      ],
      image: "https://placeholder.com/",
    },
  ],
  () => {},
]);

export const DishProvider = DishContext.Provider;

export default DishContext;
