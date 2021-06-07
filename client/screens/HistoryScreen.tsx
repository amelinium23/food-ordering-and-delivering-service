import * as React from "react";
import Order from "../types/Order";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import OrderHeader from "../components/OrderHeader";

const ORDERS: Order[] = [
  {
    id: 1,
    date: "20-05-2021",
    price: 20,
    status: 2,
    restaurant: {
      key: "McDonalds",
      type: [],
      image: "",
      cost: 10,
      distance: 10,
    },
    orderedDishes: [
      {
        name: "Lemoniada",
        price: 8.99,
        extras_group: [
          {
            name: "Rozmiar",
            extra_type: 1,
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
        image:
          "https://images-gmi-pmc.edge-generalmills.com/2586d951-a46a-4091-aec6-eca3adefb409.jpg",
      },
    ],
  },
  {
    id: 2,
    date: "21-05-2021",
    status: 1,
    price: 21,
    restaurant: {
      key: "KFC",
      type: [],
      image: "",
      cost: 10,
      distance: 10,
    },
    orderedDishes: [],
  },
  {
    id: 3,
    date: "22-05-2021",
    price: 22,
    status: 3,
    restaurant: {
      key: "Subaway",
      type: [],
      image: "",
      cost: 10,
      distance: 10,
    },
    orderedDishes: [],
  },
];

const HistoryScreen: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={ORDERS}
        renderItem={({ item }) => (
          <Pressable key={`${item.id}`} onPress={() => null}>
            <OrderHeader
              id={item.id}
              date={item.date}
              status={item.status}
              price={item.price}
              restaurant={item.restaurant}
              orderedDishes={item.orderedDishes}
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

export default HistoryScreen;
