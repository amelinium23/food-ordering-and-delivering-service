import * as React from "react";
import { HistoricalOrder as OrderType } from "../types/ApiResponseTypes";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import OrderHeader from "../components/OrderHeader";
import UserContext from "../contexts/UserContext";

const HistoryScreen: React.FunctionComponent = () => {
  const [session] = React.useContext(UserContext);
  const [orders, setOrders] = React.useState([] as OrderType[]);
  const [refreshing, setRefreshing] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const requestData = async () => {
        const res = await fetch(
          `https://glove-backend.herokuapp.com/api/order-history/${session.id}/`,
          { headers: { Authorization: `Bearer ${session.token.access_token}` } }
        );
        if (res.ok) {
          const json = (await res.json()) as OrderType[];
          setOrders(json);
        }
      };
      void requestData();
      if (refreshing) {
        setRefreshing(false);
      }
    }, [session, refreshing])
  );

  return (
    <View style={styles.container}>
      {orders.length > 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
          data={orders}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <Pressable key={`${item.id}`} onPress={() => null}>
              <OrderHeader
                user={item.user}
                id={item.id}
                order_delivery_date={item.order_delivery_date}
                status={item.status}
                order_cost={item.order_cost}
                restaurant={item.restaurant}
                dishes={item.dishes}
                delivery_address={item.delivery_address}
                order_placement_date={item.order_placement_date}
              />
            </Pressable>
          )}
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.hearder}>Brak zamówień</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    fontSize: 14,
    flex: 1,
    backgroundColor: "white",
  },
  hearder: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(59, 108, 212)",
    textAlign: "center",
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

export default HistoryScreen;
