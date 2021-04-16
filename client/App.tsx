import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "./screens/ListScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import { RootStackParamList } from "./types/RootStackParamList";

const RESTAURANTS = [
  {
    key: "Pizza Hut",
    type: ["Pizza"],
    cost: 7.99,
    image:
      "https://creativeheads.pl/wp-content/uploads/2019/04/zdj.-3-pizza-hut-3.png",
    distance: 1.74,
  },
  {
    key: "KFC",
    type: ["Amerykańska"],
    cost: 9.99,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/KFC_Logo.svg/800px-KFC_Logo.svg.png",
    distance: 3.33,
  },
  {
    key: "McDonalds",
    type: ["Burgery", "Amerykańska"],
    cost: 5.99,
    image:
      "https://logofirmy.net/wp-content/uploads/2020/04/McDonalds-Logo.png",
    distance: 2.22,
  },
  {
    key: "Sushi Kushi",
    type: ["Sushi", "Japońska"],
    cost: 1.99,
    image:
      "https://cdn.upmenu.com/static/site-logo/51bce6db-ec9c-11e3-ac27-00163edcb8a0/logo-1.png",
    distance: 2.86,
  },
  {
    key: "Biesiadowo",
    type: ["Pizza"],
    cost: 10,
    image:
      "https://biesiadowo.pl/uploads/727fb13092ac8bf27f5b2de6535bc5f2d5798d3e.png",
    distance: 0.52,
  },
  {
    key: "Forno Pizza",
    type: ["Pizza"],
    cost: 6.99,
    image:
      "https://static.pyszne.pl/images/restaurants/pl/NN1NP05/logo_465x320.png",
    distance: 10.3,
  },
  {
    key: "DaGrasso",
    type: ["Włoska", "Pizza"],
    cost: 3.5,
    image: "https://cdn.dagrasso.pl/static/themes/3/assets-412/logo-home.png",
    distance: 8.11,
  },
  {
    key: "Starbucks",
    type: ["Kawa", "Desery"],
    cost: 1.99,
    image:
      "https://logofirmy.net/wp-content/uploads/2020/09/Starbucks-Logo.png",
    distance: 3.21,
  },
];

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "rgb(59, 108, 212)",
          },
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
          initialParams={{ restaurants: RESTAURANTS }}
          options={{
            title: "Glove",
          }}
        />
        <Stack.Screen
          name="Restaurant"
          component={RestaurantScreen}
          options={({ route }) => ({ title: route.params.restaurantInfo.key })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
