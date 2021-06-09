import * as React from "react";
import { View, Text, SectionList, StyleSheet, Pressable } from "react-native";
import { RootStackParamList } from "../types/RootStackParamList";
import DishHeader from "../components/DishHeader";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import RestaurantBasket from "../components/RestaurantBasket";
import { Dish as DishType } from "../types/Dish";
import { IExtraType } from "../types/ExtrasGroup";
import { DishProvider } from "../contexts/DishContext";
import Order from "../types/Order";
import UserContext from "../contexts/UserContext";
import { MenuCategory as MenuCategoryType } from "../types/ApiResponseTypes";

type RestaurantScreenRouteProp = RouteProp<RootStackParamList, "Restaurant">;

type RestaurantScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Restaurant"
>;

interface IProps {
  route: RestaurantScreenRouteProp;
  navigation: RestaurantScreenNavigationProp;
}

const RestaurantScreen: React.FunctionComponent<IProps> = ({
  route,
  navigation,
}) => {
  const details = route.params.restaurantInfo;
  const [session, setSession] = React.useContext(UserContext);
  const [dishList, setDishList] = React.useState<DishType[]>([]);
  const [menu, setMenu] = React.useState([] as MenuCategoryType[]);

  React.useEffect(() => {
    const requestData = async () => {
      const res = await fetch(
        `https://glove-backend.herokuapp.com/api/restaurants/${details.id}/menu`,
        {
          headers: {
            Authorization: `Bearer ${session.token.access_token}`,
          },
        }
      );
      if (res.ok) {
        const json = (await res.json()) as MenuCategoryType[];
        setMenu(json);
      }
    };
    void requestData();
  }, [session, details]);

  return (
    <View>
      <DishProvider value={[dishList, setDishList]}>
        <SectionList
          sections={menu}
          keyExtractor={(item) => item.name}
          stickySectionHeadersEnabled={false} // need to set it to false as it's true by default on iOS
          renderSectionHeader={({ section: { name } }) => (
            <Text style={styles.categoryHeader}>{name}</Text>
          )}
          renderItem={({ item }) => (
            <DishHeader
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              extras_group={item.extras_group}
              isExtendable={true}
            />
          )}
        />
        <RestaurantBasket route={route} navigation={navigation} />
      </DishProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryHeader: {
    color: "rgb(59, 108, 212)",
    fontSize: 25,
    fontWeight: "400",
    textAlign: "left",
    marginHorizontal: 20,
  },
});

export default RestaurantScreen;
