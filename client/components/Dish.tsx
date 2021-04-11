import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const DISHES = [
  {
    nazwa: "Schabowy",
    cena: 18,
    opis: "Taki dobry z ziemiaczkami",
  },
];

const Dish = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{DISHES[0].nazwa}</Text>
      <Text style={styles.text}>Cena: {DISHES[0].cena} zł</Text>
      <Text style={styles.text}>Opis: {DISHES[0].opis}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "#707070",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
  },
});

export default Dish;
