import * as React from "react";
import Order from "../types/Order";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";

const ORDERS: Order[] = [
  {
    id: 1,
    date: "20-05-2021",
    price: 20,
    restaurant: {
      key: "McDonalds",
      type: [],
      image: "",
      cost: 10,
      distance: 10,
    },
  },
  {
    id: 2,
    date: "21-05-2021",
    price: 21,
    restaurant: {
      key: "KFC",
      type: [],
      image: "",
      cost: 10,
      distance: 10,
    },
  },
  {
    id: 3,
    date: "22-05-2021",
    price: 22,
    restaurant: {
      key: "Subaway",
      type: [],
      image: "",
      cost: 10,
      distance: 10,
    },
  },
];

const HistoryScreen: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.restaurant.key}
        renderItem={({ item }) => (
          <Pressable>
            <View style={styles.orderContainer}>
              <Text style={styles.hearder}>
                Restauracja: {item.restaurant.key}
              </Text>
              <Text>Data zamówienia: {item.date}</Text>
              <Text>Cena zamówienia: {item.price.toFixed(2)} zł</Text>
            </View>
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

export default HistoryScreen;
