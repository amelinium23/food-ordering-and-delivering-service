import * as React from "react";
import { RestaurantOrder } from "../types/Order";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import RestaurantOrderHeader from "../components/RestaurantOrderHeader";

const ORDERS: RestaurantOrder[] = [
  {
    id: 1,
    user: {
      email: "elo320@gmail.com",
      username: "Mati",
      first_name: "Mateusz",
      last_name: "Przełóż",
      address: "",
      account_type: 1,
    },
    dishes: [],
    status: 1,
    orderPlacementDate: "2021-06-06T22:41:22.096384+02:00",
    orderDeliveryDate: "",
    deliveryMan: {
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      address: "",
      account_type: 3,
    },
    orderCost: 0.1,
  },
];

const OrderListScreen: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={ORDERS}
        renderItem={({ item }) => (
          <Pressable key={`${item.id}`} onPress={() => null}>
            <RestaurantOrderHeader
              id={item.id}
              user={item.user}
              dishes={item.dishes}
              status={item.status}
              orderPlacementDate={item.orderPlacementDate}
              orderDeliveryDate={item.orderDeliveryDate}
              deliveryMan={item.deliveryMan}
              orderCost={item.orderCost}
            />
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    fontSize: 14,
    flex: 1,
  },
  hearder: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(59, 108, 212)",
  },
  logo: {
    height: 35,
    resizeMode: "contain",
  },
  orderContainer: {
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default OrderListScreen;
