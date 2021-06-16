import * as React from "react";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import UserContext from "../contexts/UserContext";
import { RootStackParamList } from "../types/RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import zxcvbn from "zxcvbn";

type ListScreenRouteProp = RouteProp<RootStackParamList, "PasswordChange">;

type ListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PasswordChange"
>;

interface IProps {
  route: ListScreenRouteProp;
  navigation: ListScreenNavigationProp;
}

const PasswordChangeScreen: React.FunctionComponent<IProps> = ({
  navigation,
}) => {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPassword2, setNewPassword2] = React.useState("");
  const [submitError, setSubmitError] = React.useState(false);
  const [isWaiting, setIsWaiting] = React.useState(false);
  const [safety, setSafety] = React.useState(0);
  const [session, setSession] = React.useContext(UserContext);

  React.useEffect(() => {
    setSafety(zxcvbn(newPassword).score as number); //eslint-disable-line
  }, [newPassword]);

  const handleSumbit = async () => {
    setIsWaiting(true);
    const res = await fetch(
      "https://glove-backend.herokuapp.com/users/auth/password/change/",
      {
        method: "POST",
        body: JSON.stringify({
          old_password: oldPassword,
          new_password1: newPassword,
          new_password2: newPassword2,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token.access_token}`,
        },
      }
    );
    setIsWaiting(false);
    if (res.ok) {
      navigation.goBack();
    } else {
      setSubmitError(true);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={
          newPassword.length === 0 || safety > 1
            ? styles.input
            : styles.invalidInput
        }
        autoCapitalize="none"
        secureTextEntry={true}
        autoCompleteType="password"
        textContentType="password"
        value={oldPassword}
        onChangeText={(text) => setOldPassword(text)}
        placeholder="Podaj stare hasło"
      />
      <TextInput
        style={
          newPassword.length === 0 || safety > 1
            ? styles.input
            : styles.invalidInput
        }
        autoCapitalize="none"
        secureTextEntry={true}
        autoCompleteType="password"
        textContentType="password"
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        placeholder="Podaj nowe hasło"
      />
      {newPassword.length === 0 || safety > 1 ? null : (
        <Text style={styles.notificationText}>Hasło zbyt słabe.</Text>
      )}
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        autoCompleteType="password"
        textContentType="password"
        value={newPassword2}
        onChangeText={(text) => setNewPassword2(text)}
        placeholder="Powtórz nowe hasło"
      />
      {newPassword2.length === 0 || newPassword === newPassword2 ? null : (
        <Text style={styles.notificationText}>Hasła są różne.</Text>
      )}
      {!isWaiting ? (
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.4 : 1,
            },
            styles.loginButton,
          ]}
          onPress={() => {
            void handleSumbit();
          }}
        >
          <Text style={styles.loginButtonText}>Zmień hasło</Text>
        </Pressable>
      ) : (
        <ActivityIndicator color="rgb(59, 108, 212)" size={35} />
      )}
      {submitError ? (
        <Text style={styles.errorText}>Niepoprawne hasło</Text>
      ) : null}
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

export default PasswordChangeScreen;
