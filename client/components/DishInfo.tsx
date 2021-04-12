import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ListRenderItem,
} from "react-native";
import DishType from "../types/DishType";

const DISHES = [
  {
    nazwa: "Schabowy",
    cena: 18,
    opis: "Taki dobry z ziemiaczkami",
    category: "Dania główne",
  },
  {
    nazwa: "Schabowy",
    cena: 18,
    opis: "Taki dobry z ziemiaczkami",
    category: "Dania główne",
  },
  {
    nazwa: "Schabowy",
    cena: 18,
    opis: "Taki dobry z ziemiaczkami",
    category: "Dania główne",
  },
  {
    nazwa: "Schabowy",
    cena: 18,
    opis: "Taki dobry z ziemiaczkami",
    category: "Dania główne",
  },
];

const Dish = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DISHES}
        renderItem={({ item }: { item: DishType }) => {
          <Pressable style={styles.container}>
            <Text style={styles.heading}>{item.nazwa}</Text>
            <Text style={styles.text}>Cena: {item.cena} zł</Text>
            <Text style={styles.text}>Opis: {item.opis}</Text>
          </Pressable>;
        }}
      />
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
