import * as React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { RootStackParamList } from "../../types/RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import UserContext from "../../contexts/UserContext";
import axios, { AxiosResponse } from "axios";
import {
  HistoricalOrder as OrderType,
  DeliveryMan as DeliveryManType,
} from "../../types/ApiResponseTypes";

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
  const [orderInfo, setOrderInfo] = React.useState(route.params.orderInfo);
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [session] = React.useContext(UserContext);
  const [deliveryMan, setDeliveryMan] = React.useState<DeliveryManType>();
  const [isWaiting, setIsWaiting] = React.useState(false);
  const timeout = React.useRef(setTimeout(() => {}));
  const interval = React.useRef(setInterval(() => {}));
  let counter = 0;

  React.useEffect(() => {
    const getStatus = async () => {
      const res = await fetch(
        `https://glove-backend.herokuapp.com/api/orders/${orderInfo.id}/`,
        {
          headers: {
            Authorization: `Bearer ${session.token.access_token}`,
          },
        }
      );
      if (res.ok) {
        const json = (await res.json()) as OrderType;
        if (json.status !== orderInfo.status) {
          setOrderInfo(json);
        }
      }
    };

    const cancelDeliveryMan = async () => {
      console.log("#deliveryManIsOverParty");
      const res: AxiosResponse<OrderType> = await axios.patch(
        `https://glove-backend.herokuapp.com/api/orders/${orderInfo.id}/`,
        {
          status: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${session.token.access_token}`,
          },
        }
      );
      if (res.status === 200) {
        setOrderInfo(res.data);
      }
    };
    if (isWaiting) {
      clearInterval(interval.current);
      clearTimeout(timeout.current);
      interval.current = setInterval(() => void getStatus(), 5000);
      timeout.current = setTimeout(() => void cancelDeliveryMan(), 25000);
    } else {
      clearInterval(interval.current);
      clearTimeout(timeout.current);
    }
    return () => {
      clearInterval(interval.current);
      clearTimeout(timeout.current);
    };
  }, [isWaiting]); //eslint-disable-line

  React.useEffect(() => {
    switch (orderInfo.status) {
      case 2:
        setIsConfirmed(true);
        setIsWaiting(true);
        break;
      case 3:
        setIsConfirmed(true);
        setIsWaiting(false);
        break;
      default:
        setIsConfirmed(false);
        setIsWaiting(false);
        break;
    }
  }, [orderInfo]);

  React.useEffect(() => {
    if (deliveryMan) {
      void (async () => {
        try {
          const res: AxiosResponse<OrderType> = await axios.patch(
            `https://glove-backend.herokuapp.com/api/orders/${orderInfo.id}/`,
            {
              status: 2,
              delivery: deliveryMan.user,
            },
            {
              headers: {
                Authorization: `Bearer ${session.token.access_token}`,
              },
            }
          );
          if (res.status === 200) {
            setIsConfirmed(true);
            setIsWaiting(true);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [deliveryMan]); //eslint-disable-line

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

  const finishOrder = async () => {
    setIsWaiting(true);
    const res: AxiosResponse<OrderType> = await axios.patch(
      `https://glove-backend.herokuapp.com/api/orders/${orderInfo.id}/`,
      {
        status: 4,
      },
      {
        headers: {
          Authorization: `Bearer ${session.token.access_token}`,
        },
      }
    );
    if (res.status === 200) {
      navigation.goBack();
    } else {
      setIsWaiting(false);
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
                opacity: pressed ? 0.4 : isWaiting ? 0.4 : 1,
              },
              styles.button,
            ]}
            onPress={() => finishOrder()}
            disabled={isWaiting}
          >
            {isWaiting ? (
              <ActivityIndicator color="white" size={23} />
            ) : (
              <Text style={styles.buttonText}>Gotowe</Text>
            )}
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
            onPress={() => {
              // void confirmOrder();
              navigation.navigate("DeliveryManPicker", {
                setDeliveryMan: (x: DeliveryManType) => setDeliveryMan(x),
              });
            }}
          >
            <Text style={styles.buttonText}>Dostawca</Text>
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
