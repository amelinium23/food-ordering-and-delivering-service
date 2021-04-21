import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { RouteProp } from "@react-navigation/core";
import { RootStackParamList } from "../types/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import DishHeader from "../components/DishHeader";

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

type OrderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Order"
>;

interface IProps {
  route: OrderScreenRouteProp;
  navigation: OrderScreenNavigationProp;
}

const OrderScreen: React.FunctionComponent<IProps> = ({
  route,
  navigation,
}) => {
  const orderDishList = route.params.orderInfo;
  const deliveryCost = route.params.deliveryCost;
  return (
    <View style={styles.container}>
      <FlatList
        data={orderDishList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <DishHeader name={item.name} price={item.price} image={item.image} />
        )}
      />
      <View style={styles.footer}>
        <Text>
          {`Suma: ${orderDishList
            .reduce((current, e) => current + e.price, deliveryCost)
            .toFixed(2)} zł`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignContent: "space-between",
    flex: 1,
  },
  footer: {
    padding: 10,
    alignItems: "center",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: "white",
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

export default OrderScreen;
