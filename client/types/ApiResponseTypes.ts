export interface UserLogin {
  id: number;
  account_type: number;
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface User {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  address: string;
  account_type: number;
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
  description: string;
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
