import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { HistoricalOrder as Order } from "../types/ApiResponseTypes";
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
  order_placement_date,
  order_delivery_date,
  delivery_address,
  status,
  order_cost,
  restaurant,
  dishes,
}) => {
  let j = 0;
  const [isExpanded, setIsExpanded] = React.useState(false);
  return isExpanded ? (
    <View style={styles.orderContainer}>
      <Pressable onPress={() => setIsExpanded(!isExpanded)}>
        {dishes.length > 0 ? (
          dishes.map((i) => (
            <View key={`${i.dish.id + j++}`}>
              <DishHeader
                id={i.dish.id}
                name={i.dish.name}
                price={i.dish.price}
                image={i.dish.image}
                extras_group={[]}
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
        <Text style={styles.header}>Restauracja: {restaurant}</Text>
        <Text style={styles.text}>Numer zamówienia: {id}</Text>
        <Text style={styles.text}>Status: {STATUSES[status]}</Text>
        <Text style={styles.text}>Data zamówienia: {order_placement_date}</Text>
        <Text style={styles.text}>Data dostawy: {order_delivery_date}</Text>
        <Text style={styles.text}>Adres: {delivery_address}</Text>
        <Text style={styles.summaryText}>
          Cena zamówienia: {order_cost.toFixed(2)} zł
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
  summaryText: {
    marginTop: 6,
    textAlign: "center",
    fontWeight: "bold",
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
