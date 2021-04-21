import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import RestaurantHeader from "../components/RestaurantHeader";
import { RootStackParamList } from "../types/RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";

type ListScreenRouteProp = RouteProp<RootStackParamList, "RestaurantList">;

type ListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RestaurantList"
>;

interface IProps {
  route: ListScreenRouteProp;
  navigation: ListScreenNavigationProp;
}

const ListScreen: React.FunctionComponent<IProps> = ({ route, navigation }) => {
  const restaurants = route.params.restaurants;
  const [restList, setRestList] = React.useState(restaurants);

  const updateList = (filter: string) => {
    setRestList(
      filter.length > 0
        ? restaurants.filter((r) =>
            r.key.toLowerCase().includes(filter.toLowerCase())
          )
        : restaurants
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.header}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="always"
        onChangeText={(text) => {
          updateList(text);
        }}
        placeholder="Wpisz nazwę restauracji"
      />
      <FlatList
        data={restList}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("Restaurant", { restaurantInfo: item })
            }
          >
            <RestaurantHeader
              name={item.key}
              type={item.type}
              cost={item.cost}
              image={item.image}
              distance={item.distance}
            />
          </Pressable>
        )}
      />
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
  text: {
    color: "rgb(59, 108, 212)",
    fontSize: 42,
    fontWeight: "100",
    textAlign: "center",
  },
  header: {
    backgroundColor: "white",
    padding: 5,
    marginVertical: 7,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default ListScreen;
