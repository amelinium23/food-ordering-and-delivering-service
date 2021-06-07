import * as React from "react";
import { View, StyleSheet, Text, Pressable, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { User } from "../types/User";
import { AntDesign } from "@expo/vector-icons";

const UserHeader: React.FunctionComponent<User> = ({
  email,
  username,
  first_name,
  last_name,
  address,
}) => {
  // const handleSubmit = () => {
  //   const data = {};
  // };
  const [editable, setEditable] = React.useState(false);
  return editable ? (
    <View style={styles.container}>
      <Text style={styles.formText}>Nazwa użytkownika: </Text>
      <TextInput
        style={styles.input}
        autoCompleteType="username"
        autoCapitalize="none"
        textContentType="username"
        placeholder="Nazwa użytkownika"
      />
      <Text style={styles.formText}>Imię</Text>
      <TextInput
        style={styles.input}
        autoCompleteType="name"
        autoCapitalize="words"
        textContentType="name"
        placeholder="Imię"
      />
      <Text style={styles.formText}>Nazwisko</Text>
      <TextInput
        style={styles.input}
        autoCompleteType="name"
        autoCapitalize="words"
        textContentType="name"
        placeholder="Nazwisko"
      />
      <Text style={styles.formText}>Mail</Text>
      <TextInput
        style={styles.input}
        autoCompleteType="email"
        autoCapitalize="none"
        textContentType="emailAddress"
        placeholder="Nowy mail"
      />
      <Text style={styles.formText}>Adres</Text>
      <TextInput
        style={styles.input}
        autoCompleteType="street-address"
        autoCapitalize="none"
        textContentType="streetAddressLine1"
        placeholder="Nowy adres"
      />
      <Pressable style={styles.button} onPress={() => setEditable(!editable)}>
        <Text style={styles.buttonText}>
          <AntDesign name="save" size={24} color="white" /> Modyfikuj
        </Text>
      </Pressable>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Nazwa użytkownika: {username}</Text>
        <Text style={styles.text}>Imię: {first_name}</Text>
        <Text style={styles.text}>Nazwisko: {last_name}</Text>
        <Text style={styles.text}>Adres: {address}</Text>
        <Text style={styles.text}>Email: {email}</Text>
        <Pressable style={styles.button} onPress={() => setEditable(!editable)}>
          <Text style={styles.buttonText}>
            <Feather name="edit" size={24} color="white" /> Edytuj
          </Text>
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
  formText: {
    fontSize: 16,
    textAlign: "left",
  },
  infoContainer: {
    backgroundColor: "white",
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
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
});

export default UserHeader;
