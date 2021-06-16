import * as React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import UserContext from "../contexts/UserContext";
import { UserLogin as UserLoginType } from "../types/ApiResponseTypes";
import { Entypo } from "@expo/vector-icons";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";

interface IProps {
  setLoginError: (val: boolean) => void;
  setIsWaiting: (val: boolean) => void;
}

const FacebookLoginButton: React.FunctionComponent<IProps> = ({
  setLoginError,
  setIsWaiting,
}) => {
  const [, setSession] = React.useContext(UserContext);
  const [, facebookResponse, facebookPromptAsync] = Facebook.useAuthRequest({
    expoClientId: "309557664110258",
    responseType: ResponseType.Token,
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
    if (facebookResponse?.type === "success") {
      const { access_token } = facebookResponse.params;
      console.log(facebookResponse.params);
      void (async () => {
        const res = await fetch(
          "https://glove-backend.herokuapp.com/users/social-login/facebook/",
          {
            method: "POST",
            body: JSON.stringify({
              access_token: access_token,
            }),
            headers: {
              "Content-Type": "application/json",
              Referer:
                "https://glove-backend.herokuapp.com/users/social-login/facebook/",
            },
          }
        );
        void handleResponse(res);
      })();
    }
  }, [facebookResponse]); //eslint-disable-line

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.4 : 1,
        },
        styles.socialLoginButton,
      ]}
      onPress={() => {
        console.log("google, ale inny :)");
        void facebookPromptAsync();
      }}
    >
      <Entypo
        name="facebook"
        size={24}
        color="white"
        style={{ paddingHorizontal: 4 }}
      />
      <Text style={styles.loginButtonText}>Zaloguj się przez Facebook</Text>
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

export default FacebookLoginButton;
