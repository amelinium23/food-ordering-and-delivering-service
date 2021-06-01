import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { User } from "../types/User";

const UserHeader: React.FunctionComponent<User> = ({
  email,
  username,
  first_name,
  last_name,
  address,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Octicons
          name="octoface"
          size={42}
          color="black"
          style={{ alignSelf: "center" }}
        ></Octicons>
        <Text style={styles.text}>Nazwa użytkownika: {username}</Text>
        <Text style={styles.text}>Imię: {first_name}</Text>
        <Text style={styles.text}>Nazwisko: {last_name}</Text>
        <Text style={styles.text}>Adres: {address}</Text>
        <Text style={styles.text}>Email: {email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  infoContainer: {
    flex: 2,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "rgb(59, 108, 212)",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    textAlign: "center",
    color: "white",
    width: 200,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
});

export default UserHeader;
