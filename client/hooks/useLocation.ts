import * as React from "react";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";

type Status = "unloaded" | "loaded" | "error";

const useLocation = (): [LocationObject | null, string] => {
  const [location, setLocation] = React.useState(null as null | LocationObject);
  const [loadingStatus, setLoadingStatus] = React.useState(
    "unloaded" as Status
  );
  React.useEffect(() => {
    const requestLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation);
          setLoadingStatus("loaded");
        } else {
          setLoadingStatus("error");
        }
      } catch (err) {
        setLoadingStatus("error");
      }
    };
    void requestLocation();
  }, []);

  return [location, loadingStatus];
};

export default useLocation;
