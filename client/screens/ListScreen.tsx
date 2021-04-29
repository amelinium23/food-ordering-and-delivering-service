import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  Pressable,
  View,
  Text,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import RestaurantHeader from "../components/RestaurantHeader";
import { RootStackParamList } from "../types/RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { AntDesign } from "@expo/vector-icons";

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
  const [filter, setFilter] = React.useState("");
  const [cuisineType, setCuisineType] = React.useState("");
  const [restList, setRestList] = React.useState(restaurants);

  React.useEffect(() => {
    void updateList();
  }, [filter, cuisineType]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateList = () => {
    const search =
      filter.length > 0
        ? restaurants.filter((r) =>
            r.key.toLowerCase().includes(filter.toLowerCase())
          )
        : restaurants;
    const picker =
      cuisineType !== ""
        ? restaurants.filter((r) => r.type.includes(cuisineType))
        : restaurants;

    setRestList(search.filter((e) => picker.includes(e)));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Część z wyszukiwaniem i filtrowaniem, do wydzielenia jako osobny komponent */}
      <View style={styles.header}>
        <TextInput
          value={filter}
          style={styles.searchBar}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          onChangeText={(text) => {
            setFilter(text);
          }}
          placeholder="Wpisz nazwę restauracji"
        />
        <RNPickerSelect
          placeholder={{ label: "Wszystko", value: "" }}
          items={Array.from(
            new Set(
              restaurants.reduce(
                (current, e) => current.concat(e.type),
                [] as string[]
              )
            )
          ).map((e) => ({ label: e, value: e, key: e }))}
          onValueChange={(item) => {
            setCuisineType(item);
          }}
        >
          <View style={styles.picker}>
            <Text
              style={[
                styles.pickerText,
                cuisineType.length
                  ? { color: "black" }
                  : { color: "lightgrey" },
              ]}
            >
              {cuisineType.length ? cuisineType : "Typ kuchni"}
            </Text>
            <AntDesign
              name="down"
              size={15}
              color="lightgrey"
              style={[
                { textAlign: "center", alignSelf: "center" },
                cuisineType.length
                  ? { color: "black" }
                  : { color: "lightgrey" },
              ]}
            />
          </View>
        </RNPickerSelect>
      </View>
      {/* Tutaj koniec części wyszukiwarki i filtrowania */}
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
    flexDirection: "row",
  },
  searchBar: {
    flex: 1,
  },
  picker: {
    flexDirection: "row",
    borderColor: "lightgrey",
    borderLeftWidth: 1,
  },
  pickerText: {
    paddingHorizontal: 5,
  },
});

export default ListScreen;
