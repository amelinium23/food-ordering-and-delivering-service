import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const RESTAURANTS = [
  {
    nazwa: "Komediowa",
    adres: "Piotrkowska 12, Łódź",
    typKuchni: "Twój stary",
    kosztDostawy: 18,
  },
];

export default function Restaurant(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{RESTAURANTS[0].nazwa}</Text>
      <Text style={styles.text}>Adres: {RESTAURANTS[0].adres}</Text>
      <Text style={styles.text}>Typ kuchni: {RESTAURANTS[0].typKuchni}</Text>
      <Text style={styles.text}>
        Koszt dostawy: {RESTAURANTS[0].kosztDostawy}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "#707070",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1.5,
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
  logo: {
    width: 100,
    height: 150,
  },
});
