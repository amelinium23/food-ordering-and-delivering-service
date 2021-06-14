import * as React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  FlatList,
} from "react-native";
import UserContext from "../contexts/UserContext";
import { RootStackParamList } from "../types/RootStackParamList";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { DeliveryMan as DeliveryManType } from "../types/ApiResponseTypes";
import DeliveryManHeader from "../components/DeliveryManHeader";

// type ListScreenRouteProp = RouteProp<RootStackParamList, "DeliveryManPicker">;

// type ListScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "DeliveryManPicker"
// >;

// interface IProps {
//   route: ListScreenRouteProp;
//   navigation: ListScreenNavigationProp;
// }

const DeliveryManPickerScreen: React.FunctionComponent = () => {
  const [session] = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [deliveryMen, setDeliveryMen] = React.useState<DeliveryManType[]>([]);
  const navigation = useNavigation();

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
          <Pressable key={item.id.toString()}>
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
