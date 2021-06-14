import * as React from "react";
import {
  View,
  ActivityIndicator,
  Pressable,
  FlatList,
  LogBox,
} from "react-native";
import UserContext from "../contexts/UserContext";
import { RootStackParamList } from "../types/RootStackParamList";
import {
  RouteProp,
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import { DeliveryMan as DeliveryManType } from "../types/ApiResponseTypes";
import DeliveryManHeader from "../components/DeliveryManHeader";

const DeliveryManPickerScreen: React.FunctionComponent = () => {
  const [session] = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [deliveryMen, setDeliveryMen] = React.useState<DeliveryManType[]>([]);
  const navigation = useNavigation();
  const route: RouteProp<RootStackParamList, "DeliveryManPicker"> = useRoute();

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  useFocusEffect(
    React.useCallback(() => {
      void (async () => {
        setIsLoading(true);
        console.log("yo");
        const res = await fetch(
          `https://glove-backend.herokuapp.com/api/available-delivery-men/`,
          {
            headers: {
              Authorization: `Bearer ${session.token.access_token}`,
            },
          }
        );
        if (res.ok) {
          const json = (await res.json()) as DeliveryManType[];
          console.log(json);
          setDeliveryMen(json);
          setIsLoading(false);
        }
      })();
    }, [session])
  );

  return isLoading ? (
    <View>
      <ActivityIndicator size="large" color="black" />
    </View>
  ) : (
    <View>
      <FlatList
        data={deliveryMen}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            key={item.id.toString()}
            onPress={() => {
              navigation.goBack();
              route.params.setDeliveryMan(item);
            }}
          >
            <DeliveryManHeader
              id={item.id}
              user={item.user}
              location={item.location}
              distance_to_restaurant={item.distance_to_restaurant}
              status={item.status}
              last_online={item.last_online}
            />
          </Pressable>
        )}
      />
    </View>
  );
};

export default DeliveryManPickerScreen;
