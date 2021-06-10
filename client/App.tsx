import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ListScreen from "./screens/ListScreen";
import HistoryScreen from "./screens/HistoryScreen";
import UserScreen from "./screens/UserScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import { RootStackParamList } from "./types/RootStackParamList";
import OrderScreen from "./screens/OrderScreen";
import { UserProvider } from "./contexts/UserContext";
import { SessionContext as SessionContextType } from "./types/SessionContext";

const RESTAURANTS = [
  {
    id: 1,
    key: "Pizza Hut",
    type: ["Pizza"],
    cost: 7.99,
    image:
      "https://creativeheads.pl/wp-content/uploads/2019/04/zdj.-3-pizza-hut-3.png",
    distance: 1.74,
  },
  {
    id: 2,
    key: "KFC",
    type: ["Amerykańska"],
    cost: 9.99,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/KFC_Logo.svg/800px-KFC_Logo.svg.png",
    distance: 3.33,
  },
  {
    id: 3,
    key: "McDonalds",
    type: ["Burgery", "Amerykańska"],
    cost: 5.99,
    image:
      "https://logofirmy.net/wp-content/uploads/2020/04/McDonalds-Logo.png",
    distance: 2.22,
  },
  {
    id: 4,
    key: "Sushi Kushi",
    type: ["Sushi", "Japońska"],
    cost: 1.99,
    image:
      "https://cdn.upmenu.com/static/site-logo/51bce6db-ec9c-11e3-ac27-00163edcb8a0/logo-1.png",
    distance: 2.86,
  },
  {
    id: 5,
    key: "Biesiadowo",
    type: ["Pizza"],
    cost: 10,
    image:
      "https://biesiadowo.pl/uploads/727fb13092ac8bf27f5b2de6535bc5f2d5798d3e.png",
    distance: 0.52,
  },
  {
    id: 6,
    key: "Forno Pizza",
    type: ["Pizza"],
    cost: 6.99,
    image:
      "https://static.pyszne.pl/images/restaurants/pl/NN1NP05/logo_465x320.png",
    distance: 10.3,
  },
  {
    id: 7,
    key: "DaGrasso",
    type: ["Włoska", "Pizza"],
    cost: 3.5,
    image: "https://cdn.dagrasso.pl/static/themes/3/assets-413/logo-home.png",
    distance: 8.11,
  },
  {
    id: 8,
    key: "Starbucks",
    type: ["Kawa", "Desery"],
    cost: 1.99,
    image:
      "https://logofirmy.net/wp-content/uploads/2020/09/Starbucks-Logo.png",
    distance: 3.21,
  },
];

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

const Restaurant = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(59, 108, 212)",
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerTitleStyle: {
          textAlign: "center",
          fontSize: 25,
          fontWeight: "400",
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Glove",
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Glove",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="RestaurantList"
        component={ListScreen}
        options={{
          title: "Glove",
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Restaurant"
        component={RestaurantScreen}
        options={({ route }) => ({ title: route.params.restaurantInfo.name })}
      />
      <Stack.Screen name="Order" component={OrderScreen} />
    </Stack.Navigator>
  );
};

const User = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(59, 108, 212)",
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerTitleStyle: {
          textAlign: "center",
          fontSize: 25,
          fontWeight: "400",
        },
      }}
    >
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{ title: "Użytkownik" }}
      />
    </Stack.Navigator>
  );
};

const History = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(59, 108, 212)",
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerTitleStyle: {
          textAlign: "center",
          fontSize: 25,
          fontWeight: "400",
        },
      }}
    >
      <Stack.Screen
        name="User"
        component={HistoryScreen}
        options={{ title: "Historia zamówień" }}
      />
    </Stack.Navigator>
  );
};

const App: React.FunctionComponent = () => {
  const [session, setSession] = React.useState<SessionContextType>({
    id: 0,
    account_type: 1,
    state: false,
    token: {
      access_token: "",
      refresh_token: "",
    },
  });
  /* tutaj zaleznie od typu konta chcialbym 3 rozne ekrany, dla
  usera(user_status = 1): Restauracje 
  // dla restauracji (user_status =
  2): Zamówienia(OrderListScreen), dla dostawcy(user_status = 3): cos
  dla dostawcy*/
  return (
    <NavigationContainer>
      <UserProvider value={[session, setSession]}>
        <Drawer.Navigator>
          <Drawer.Screen
            name="Restaurant"
            options={{ title: "Restauracje" }}
            component={Restaurant}
          />
          <Drawer.Screen
            name="User"
            options={{ title: "Użytkownik" }}
            component={User}
          />
          <Drawer.Screen
            name="History"
            options={{ title: "Historia zamówień" }}
            component={History}
          />
        </Drawer.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
