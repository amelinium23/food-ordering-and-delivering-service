import * as React from "react";
import { RestaurantOrder } from "../types/Order";
import {
  View,
  FlatList,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import RestaurantOrderHeader from "../components/RestaurantOrderHeader";
import { HistoricalOrder as OrderType } from "../types/ApiResponseTypes";
import UserContext from "../contexts/UserContext";

const OrderListScreen: React.FunctionComponent = () => {
  const [session, setSession] = React.useContext(UserContext);
  const [orders, setOrders] = React.useState<OrderType[]>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const requestData = async () => {
      const res = await fetch(
        "https://glove-backend.herokuapp.com/api/restaurant-orders/",
        {
          headers: {
            Authorization: `Bearer ${session.token.access_token}`,
          },
        }
      );
      if (res.ok) {
        const json = (await res.json()) as OrderType[];
        console.log(json);
        setOrders(json);
        setIsLoading(false);
      }
    };

    void requestData();
    setIsLoading(true);
  }, [session]);

  return isLoading ? (
    <View>
      <ActivityIndicator size="large" color="black" />
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => null}>
            <RestaurantOrderHeader
              id={item.id}
              user={item.user}
              dishes={item.dishes}
              status={item.status}
              restaurant={item.restaurant}
              order_placement_date={item.order_placement_date}
              order_delivery_date={item.order_delivery_date}
              delivery_address={item.delivery_address}
              order_cost={item.order_cost}
            />
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    fontSize: 14,
    flex: 1,
  },
  hearder: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(59, 108, 212)",
  },
  logo: {
    height: 35,
    resizeMode: "contain",
  },
  orderContainer: {
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 20,
    borderRadius: 10,
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

export default OrderListScreen;
