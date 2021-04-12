import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface IProps {
  name: string;
}

export default function DishCategory({ name }: IProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginTop: 8,
    borderColor: "gray",
    borderBottomWidth: 3,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
