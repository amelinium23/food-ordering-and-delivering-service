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
      <Text style={styles.formText}>Nazwa użytkownika:</Text>
      <TextInput
        style={styles.input}
        autoCompleteType="username"
        autoCapitalize="none"
        textContentType="username"
        placeholder="Nazwa użytkownika"
        defaultValue={username}
        clearTextOnFocus={true}
      />
      <Text style={styles.formText}>Imię:</Text>
      <TextInput
        style={styles.input}
        autoCompleteType="name"
        autoCapitalize="words"
        textContentType="name"
        placeholder="Imię"
        defaultValue={first_name}
        clearTextOnFocus={true}
      />
      <Text style={styles.formText}>Nazwisko:</Text>
      <TextInput
        style={styles.input}
        autoCompleteType="name"
        autoCapitalize="words"
        textContentType="name"
        placeholder="Nazwisko"
        defaultValue={last_name}
        clearTextOnFocus={true}
      />
      <Text style={styles.formText}>Adres e-mail:</Text>
      <TextInput
        style={styles.input}
        autoCompleteType="email"
        autoCapitalize="none"
        textContentType="emailAddress"
        placeholder="Nowy adres e-mail"
        defaultValue={email}
        clearTextOnFocus={true}
      />
      <Text style={styles.formText}>Adres:</Text>
      <TextInput
        style={styles.input}
        autoCompleteType="street-address"
        autoCapitalize="none"
        textContentType="streetAddressLine1"
        placeholder="Nowy adres"
        defaultValue={address}
        clearTextOnFocus={true}
      />
      <Pressable style={styles.button} onPress={() => setEditable(!editable)}>
        <AntDesign name="save" size={24} color="white" />
        <Text style={styles.buttonText}>Modyfikuj</Text>
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
          <Feather name="edit" size={24} color="white" />
          <Text style={styles.buttonText}>Edytuj</Text>
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
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    color: "rgb(59, 108, 212)",
    marginTop: 5,
    marginHorizontal: 10,
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
    paddingLeft: 4,
  },
  button: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(59, 108, 212)",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    color: "white",
    width: 200,
    borderRadius: 10,
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
    marginHorizontal: 12,
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
