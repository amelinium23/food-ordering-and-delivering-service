import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Dish from "../components/DishInfo";
import DishCategory from "../components/DishCategory";

export default function Menu(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <DishCategory name="Dania główne" />
      <Dish />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
