//I wish I was making this up
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { DeliveryMan as DeliveryManType } from "../types/ApiResponseTypes";

const DeliveryManHeader: React.FunctionComponent<DeliveryManType> = ({
  user,
  distance_to_restaurant,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerWithText}>
        <View style={{ ...styles.textWithLabel, paddingBottom: 15 }}>
          <FontAwesome5 name="user-alt" size={24} color="rgb(59, 108, 212)" />
          <Text style={styles.headerText}>
            {user.first_name} {user.last_name}
          </Text>
        </View>
        <View style={styles.textWithLabel}>
          <Text style={styles.label}>Nazwa użytkownika:</Text>
          <Text style={styles.text}>{user.username}</Text>
        </View>
        <View style={styles.textWithLabel}>
          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.text}>{user.email}</Text>
        </View>
        <View style={styles.textWithLabel}>
          <Text style={styles.label}>Odległość:</Text>
          <Text style={styles.text}>{distance_to_restaurant} km</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 20,
    flexDirection: "row",
    //justifyContent: "center",
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
  containerWithText: {
    backgroundColor: "white",
    fontSize: 14,
    textAlign: "left",
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "column",
  },
  textWithLabel: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
    color: "rgb(59, 108, 212)",
    marginBottom: 3,
    paddingLeft: 3,
  },
  text: {
    fontSize: 16,
    textAlign: "left",
    marginTop: 3,
    color: "black",
  },
  label: {
    fontSize: 16,
    textAlign: "left",
    marginTop: 3,
    marginRight: 3,
    color: "black",
    textDecorationLine: "underline",
  },
});

export default DeliveryManHeader;
