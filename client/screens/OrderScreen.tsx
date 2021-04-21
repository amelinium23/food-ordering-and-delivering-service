import * as React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { RouteProp } from "@react-navigation/core";
import { FontAwesome5 } from "@expo/vector-icons";
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
        <View>
          <Text style={styles.footerText}>
            {`Suma: ${orderDishList
              .reduce((current, e) => current + e.price, deliveryCost)
              .toFixed(2)} zł`}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.4 : 1,
            },
            styles.checkoutButton,
          ]}
        >
          <Text style={styles.checkoutButtonText}>Zapłać</Text>
        </Pressable>
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
    flexDirection: "column",
    padding: 10,
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
    alignContent: "space-between",
  },
  footerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  checkoutButton: {
    alignSelf: "flex-end",
    backgroundColor: "rgb(59, 108, 212)",
    padding: 7,
    margin: 10,
    borderRadius: 10,
  },
  checkoutButtonText: {
    fontSize: 20,
    color: "white",
  },
});

export default OrderScreen;
