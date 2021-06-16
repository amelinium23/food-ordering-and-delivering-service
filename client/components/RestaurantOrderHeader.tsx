import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HistoricalOrder as OrderType } from "../types/ApiResponseTypes";

// ja bym wyrzucil te statusy gdzies zeby ich uzywac globalnie
const STATUSES: { [index: number]: string } = {
  1: "Zamówione",
  2: "Szukam dostawcy",
  3: "W przygotowaniu",
  4: "W dostawie",
  5: "Dostarczone",
  6: "Anulowane",
};

const RestaurantOrderHeader: React.FunctionComponent<OrderType> = ({
  id,
  dishes,
  status,
  order_placement_date,
  delivery_address,
  order_cost,
}) => {
  return (
    <View style={styles.orderContainer}>
      <Text style={styles.header}>Zamówienie #{id}</Text>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: "lightgrey",
          paddingBottom: 10,
        }}
      >
        <View style={styles.textWithLabel}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.text}>{STATUSES[status]}</Text>
        </View>
        <View style={styles.textWithLabel}>
          <Text style={styles.label}>Złożono:</Text>
          <Text style={styles.text}>{order_placement_date}</Text>
        </View>
        <View style={styles.textWithLabel}>
          <Text style={styles.label}>Adres:</Text>
          <Text style={styles.text}>{delivery_address}</Text>
        </View>
        <View style={styles.textWithLabel}>
          <Text style={styles.label}>Kwota:</Text>
          <Text style={styles.text}>{order_cost}</Text>
        </View>
      </View>
      <Text style={styles.text}>
        {dishes.map((dish) => dish.dish.name).join(", ")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  textWithLabel: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 14,
    textAlign: "left",
    marginTop: 3,
    color: "black",
  },
  label: {
    fontSize: 14,
    textAlign: "left",
    marginTop: 3,
    marginRight: 3,
    color: "black",
    textDecorationLine: "underline",
  },
});

export default RestaurantOrderHeader;
