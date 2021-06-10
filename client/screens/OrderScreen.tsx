import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import DishHeader from "../components/DishHeader";
import UserContext from "../contexts/UserContext";
import axios from "axios";

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
  const deliveryCost = route.params.restaurantInfo.delivery_cost;
  const restaurantId = route.params.restaurantInfo.id;
  const [session, setSession] = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [deliveryAddress, setDeliveryAddress] = React.useState("");

  const postOrder = async () => {
    setIsLoading(true);
    const res = await axios.post(
      `https://glove-backend.herokuapp.com/api/orders/`,
      {
        restaurantId: restaurantId,
        orderedItems: orderDishList.map((order) => ({
          dishId: order.dishId,
          orderedExtras: order.orderedExtras,
        })),
        orderCost: orderDishList.reduce(
          (curr, e) => curr + e.totalCost,
          deliveryCost
        ),
        deliveryAddress: deliveryAddress,
      },
      {
        headers: {
          Authorization: `Bearer ${session.token.access_token}`,
        },
      }
    );
    if (res.status === 200) {
      navigation.navigate("RestaurantList", {});
    } else {
      setIsLoading(false);
    }
  };

  let id = 0;
  return (
    <View style={styles.container}>
      <View style={styles.addressInput}>
        <Text style={styles.addressLabel}>Adres:</Text>
        <TextInput
          style={styles.input}
          value={deliveryAddress}
          onChangeText={(text) => setDeliveryAddress(text)}
        />
      </View>
      <FlatList
        data={orderDishList}
        keyExtractor={(item) => `${item.dishId + id++}`}
        renderItem={({ item }) => (
          <DishHeader
            id={item.dishId}
            name={item.dishName}
            price={item.totalCost}
            image={item.image}
            extras_group={[]}
            isExtendable={false}
          />
        )}
      />
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerText}>
            {`Do zapłaty: ${orderDishList
              .reduce((current, e) => current + e.totalCost, deliveryCost)
              .toFixed(2)} zł`}
          </Text>
        </View>
        <Pressable
          disabled={deliveryAddress.length === 0}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.4 : deliveryAddress.length === 0 ? 0.4 : 1,
            },
            styles.checkoutButton,
          ]}
          onPress={() => postOrder()}
        >
          <Text style={styles.checkoutButtonText}>Zamów</Text>
          {isLoading ? <ActivityIndicator color="white" size={23} /> : null}
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
    flexDirection: "row",
    justifyContent: "space-between",
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
    alignItems: "center",
  },
  footerText: {
    fontSize: 19,
    margin: 10,
  },
  checkoutButton: {
    alignSelf: "flex-end",
    flexDirection: "row",
    backgroundColor: "rgb(59, 108, 212)",
    margin: 10,
    borderRadius: 10,
  },
  checkoutButtonText: {
    fontSize: 20,
    margin: 7,
    color: "white",
  },
  addressInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressLabel: {
    fontSize: 20,
    marginLeft: 10,
    color: "rgb(59, 108, 212)",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
});

export default OrderScreen;
