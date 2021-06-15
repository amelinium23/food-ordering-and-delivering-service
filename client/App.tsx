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
import PasswordChangeScreen from "./screens/PasswordChangeScreen";
import DeliveryMapScreen from "./screens/DeliveryMapScreen";
import DeliveryManPickerScreen from "./screens/DeliveryManPickerScreen";
import DeliveryListScreen from "./screens/DeliveryListScreen";
import DeliveryOrderScreen from "./screens/DeliveryOrderScreen";

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

const Authorization = () => {
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
      <Stack.Screen
        name="PasswordChange"
        component={PasswordChangeScreen}
        options={{ title: "Zmiana hasła" }}
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

const DeliveryMan = () => {
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
        name="DeliveryList"
        component={DeliveryListScreen}
        options={{ title: "Lista dostaw" }}
      />
      <Stack.Screen
        name="DeliveryOrder"
        component={DeliveryOrderScreen}
        options={({ route }) => ({
          title: `Zamówienie #${route.params.orderInfo.id}`,
        })}
      />
    </Stack.Navigator>
  );
};

const DeliveryMap = () => {
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
        name="DeliveryMap"
        component={DeliveryMapScreen}
        options={{ title: "Mapa dostaw" }}
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
      <Stack.Screen
        name="DeliveryManPicker"
        component={DeliveryManPickerScreen}
        options={{
          title: "Dostawca",
        }}
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
      <Drawer.Screen
        name="History"
        options={{ title: "Historia zamówień" }}
        component={History}
      />
    </Drawer.Navigator>
  );
};

const DeliveryNavigator = () => {
  const [, setSession] = React.useContext(UserContext);

  return (
    <Drawer.Navigator
      initialRouteName="DeliveryMap"
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
        name="DeliveryMap"
        options={{ title: "Mapa" }}
        component={DeliveryMap}
      />
      <Drawer.Screen
        name="DeliveryMan"
        options={{ title: "Lista dostaw" }}
        component={DeliveryMan}
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
      case 4:
        return <ClientNavigator />;
      case 2:
        return <DeliveryNavigator />;
      case 3:
        return <RestaurantNavigator />;
      default:
        return <ErrorNavigator />;
    }
  };
  return (
    <NavigationContainer>
      <UserProvider value={[session, setSession]}>
        {!session.state ? (
          <Authorization />
        ) : (
          renderNavigator(session.account_type)
        )}
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
