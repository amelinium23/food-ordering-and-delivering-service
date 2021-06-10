export interface Order {
  restaurantId: number;
  orderedItems: OrderedItem[];
  orderCost: number;
  deliveryAddress: string;
}

export interface OrderedItem {
  dishId: number;
  dishName: string;
  orderedExtras: number[];
  totalCost: number;
  image: string;
}
