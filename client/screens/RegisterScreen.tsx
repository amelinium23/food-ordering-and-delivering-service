import * as React from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { RootStackParamList } from "../types/RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import zxcvbn from "zxcvbn";
import UserContext from "../contexts/UserContext";
import { UserLogin as UserLoginType } from "../types/ApiResponseTypes";
import { HeaderHeightContext } from "@react-navigation/stack";

type ListScreenRouteProp = RouteProp<RootStackParamList, "Register">;

type ListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

interface IProps {
  route: ListScreenRouteProp;
  navigation: ListScreenNavigationProp;
}

const LoginScreen: React.FunctionComponent<IProps> = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [registerError, setRegisterError] = React.useState(false);
  const [isWaiting, setIsWaiting] = React.useState(false);

  const [safety, setSafety] = React.useState(0);
  const [, setSession] = React.useContext(UserContext);

  const register = async () => {
    setRegisterError(false);
    setIsWaiting(true);
    const res = await fetch(
      "https://glove-backend.herokuapp.com/users/registration/",
      {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          password2: password2,
          first_name: firstName,
          last_name: lastName,
        }),
        headers: {
          "Content-Type": "application/json",
          Referer: "https://glove-backend.herokuapp.com/users/registration/",
        },
      }
    );
    if (res.ok) {
      const json = (await res.json()) as UserLoginType;
      navigation.navigate("Login", {});
      const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking"); //eslint-disable-line
      RCTNetworking.clearCookies(() => {}); //eslint-disable-line
      setSession({
        id: 0,
        account_type: 1,
        state: true,
        token: {
          access_token: json.access_token,
          refresh_token: json.refresh_token,
        },
      });
    } else {
      setRegisterError(true);
      setIsWaiting(false);
    }
  };

  React.useEffect(() => {
    setSafety(zxcvbn(password).score as number); //eslint-disable-line
  }, [password]);

  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={headerHeight}
        >
          <ScrollView>
            <Text style={styles.header}>Rejestracja</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCompleteType="username"
              textContentType="username"
              placeholder="Nazwa użytkownika"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              placeholder="Adres e-mail"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={
                password.length === 0 || safety > 1
                  ? styles.input
                  : styles.invalidInput
              }
              autoCapitalize="none"
              secureTextEntry={true}
              autoCompleteType="password"
              textContentType="newPassword"
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Hasło"
            />
            {password.length === 0 || safety > 1 ? null : (
              <Text style={styles.notificationText}>Hasło zbyt słabe.</Text>
            )}
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              secureTextEntry={true}
              autoCompleteType="password"
              textContentType="newPassword"
              value={password2}
              onChangeText={(text) => setPassword2(text)}
              placeholder="Powtórz hasło"
            />
            {password2.length === 0 || password === password2 ? null : (
              <Text style={styles.notificationText}>Hasła są różne.</Text>
            )}
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              autoCompleteType="name"
              textContentType="name"
              placeholder="Imię"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              autoCompleteType="name"
              textContentType="name"
              placeholder="Nazwisko"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </ScrollView>
          {!isWaiting ? (
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.4 : 1,
                },
                styles.loginButton,
              ]}
              onPress={() => {
                void register();
              }}
            >
              <Text style={styles.loginButtonText}>Zarejestruj się</Text>
            </Pressable>
          ) : (
            <ActivityIndicator color="rgb(59, 108, 212)" size={35} />
          )}
          {registerError ? (
            <Text style={styles.errorText}>Niepoprawne dane rejestracji</Text>
          ) : null}
        </KeyboardAvoidingView>
      )}
    </HeaderHeightContext.Consumer>
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
  invalidInput: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "red",
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
  notificationText: {
    color: "grey",
    marginHorizontal: 20,
  },
  errorText: {
    margin: 2,
    alignSelf: "center",
    color: "red",
  },
});

export default LoginScreen;
