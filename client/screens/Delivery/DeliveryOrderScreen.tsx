import * as React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import { RootStackParamList } from "../../types/RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import UserContext from "../../contexts/UserContext";
import axios, { AxiosResponse } from "axios";
import {
  HistoricalOrder as OrderType,
  Restaurant,
} from "../../types/ApiResponseTypes";
// eslint-disable-next-line import/named
import { TOMTOM_API_KEY } from "react-native-dotenv";
import { TomtomGeocodeResponse } from "../../types/TomtomApiResponseTypes";
type DeliveryOrderRouteProp = RouteProp<RootStackParamList, "DeliveryOrder">;

type DeliveryOrderNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DeliveryOrder"
>;

interface IProps {
  route: DeliveryOrderRouteProp;
  navigation: DeliveryOrderNavigationProp;
}

const DeliveryOrderScreen: React.FunctionComponent<IProps> = ({
  route,
  navigation,
}) => {
  const orderInfo = route.params.orderInfo;
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [isPickedUp, setIsPickedUp] = React.useState(false);
  const [session, setSession] = React.useContext(UserContext);
  let counter = 0;

  React.useEffect(() => {
    if (orderInfo.status === 3) {
      setIsConfirmed(true);
    } else if (orderInfo.status === 4) {
      setIsPickedUp(true);
    }
  }, [orderInfo]);

  const rejectOrder = async () => {
    const res: AxiosResponse<OrderType> = await axios.patch(
      `https://glove-backend.herokuapp.com/api/orders/${orderInfo.id}/`,
      {
        status: 1,
        delivery: null,
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

  const confirmDelivery = async () => {
    const currentDate = new Date();
    const res: AxiosResponse<OrderType> = await axios.patch(
      `https://glove-backend.herokuapp.com/api/orders/${orderInfo.id}/`,
      {
        status: 5,
        order_delivery_date: currentDate.toISOString(),
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

  const getMarkerLocation = async () => {
    if (isPickedUp) {
      const res: AxiosResponse<TomtomGeocodeResponse> = await axios.get(
        `https://api.tomtom.com/search/2/geocode/${encodeURI(
          orderInfo.delivery_address
        )}.json?key=${TOMTOM_API_KEY}`
      );
      if (res.status === 200) {
        console.log(res.data);
        if (res.data.results.length) {
          navigation.navigate("DeliveryMap", {
            lon: res.data.results[0].position.lon,
            lat: res.data.results[0].position.lat,
            title: "Miejsce dostawy",
            description: orderInfo.delivery_address,
          });
        } else {
          navigation.goBack();
        }
      }
    } else {
      const res: AxiosResponse<Restaurant> = await axios.get(
        `https://glove-backend.herokuapp.com/api/restaurant-from-order/${orderInfo.id}/`,
        {
          headers: {
            Authorization: `Bearer ${session.token.access_token}`,
          },
        }
      );
      if (res.status === 200) {
        navigation.navigate("DeliveryMapStack", {
          screen: "DeliveryMap",
          params: {
            lon: res.data.location.longitude,
            lat: res.data.location.latitude,
            title: `Restauracja ${res.data.name}`,
            description: res.data.address,
          },
        });
      }
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
      {isConfirmed || isPickedUp ? (
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.4 : 1,
              },
              styles.button,
            ]}
            onPress={() => {
              void getMarkerLocation();
            }}
          >
            <Text style={styles.buttonText}>Pokaż na mapie</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.4 : isPickedUp ? 1 : 0.4,
              },
              styles.button,
            ]}
            onPress={() => {
              void confirmDelivery();
            }}
            disabled={!isPickedUp}
          >
            <Text style={styles.buttonText}>Potwierdź doręczenie</Text>
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
              void confirmOrder();
            }}
          >
            <Text style={styles.buttonText}>Akceptuj</Text>
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

export default DeliveryOrderScreen;
