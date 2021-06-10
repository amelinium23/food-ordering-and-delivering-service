import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  Pressable,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import RestaurantHeader from "../components/RestaurantHeader";
import { RootStackParamList } from "../types/RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Restaurant as RestaurantType } from "../types/ApiResponseTypes";
import UserContext from "../contexts/UserContext";
import useLocation from "../hooks/useLocation";

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
  const [session, setSession] = React.useContext(UserContext);
  const [restaurants, setRestaurants] = React.useState([] as RestaurantType[]);
  const [filter, setFilter] = React.useState("");
  const [cuisineType, setCuisineType] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [restList, setRestList] = React.useState(restaurants);
  const [location, status] = useLocation();

  React.useEffect(() => {
    const requestData = async () => {
      let res;
      // console.log(session.token.access_token);
      // console.log(session.token.refresh_token);

      if (location && status == "loaded") {
        // console.log("mamy to");
        console.log(
          `https://glove-backend.herokuapp.com/api/restaurants?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
        );
        res = await fetch(
          `https://glove-backend.herokuapp.com/api/restaurants?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`,
          {
            headers: {
              Authorization: `Bearer ${session.token.access_token}`,
            },
          }
        );
      } else if (status === "error") {
        // console.log("jednak nie");
        res = await fetch(
          "https://glove-backend.herokuapp.com/api/restaurants/",
          {
            headers: {
              Authorization: `Bearer ${session.token.access_token}`,
            },
          }
        );
      } else {
        return;
      }
      if (res.ok) {
        const json = (await res.json()) as RestaurantType[];
        // console.log(json);
        setRestaurants(json);
        setIsLoading(false);
      } else {
        const json = (await res.json()) as RestaurantType[];
        // console.log(json);
        console.log(res.status);
      }
    };
    void requestData();
  }, [session, status]);

  React.useEffect(() => {
    setRestList(restaurants);
  }, [restaurants]);

  React.useEffect(() => {
    void updateList();
  }, [filter, cuisineType]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateList = () => {
    const search =
      filter.length > 0
        ? restaurants.filter((r) =>
            r.name.toLowerCase().includes(filter.toLowerCase())
          )
        : restaurants;
    const picker =
      cuisineType !== ""
        ? restaurants.filter((r) => r.cuisine_type.includes(cuisineType))
        : restaurants;

    setRestList(search.filter((e) => picker.includes(e)));
  };

  return isLoading ? (
    <View>
      <ActivityIndicator size="large" color="black" />
    </View>
  ) : (
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
          useNativeAndroidPickerStyle={false}
          items={Array.from(
            new Set(
              restaurants.reduce(
                (current, e) => current.concat(e.cuisine_type),
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
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("Restaurant", { restaurantInfo: item })
            }
          >
            <RestaurantHeader
              id={item.id}
              cuisine_type={item.cuisine_type}
              distance={item.distance}
              location={item.location}
              name={item.name}
              logo={item.logo}
              address={item.address}
              delivery_cost={item.delivery_cost}
              description={item.description}
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
    alignItems: "center",
    alignContent: "center",
  },
  searchBar: {
    flex: 1,
  },
  picker: {
    backgroundColor: "white",
    flexDirection: "row",
    borderColor: "lightgrey",
    borderLeftWidth: 1,
  },
  pickerText: {
    paddingHorizontal: 5,
  },
});

export default ListScreen;
