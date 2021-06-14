import * as React from "react";
import useLocation from "../hooks/useLocation";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";

const DeliveryMapScreen = () => {
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [location, status] = useLocation();
  const initialLocation = location;
  const [updatedLocation, setUpdatedLocation] = React.useState(
    null as Location.LocationObject | null
  );

  //   React.useEffect(() => {}, []);

  //   if (initialLocation) {
  //     setTimeout(async () => {
  //       const location = await Location.getCurrentPositionAsync({});
  //       setLocation(location);
  //     }, 10000);
  //   }

  return (
    <View style={styles.container}>
      {initialLocation && location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: initialLocation.coords.latitude,
            longitude: initialLocation.coords.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0021,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Twoja pozycja"
            description="Tutaj sobie jesteś"
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default DeliveryMapScreen;
