import * as React from "react";
import axios, { AxiosResponse } from "axios";
import { View, StyleSheet, Text, Pressable, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { User as UserType } from "../types/ApiResponseTypes";
import UserContext from "../contexts/UserContext";

interface IProps {
  user: UserType;
  setUserData: (user: UserType) => void;
}

const UserHeader: React.FunctionComponent<IProps> = ({ user, setUserData }) => {
  const [session] = React.useContext(UserContext);
  const [inputUsername, setInputUsername] = React.useState(user.username);
  const [inputFirstName, setInputFirstName] = React.useState(user.first_name);
  const [inputLastName, setInputLastName] = React.useState(user.last_name);
  const [editable, setEditable] = React.useState(false);

  const handleSubmit = async () => {
    if (
      inputUsername !== user.username ||
      inputFirstName !== user.first_name ||
      inputLastName !== user.last_name
    ) {
      try {
        const res: AxiosResponse<UserType> = await axios.patch(
          `https://glove-backend.herokuapp.com/users/auth/user/`,
          {
            username: inputUsername,
            first_name: inputFirstName,
            last_name: inputLastName,
          },
          {
            headers: { Authorization: `Bearer ${session.token.access_token}` },
          }
        );
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
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
      <Pressable style={styles.button} onPress={handleSubmit}>
        <FontAwesome5 name="user-check" size={20} color="white" />
        <Text style={styles.buttonText}>Potwierdź</Text>
      </Pressable>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.containerWithText}>
        <View style={{ ...styles.textWithLabel, paddingBottom: 15 }}>
          <FontAwesome5 name="user-alt" size={24} color="rgb(59, 108, 212)" />
          <Text style={styles.headerText}>Witaj, {user.first_name}!</Text>
        </View>
        <View style={styles.textWithLabel}>
          <Text style={styles.label}>Nazwa użytkownika:</Text>
          <Text style={styles.text}>{user.username}</Text>
        </View>
        <View style={styles.textWithLabel}>
          <Text style={styles.label}>Imię:</Text>
          <Text style={styles.text}>{user.first_name}</Text>
        </View>
        <View style={styles.textWithLabel}>
          <Text style={styles.label}>Nazwisko:</Text>
          <Text style={styles.text}>{user.last_name}</Text>
        </View>
        <View style={styles.textWithLabel}>
          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.text}>{user.email}</Text>
        </View>
      </View>
      <Pressable style={styles.button} onPress={() => setEditable(!editable)}>
        <FontAwesome5 name="user-edit" size={20} color="white" />
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
  textWithLabel: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 25,
    textAlign: "left",
    fontWeight: "bold",
    color: "rgb(59, 108, 212)",
    marginBottom: 3,
    paddingLeft: 3,
  },
  text: {
    fontSize: 20,
    textAlign: "left",
    marginTop: 3,
    color: "black",
  },
  label: {
    fontSize: 20,
    textAlign: "left",
    marginTop: 3,
    marginRight: 3,
    color: "black",
    textDecorationLine: "underline",
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
    marginHorizontal: 20,
    marginVertical: 10,
    color: "white",
    borderRadius: 10,
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
