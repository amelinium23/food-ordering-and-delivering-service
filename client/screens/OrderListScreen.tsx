import * as React from "react";
import { View, ActivityIndicator } from "react-native";
import { HistoricalOrder as OrderType } from "../types/ApiResponseTypes";
import UserContext from "../contexts/UserContext";
import { RootStackParamList } from "../types/RootStackParamList";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import OrderList from "../components/OrderList";

type ListScreenRouteProp = RouteProp<RootStackParamList, "Orders">;

type ListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Orders"
>;

interface IProps {
  route: ListScreenRouteProp;
  navigation: ListScreenNavigationProp;
}

const OrderListScreen: React.FunctionComponent<IProps> = ({ navigation }) => {
  const [session] = React.useContext(UserContext);
  const [orders, setOrders] = React.useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const onPress = (item: OrderType) =>
    navigation.navigate("RestaurantOrder", { orderInfo: item });

  React.useEffect(() => {
    const requestData = async () => {
      const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking"); //eslint-disable-line
      RCTNetworking.clearCookies(() => {}); //eslint-disable-line
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
        setOrders(json);
        setIsLoading(false);
      }
    };

    void requestData();
    setIsLoading(true);
    if (refreshing) {
      setRefreshing(false);
    }
  }, [session, isFocused, refreshing]);

  return isLoading ? (
    <View>
      <ActivityIndicator size="large" color="black" />
    </View>
  ) : (
    <OrderList
      onPress={onPress}
      orders={orders}
      refreshing={refreshing}
      setRefreshing={setRefreshing}
    />
  );
};
export default OrderListScreen;
