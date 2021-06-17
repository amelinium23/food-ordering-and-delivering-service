import * as React from "react";
import useLocation from "../../hooks/useLocation";
// eslint-disable-next-line import/named
import MapView, { Marker, Region } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import { RootStackParamList } from "../../types/RootStackParamList";
import { Foundation } from "@expo/vector-icons";

const DeliveryMapScreen: React.FunctionComponent = () => {
  const [location] = useLocation();
  const [updatedLocation, setUpdatedLocation] = React.useState(location);
  const [region, setRegion] = React.useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0021,
  } as Region);
  const route = useRoute<RouteProp<RootStackParamList, "DeliveryMap">>();

  useFocusEffect(
    React.useCallback(() => {
      let locationUpdater = setInterval(() => {}, 10000);
      if (location) {
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

  const centerRegion = () => {
    setRegion({
      longitude: updatedLocation?.coords.longitude as number,
      latitude: updatedLocation?.coords.latitude as number,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0021,
    });
  };

  React.useEffect(() => {
    if (route.params) {
      setRegion({
        latitude: route.params.lat,
        longitude: route.params.lon,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    }
  }, [route.params]);

  React.useEffect(() => {
    if (location) {
      setUpdatedLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      });
    }
  }, [location]); //eslint-disable-line

  return (
    <View style={styles.container}>
      {location ? (
        <View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0021,
            }}
            region={region}
          >
            {updatedLocation && (
              <Marker
                coordinate={{
                  latitude: updatedLocation.coords.latitude,
                  longitude: updatedLocation.coords.longitude,
                }}
                title="Twoja pozycja"
                pinColor="blue"
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
          <View style={styles.buttonBackground}>
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.4 : 1,
                },
              ]}
              onPress={centerRegion}
            >
              <Foundation name="target-two" size={40} color="white" />
            </Pressable>
          </View>
        </View>
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
  buttonBackground: {
    backgroundColor: "rgb(59, 108, 212)",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "rgb(59, 108, 212)",
    width: 70,
    height: 70,
    position: "absolute",
    right: 15,
    bottom: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DeliveryMapScreen;
