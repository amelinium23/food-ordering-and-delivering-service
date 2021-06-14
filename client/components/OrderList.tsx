import * as React from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import RestaurantOrderHeader from "../components/RestaurantOrderHeader";
import { HistoricalOrder as OrderType } from "../types/ApiResponseTypes";

interface IProps {
  onPress: (item: OrderType) => void;
  orders: OrderType[];
}

const OrderList: React.FunctionComponent<IProps> = ({ onPress, orders }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => onPress(item)}>
            <RestaurantOrderHeader
              id={item.id}
              user={item.user}
              dishes={item.dishes}
              status={item.status}
              restaurant={item.restaurant}
              order_placement_date={item.order_placement_date}
              order_delivery_date={item.order_delivery_date}
              delivery_address={item.delivery_address}
              order_cost={item.order_cost}
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

export default OrderList;
