import * as React from "react";
import useLocation from "../../hooks/useLocation";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import { RootStackParamList } from "../../types/RootStackParamList";

const DeliveryMapScreen: React.FunctionComponent = () => {
  const [location] = useLocation();
  const [updatedLocation, setUpdatedLocation] = React.useState(location);
  const route = useRoute<RouteProp<RootStackParamList, "DeliveryMap">>();

  useFocusEffect(
    React.useCallback(() => {
      let locationUpdater = setInterval(() => {}, 10000);
      if (location) {
        setUpdatedLocation(location);
        clearInterval(locationUpdater);
        locationUpdater = setInterval(() => {
          void (async () => {
            const newLocation = await Location.getCurrentPositionAsync({});
            setUpdatedLocation(newLocation);
          })();
        }, 10000);
      }
      return () => clearInterval(locationUpdater);
    }, [location])
  );

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0021,
          }}
        >
          {updatedLocation && (
            <Marker
              coordinate={{
                latitude: updatedLocation.coords.latitude,
                longitude: updatedLocation.coords.longitude,
              }}
              title="Twoja pozycja"
              description="Tutaj sobie jesteś"
            />
          )}
          {route.params && (
            <Marker
              coordinate={{
                latitude: route.params.lat,
                longitude: route.params.lon,
              }}
              title={route.params.title}
              description={route.params.description}
            />
          )}
        </MapView>
      ) : (
        <Text>Oczekiwanie na lokalizację...</Text>
      )}
      <View style={styles.mapDrawerOverlay} />
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
  mapDrawerOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.0,
    height: Dimensions.get("window").height,
    width: 20,
  },
});

export default DeliveryMapScreen;
