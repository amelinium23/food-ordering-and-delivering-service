import * as React from "react";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";
import { RootStackParamList } from "../types/RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type ListScreenRouteProp = RouteProp<RootStackParamList, "Register">;

type ListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

interface IProps {
  route: ListScreenRouteProp;
  navigation: ListScreenNavigationProp;
}

const LoginScreen: React.FunctionComponent<IProps> = ({
  route,
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Logowanie</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        placeholder="Adres e-mail"
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCompleteType="username"
        textContentType="username"
        placeholder="Nazwa użytkownika"
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        autoCompleteType="password"
        textContentType="newPassword"
        placeholder="Hasło"
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        autoCompleteType="password"
        textContentType="newPassword"
        placeholder="Powtórz hasło"
      />
      <TextInput
        style={styles.input}
        autoCapitalize="words"
        autoCompleteType="name"
        textContentType="name"
        placeholder="Imię"
      />
      <TextInput
        style={styles.input}
        autoCapitalize="words"
        autoCompleteType="name"
        textContentType="name"
        placeholder="Nazwisko"
      />
      <TextInput
        style={styles.input}
        autoCapitalize="words"
        autoCompleteType="street-address"
        textContentType="streetAddressLine1"
        placeholder="Adres"
      />
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.4 : 1,
          },
          styles.loginButton,
        ]}
        onPress={() => navigation.navigate("Login", {})}
      >
        <Text style={styles.loginButtonText}>Zarejestruj się</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  header: {
    color: "rgb(59, 108, 212)",
    fontSize: 28,
    fontWeight: "400",
    textAlign: "center",
    padding: 10,
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
  loginButton: {
    backgroundColor: "rgb(59, 108, 212)",
    alignSelf: "center",
    padding: 7,
    margin: 10,
    borderRadius: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 20,
  },
  footer: {
    alignSelf: "center",
    padding: 2,
    flexDirection: "row",
  },
  footerText: {
    color: "grey",
    backgroundColor: "white",
  },
  hypertext: {
    borderBottomWidth: 1,
    borderColor: "grey",
  },
});

export default LoginScreen;
