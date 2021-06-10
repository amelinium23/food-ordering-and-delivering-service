import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Dish } from "../types/Dish";
import { RestaurantOrder } from "../types/Order";
import DishHeader from "./DishHeader";

// ja bym wyrzucil te statusy gdzies zeby ich uzywac globalnie
const STATUSES: { [index: number]: string } = {
  1: "Zamówiony",
  2: "Szukam dostawcy",
  3: "W przygotowaniu",
  4: "W dostawie",
  5: "Dostarczone",
  6: "Anulowane",
};

const RestaurantOrderHeader: React.FunctionComponent<RestaurantOrder> = ({
  id,
  user,
  dishes,
  status,
  orderPlacementDate,
  orderDeliveryDate,
  deliveryMan,
  orderCost,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return isExpanded ? (
    <View style={styles.orderContainer}>
      <Pressable onPress={() => setIsExpanded(!isExpanded)}>
        {dishes.length > 0 ? (
          dishes.map((i) => (
            <View key={id}>
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
            <Text>test</Text>
          </View>
        )}
      </Pressable>
    </View>
  ) : (
    <Pressable onPress={() => setIsExpanded(!isExpanded)}>
      <View style={styles.orderContainer}>
        <Text style={styles.header}>Status: {STATUSES[status]}</Text>
        <Text style={styles.text}>
          Data złożenia zamówienia: {orderPlacementDate}
        </Text>
        <Text style={styles.text}>
          Data dostarczenia zamówienia: {orderDeliveryDate}
        </Text>
        <Text style={styles.text}>
          Cena zamówienia: {orderCost.toFixed(2)} zł
        </Text>
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

export default RestaurantOrderHeader;
