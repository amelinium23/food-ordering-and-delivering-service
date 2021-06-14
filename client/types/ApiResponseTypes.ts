export interface UserLogin {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  account_type: number;
  email: string;
}

export interface Restaurant {
  id: number;
  cuisine_type: string[];
  distance: number;
  location: Location;
  name: string;
  logo: string;
  address: string;
  delivery_cost: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface MenuCategory {
  name: string;
  data: Dish[];
}

export interface Dish {
  id: number;
  name: string;
  image: string;
  price: number;
  extras_group: ExtrasGroup[];
}

export interface ExtrasGroup {
  name: string;
  extra_type: number;
  extras: Extra[];
}

export interface Extra {
  id: number;
  name: string;
  added_price: number;
}

export interface HistoricalOrder {
  id: number;
  user: User;
  dishes: DishElement[];
  restaurant: string;
  status: number;
  order_placement_date: string;
  order_delivery_date: string;
  order_cost: number;
  delivery_address: string;
}

export interface DishElement {
  dish: DishDish;
  ordered_extras: OrderedExtra[];
}

export interface DishDish {
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface OrderedExtra {
  extra: Extra;
}

export interface DeliveryMan {
  id: number;
  user: User;
  location: Location;
  distance_to_restaurant: number;
  status: number;
  last_online: string;
}
