import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import ListScreen from "./screens/ListScreen";
import HistoryScreen from "./screens/HistoryScreen";
import UserScreen from "./screens/UserScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import RestaurantOrderScreen from "./screens/RestaurantOrderScreen";
import { RootStackParamList } from "./types/RootStackParamList";
import OrderScreen from "./screens/OrderScreen";
import UserContext, { UserProvider } from "./contexts/UserContext";
import { SessionContext as SessionContextType } from "./types/SessionContext";
import { View, Text } from "react-native";
import OrderListScreen from "./screens/OrderListScreen";

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

const Authorisation = () => {
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
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Glove",
        }}
      />
    </Stack.Navigator>
  );
};

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
        options={{ title: "Konto" }}
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

const ErrorNavigator = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "rgb(59,108,212)",
          fontSize: 42,
          fontWeight: "100",
          textAlign: "center",
        }}
      >
        Coś poszło nie tak
      </Text>
    </View>
  );
};

const ClientNavigator = () => {
  const [, setSession] = React.useContext(UserContext);

  return (
    <Drawer.Navigator
      initialRouteName="Restaurant"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Wyloguj się"
              onPress={() =>
                setSession({
                  id: 0,
                  account_type: 1,
                  state: false,
                  token: {
                    access_token: "",
                    refresh_token: "",
                  },
                })
              }
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="Restaurant"
        options={{ title: "Restauracje" }}
        component={Restaurant}
      />
      <Drawer.Screen
        name="User"
        options={{ title: "Konto" }}
        component={User}
      />
      <Drawer.Screen
        name="History"
        options={{ title: "Historia zamówień" }}
        component={History}
      />
    </Drawer.Navigator>
  );
};

const Orders = () => {
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
        name="Orders"
        component={OrderListScreen}
        options={{ title: "Zamówienia" }}
      />
      <Stack.Screen
        name="RestaurantOrder"
        component={RestaurantOrderScreen}
        options={({ route }) => ({
          title: `Zamówienie #${route.params.orderInfo.id}`,
        })}
      />
    </Stack.Navigator>
  );
};

const RestaurantNavigator = () => {
  const [, setSession] = React.useContext(UserContext);

  return (
    <Drawer.Navigator
      initialRouteName="Orders"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Wyloguj się"
              onPress={() =>
                setSession({
                  id: 0,
                  account_type: 1,
                  state: false,
                  token: {
                    access_token: "",
                    refresh_token: "",
                  },
                })
              }
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="Orders"
        options={{ title: "Zamówienia" }}
        component={Orders}
      />
    </Drawer.Navigator>
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

  const renderNavigator = (type: number) => {
    switch (type) {
      case 1:
        return <ClientNavigator />;
      case 2:
        return <ErrorNavigator />;
      case 3:
        return <RestaurantNavigator />;
      default:
        return <ErrorNavigator />;
    }
  };
  /* tutaj zaleznie od typu konta chcialbym 3 rozne ekrany, dla
  usera(user_status = 1): Restauracje 
  // dla restauracji (user_status =
  2): Zamówienia(OrderListScreen), dla dostawcy(user_status = 3): cos
  dla dostawcy*/
  return (
    <NavigationContainer>
      <UserProvider value={[session, setSession]}>
        {!session.state ? (
          <Authorisation />
        ) : (
          renderNavigator(session.account_type)
        )}
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
