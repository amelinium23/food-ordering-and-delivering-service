import * as React from "react";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  View,
  ActivityIndicator,
} from "react-native";
import { RootStackParamList } from "../types/RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import UserContext from "../contexts/UserContext";
import { UserLogin as UserLoginType } from "../types/ApiResponseTypes";
import * as WebBrowser from "expo-web-browser";

import GoogleLoginButton from "../components/GoogleLoginButton";
import FacebookLoginButton from "../components/FacebookLoginButton";

type ListScreenRouteProp = RouteProp<RootStackParamList, "Login">;

type ListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface IProps {
  route: ListScreenRouteProp;
  navigation: ListScreenNavigationProp;
}

WebBrowser.maybeCompleteAuthSession();

const LoginScreen: React.FunctionComponent<IProps> = ({ navigation }) => {
  const [session, setSession] = React.useContext(UserContext);
  const [inputUsername, setInputUsername] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState(false);
  const [isWaiting, setIsWaiting] = React.useState(false);

  const handleResponse = async (response: Response) => {
    if (response.ok) {
      const json = (await response.json()) as UserLoginType;
      setSession({
        id: json.user.id,
        account_type: json.user.account_type,
        state: true,
        token: {
          access_token: json.access_token,
          refresh_token: json.refresh_token,
        },
      });
    } else {
      setLoginError(true);
      setIsWaiting(false);
    }
  };

  React.useEffect(() => {
    if (session.state) {
      setLoginError(false);
    }
  }, [session, navigation]);

  React.useEffect(() => {
    if (session.state) {
      setLoginError(false);
    }
  }, [session, navigation]);

  const login = async (username: string, password: string) => {
    const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking"); //eslint-disable-line
    RCTNetworking.clearCookies(() => {}); //eslint-disable-line
    setIsWaiting(true);
    const res = await fetch(
      "https://glove-backend.herokuapp.com/users/auth/login/",
      {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
          Referer: "https://glove-backend.herokuapp.com/users/auth/login/",
        },
      }
    );
    void handleResponse(res);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Logowanie</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder="Nazwa użytkownika"
        value={inputUsername}
        onChangeText={(text: string) => setInputUsername(text)}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        placeholder="Hasło"
        value={inputPassword}
        onChangeText={(text: string) => setInputPassword(text)}
      />
      {!isWaiting ? (
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.4 : 1,
            },
            styles.loginButton,
          ]}
          onPress={() => {
            void login(inputUsername, inputPassword);
          }}
        >
          <Text style={styles.loginButtonText}>Zaloguj się</Text>
        </Pressable>
      ) : (
        <ActivityIndicator color="rgb(59, 108, 212)" size={35} />
      )}
      <GoogleLoginButton
        setLoginError={setLoginError}
        setIsWaiting={setIsWaiting}
      />
      <FacebookLoginButton
        setLoginError={setLoginError}
        setIsWaiting={setIsWaiting}
      />
      {loginError ? (
        <Text style={styles.errorText}>Niepoprawne dane logowania</Text>
      ) : null}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Nie masz konta? </Text>
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.4 : 1,
            },
            styles.hypertext,
          ]}
          onPress={() => navigation.navigate("Register", {})}
        >
          <Text style={styles.footerText}>Zarejestruj się.</Text>
        </Pressable>
      </View>
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
    flexDirection: "row",
  },
  socialLoginButton: {
    backgroundColor: "rgb(59, 108, 212)",
    alignSelf: "center",
    padding: 7,
    margin: 3,
    borderRadius: 10,
    flexDirection: "row",
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
  errorText: {
    margin: 2,
    alignSelf: "center",
    color: "red",
  },
});

export default LoginScreen;
