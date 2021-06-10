import { User, Dish } from "./ApiResponseTypes";

export interface HistoricalOrder {
  id: number;
  user: User;
  status: number;
  order_placement_date: string;
  order_delivery_date: string;
  delivery_address: string;
  order_cost: number;
  restaurant: string;
  dishes: Dish[];
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
