import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Octicons } from "@expo/vector-icons";

const User = {
  firstName: "Andrzej",
  lastName: "Kononowicz",
  address: "ul. 11 Listopada 99 m. 12",
};

const UserScreen: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Octicons
          name="octoface"
          size={42}
          color="black"
          style={{ alignSelf: "center" }}
        ></Octicons>
        <Text style={styles.text}>Imię: {User.firstName}</Text>
        <Text style={styles.text}>Nazwisko: {User.lastName}</Text>
        <Text style={styles.text}>Adres: {User.address}</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Edytuj profil</Text>
        </Pressable>
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

export default UserScreen;
