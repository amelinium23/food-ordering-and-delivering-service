import * as React from "react";
import axios from "axios";
import { View, StyleSheet, Text, Pressable, TextInput } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { User as UserType } from "../types/ApiResponseTypes";
import { AntDesign } from "@expo/vector-icons";
import UserContext from "../contexts/UserContext";

interface IProps {
  user: UserType;
}

const UserHeader: React.FunctionComponent<IProps> = ({ user }) => {
  const [session, setSession] = React.useContext(UserContext);
  const [inputEmail, setInputEmail] = React.useState(user.email);
  const [inputUsername, setInputUsername] = React.useState(user.username);
  const [inputFirstName, setInputFirstName] = React.useState(user.first_name);
  const [inputLastName, setInputLastName] = React.useState(user.last_name);
  const [inputAddress, setInputAddress] = React.useState(user.address);
  const [editable, setEditable] = React.useState(false);

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(
        `https://glove-backend.herokuapp.com/users/auth/user/`,
        {
          email: inputEmail,
          username: inputUsername,
          first_name: inputFirstName,
          last_name: inputLastName,
          address: inputAddress,
        },
        {
          headers: { Authorization: `Bearer ${session.token.access_token}` },
        }
      );
    } catch (err) {
      console.log(err);
    }
    setEditable(!editable);
  };
  return editable ? (
    <View style={styles.container}>
      <Text style={styles.formText}>Nazwa użytkownika:</Text>
      <TextInput
        style={styles.input}
        autoCompleteType="username"
        autoCapitalize="none"
        textContentType="username"
        placeholder="Nazwa użytkownika"
        value={inputUsername}
        clearTextOnFocus={true}
        onChangeText={(text) => setInputUsername(text)}
      />
      <Text style={styles.formText}>Imię:</Text>
      <TextInput
        style={styles.input}
        autoCompleteType="name"
        autoCapitalize="words"
        textContentType="name"
        placeholder="Imię"
        clearTextOnFocus={true}
        value={inputFirstName}
        onChangeText={(text) => setInputFirstName(text)}
      />
      <Text style={styles.formText}>Nazwisko:</Text>
      <TextInput
        style={styles.input}
        autoCompleteType="name"
        autoCapitalize="words"
        textContentType="name"
        placeholder="Nazwisko"
        clearTextOnFocus={true}
        value={inputLastName}
        onChangeText={(text) => setInputLastName(text)}
      />
      <Text style={styles.formText}>Adres e-mail:</Text>
      <TextInput
        style={styles.input}
        autoCompleteType="email"
        autoCapitalize="none"
        textContentType="emailAddress"
        placeholder="Nowy adres e-mail"
        clearTextOnFocus={true}
        value={inputEmail}
        onChangeText={(text) => setInputEmail(text)}
      />
      <Text style={styles.formText}>Adres:</Text>
      <TextInput
        style={styles.input}
        autoCompleteType="street-address"
        autoCapitalize="none"
        textContentType="streetAddressLine1"
        placeholder="Nowy adres"
        clearTextOnFocus={true}
        value={inputAddress}
        onChangeText={(text) => setInputAddress(text)}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <AntDesign name="save" size={24} color="white" />
        <Text style={styles.buttonText}>Modyfikuj</Text>
      </Pressable>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.containerWithText}>
        <Text style={styles.header}>Nazwa użytkownika: {user.username}</Text>
        <Text style={styles.text}>Imię: {user.first_name}</Text>
        <Text style={styles.text}>Nazwisko: {user.last_name}</Text>
        <Text style={styles.text}>Adres: {user.address}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
      </View>
      <Pressable style={styles.button} onPress={() => setEditable(!editable)}>
        <Feather name="edit" size={24} color="white" />
        <Text style={styles.buttonText}>Edytuj</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  containerWithText: {
    backgroundColor: "white",
    fontSize: 14,
    textAlign: "left",
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "column",
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "rgb(59, 108, 212)",
    marginBottom: 3,
  },
  text: {
    fontSize: 16,
    textAlign: "left",
    marginTop: 3,
    color: "black",
  },
  formText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    color: "rgb(59, 108, 212)",
    marginTop: 5,
    marginHorizontal: 10,
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
