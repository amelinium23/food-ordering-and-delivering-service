import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Dish } from "../types/Dish";
import { HistoricalOrder as Order } from "../types/Order";
import DishHeader from "./DishHeader";

const STATUSES: { [index: number]: string } = {
  1: "Zamówiony",
  2: "Szukam dostawcy",
  3: "W przygotowaniu",
  4: "W dostawie",
  5: "Dostarczone",
  6: "Anulowane",
};

const OrderHeader: React.FunctionComponent<Order> = ({
  id,
  date,
  status,
  price,
  restaurant,
  orderedDishes,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return isExpanded ? (
    <View style={styles.orderContainer}>
      <Pressable onPress={() => setIsExpanded(!isExpanded)}>
        {orderedDishes.length > 0 ? (
          orderedDishes.map((i) => (
            <View key={i.name}>
              <DishHeader
                id={i.id}
                name={i.name}
                price={i.price}
                image={i.image}
                extras_group={i.extras_group}
              />
            </View>
          ))
        ) : (
          <View>
            <Text>Jak mogłeś zamówić nic?</Text>
          </View>
        )}
      </Pressable>
    </View>
  ) : (
    <Pressable onPress={() => setIsExpanded(!isExpanded)}>
      <View style={styles.orderContainer}>
        <Text style={styles.header}>Restauracja: {restaurant.key}</Text>
        <Text style={styles.text}>Status: {STATUSES[status]}</Text>
        <Text style={styles.text}>Data zamówienia: {date}</Text>
        <Text style={styles.text}>Cena zamówienia: {price.toFixed(2)} zł</Text>
        <Text style={styles.text}>Numer zamówienia: {id}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
  header: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(59, 108, 212)",
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

export default OrderHeader;
