import * as React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import UserContext from "../contexts/UserContext";
import * as Google from "expo-auth-session/providers/google";
import { UserLogin as UserLoginType } from "../types/ApiResponseTypes";
import { AntDesign } from "@expo/vector-icons";

interface IProps {
  setLoginError: (val: boolean) => void;
  setIsWaiting: (val: boolean) => void;
}

const GoogleLoginButton: React.FunctionComponent<IProps> = ({
  setLoginError,
  setIsWaiting,
}) => {
  const [, setSession] = React.useContext(UserContext);
  const [, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    expoClientId:
      "203056787354-gg20fsm82as66rd2on59godinrs0p3cf.apps.googleusercontent.com",
    webClientId:
      "203056787354-vr11otq7re249ltpfgc8siufdvbegtbf.apps.googleusercontent.com",
  });

  const handleResponse = async (response: Response) => {
    if (response.ok) {
      const json = (await response.json()) as UserLoginType;
      // RCTNetworking.clearCookies(() => {}); //eslint-disable-line
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
    if (googleResponse?.type === "success") {
      const { authentication } = googleResponse;
      void (async () => {
        const res = await fetch(
          "https://glove-backend.herokuapp.com/users/social-login/google/",
          {
            method: "POST",
            body: JSON.stringify({
              access_token: authentication?.accessToken,
            }),
            headers: {
              "Content-Type": "application/json",
              Referer:
                "https://glove-backend.herokuapp.com/users/social-login/google/",
            },
          }
        );
        console.log(
          JSON.stringify({
            access_token: authentication?.accessToken,
          })
        );
        void handleResponse(res);
      })();
    }
  }, [googleResponse]); //eslint-disable-line

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.4 : 1,
        },
        styles.socialLoginButton,
        {
          backgroundColor: "white",
          borderColor: "lightgrey",
          borderWidth: 1,
        },
      ]}
      onPress={() => {
        console.log("google");
        void googlePromptAsync();
      }}
    >
      <View>
        <AntDesign
          name="google"
          size={24}
          color="green"
          style={{
            paddingHorizontal: 4,
            position: "relative",
            alignSelf: "center",
          }}
        />
        <AntDesign
          name="google"
          size={24}
          color="rgb(59, 108, 212)"
          style={{
            paddingHorizontal: 4,
            height: 15,
            position: "absolute",
          }}
        />
        <AntDesign
          name="google"
          size={24}
          color="orange"
          style={{
            paddingHorizontal: 4,
            height: 15,
            width: 15,
            position: "absolute",
          }}
        />
        <AntDesign
          name="google"
          size={24}
          color="red"
          style={{
            paddingHorizontal: 4,
            height: 8,
            position: "absolute",
          }}
        />
      </View>
      <Text style={[styles.loginButtonText, { color: "grey" }]}>
        Zaloguj się z Google
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
});

export default GoogleLoginButton;
