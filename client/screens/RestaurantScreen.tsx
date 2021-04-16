import * as React from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";
import { RootStackParamList } from "../types/RootStackParamList";
import DishHeader from "../components/DishHeader";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const DISHES = [
  {
    category: "Pizza",
    data: [
      {
        name: "Margherita",
        price: 14.99,
        image:
          "https://pojedzone.eu/wp-content/uploads/2021/03/pizza-3000274_1920-marggerita.jpg",
      },
      {
        name: "Pepperoni",
        price: 17.99,
        image:
          "https://dwormarcinkowo.pl/wp-content/uploads/2020/03/Pizza-Pepperoni.jpg",
      },
      {
        name: "Hawajska",
        price: 16.99,
        image:
          "https://www.pogotujmy.pl/wp-content/uploads/2016/11/DSC_0442-725x1039.jpg",
      },
      {
        name: "Quattro formaggi",
        price: 18.99,
        image:
          "https://s3.przepisy.pl/przepisy3ii/img/variants/767x0/pizza-quattro-formaggi.jpg",
      },
    ],
  },
  {
    category: "Przystawki",
    data: [
      {
        name: "Skrzydełka",
        price: 8.99,
        image:
          "https://jesspryles.com/wp-content/uploads/2020/01/smoked-chicken-wings-46-1440x900.jpg",
      },
      {
        name: "Pieczywo czosnkowe",
        price: 9.99,
        image:
          "https://www.shugarysweets.com/wp-content/uploads/2020/04/garlic-bread-4-720x540.jpg",
      },
    ],
  },
  {
    category: "Desery",
    data: [
      {
        name: "Lava cake",
        price: 12.99,
        image:
          "https://polki.pl/foto/4_3_LARGE/lava-cake-czyli-przepis-na-czekoladowy-deser-z-plynnym-srodkiem-2449537.jpg",
      },
      {
        name: "Szarlotka",
        price: 10.99,
        image:
          "https://blix.pl/gotuj/wp-content/uploads/2018/11/szarlotka-w-style-apple-pie.jpg",
      },
      {
        name: "Sernik",
        price: 10.99,
        image:
          "https://www.splenda.com/wp-content/themes/bistrotheme/assets/recipe-images/american-classic-cheesecake.jpg",
      },
    ],
  },
  {
    category: "Napoje",
    data: [
      {
        name: "Lemoniada",
        price: 8.99,
        image:
          "https://images-gmi-pmc.edge-generalmills.com/2586d951-a46a-4091-aec6-eca3adefb409.jpg",
      },
    ],
  },
];

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

  return (
    <View>
      <SectionList
        sections={DISHES}
        keyExtractor={(item) => item.name}
        stickySectionHeadersEnabled={false} // need to set it to false as it's true by default on iOS
        renderSectionHeader={({ section: { category } }) => (
          <Text style={styles.categoryHeader}>{category}</Text>
        )}
        renderItem={({ item }) => (
          <DishHeader name={item.name} price={item.price} image={item.image} />
        )}
      />
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
