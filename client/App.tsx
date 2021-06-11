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
