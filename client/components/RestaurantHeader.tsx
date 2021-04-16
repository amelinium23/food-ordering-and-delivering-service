import * as React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { FontAwesome5, Ionicons, Entypo } from "@expo/vector-icons";

interface IProps {
  name: string;
  type: string[];
  cost: number;
  image: string;
  distance: number;
}

const RestaurantHeader: React.FunctionComponent<IProps> = ({
  name,
  type,
  cost,
  image,
  distance,
}) => {
  return (
    <View style={styles.listItem}>
      <View style={styles.labelView}>
        <Text style={styles.listItemText}>{name}</Text>
        <Text>
          <Ionicons
            name="fast-food"
            size={13}
            color="black"
            style={{ paddingRight: 3 }}
          />
          {type.sort().join(", ")}
        </Text>
        <Text>
          <FontAwesome5
            name="coins"
            size={13}
            color="black"
            style={{ paddingRight: 3 }}
          />
          {`${cost.toFixed(2)} zł`}
        </Text>
      </View>
      <View style={styles.logoView}>
        <Image
          style={styles.logo}
          source={{
            uri: image,
          }}
        />
        <Text style={styles.distText}>
          <Entypo
            name="location-pin"
            size={15}
            color="grey"
            style={{ paddingRight: 2 }}
          />
          {distance.toFixed(2)} km
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 20,
    flexDirection: "row",
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
  listItemText: {
    color: "rgb(59, 108, 212)",
    // color: "rgb(153, 27, 27)",
    fontSize: 25,
    fontWeight: "400",
    textAlign: "left",
    paddingBottom: 10,
  },
  labelView: {
    flex: 7,
  },
  logoView: {
    flex: 3,
    justifyContent: "space-between",
  },
  logo: {
    height: 35,
    resizeMode: "contain",
  },
  distText: {
    alignSelf: "flex-end",
    color: "grey",
  },
});

export default RestaurantHeader;
