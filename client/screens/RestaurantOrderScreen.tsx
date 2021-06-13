import * as React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import { RootStackParamList } from "../types/RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import UserContext from "../contexts/UserContext";
import axios, { AxiosResponse } from "axios";
import { HistoricalOrder as OrderType } from "../types/ApiResponseTypes";

type RestaurantOrderRouteProp = RouteProp<
  RootStackParamList,
  "RestaurantOrder"
>;

type RestaurantOrderNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RestaurantOrder"
>;

interface IProps {
  route: RestaurantOrderRouteProp;
  navigation: RestaurantOrderNavigationProp;
}

const RestaurantOrderScreen: React.FunctionComponent<IProps> = ({
  route,
  navigation,
}) => {
  const orderInfo = route.params.orderInfo;
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [session, setSession] = React.useContext(UserContext);
  let counter = 0;

  React.useEffect(() => {
    if (orderInfo.status === 3) {
      setIsConfirmed(true);
    }
  }, [orderInfo]);

  const rejectOrder = async () => {
    const res: AxiosResponse<OrderType> = await axios.patch(
      `https://glove-backend.herokuapp.com/api/orders/${orderInfo.id}/`,
      {
        status: 6,
      },
      {
        headers: {
          Authorization: `Bearer ${session.token.access_token}`,
        },
      }
    );
    if (res.status === 200) {
      navigation.goBack();
    }
  };

  const confirmOrder = async () => {
    const res: AxiosResponse<OrderType> = await axios.patch(
      `https://glove-backend.herokuapp.com/api/orders/${orderInfo.id}/`,
      {
        status: 3,
      },
      {
        headers: {
          Authorization: `Bearer ${session.token.access_token}`,
        },
      }
    );
    if (res.status === 200) {
      setIsConfirmed(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orderInfo.dishes}
        keyExtractor={(dish) => dish.dish.name + (counter++).toString()}
        renderItem={({ item }) => (
          <View
            key={item.dish.name + (counter++).toString()}
            style={styles.orderContent}
          >
            <View style={styles.checkboxAndText}>
              <BouncyCheckbox
                onPress={() => {}}
                fillColor="rgb(59, 108, 212)"
                iconStyle={{ borderColor: "rgb(59, 108, 212)" }}
              />
              <Text style={styles.dishName}>{item.dish.name}</Text>
            </View>
            {item.ordered_extras.map((extra) => (
              <View
                key={extra.extra.name + (counter++).toString()}
                style={styles.extra}
              >
                <Entypo name="plus" size={20} color="black" />
                <Text>{extra.extra.name}</Text>
              </View>
            ))}
          </View>
        )}
      />
      {isConfirmed ? (
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.4 : 1,
              },
              styles.button,
            ]}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>Gotowe</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.4 : 1,
              },
              styles.button,
            ]}
            onPress={() => rejectOrder()}
          >
            <Text style={styles.buttonText}>Anuluj</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.4 : 1,
              },
              styles.button,
            ]}
            onPress={() => confirmOrder()}
          >
            <Text style={styles.buttonText}>Potwierdź</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.4 : 1,
              },
              styles.button,
            ]}
            onPress={() => rejectOrder()}
          >
            <Text style={styles.buttonText}>Odrzuć</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignContent: "space-between",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
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
  },
  button: {
    backgroundColor: "rgb(59, 108, 212)",
    padding: 7,
    margin: 10,
    borderRadius: 10,
    flexBasis: "35%",
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
    fontSize: 20,
  },
  orderContent: {
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 20,
    //justifyContent: "center",
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
  dishName: {
    fontSize: 23,
    color: "rgb(59, 108, 212)",
    marginLeft: -7,
  },
  extra: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxAndText: {
    flexDirection: "row",
    margin: 5,
  },
});

export default RestaurantOrderScreen;
