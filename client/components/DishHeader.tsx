import * as React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Dish as DishType } from "../types/Dish";

const DishHeader: React.FunctionComponent<DishType> = ({
  name,
  price,
  image,
}) => {
  return (
    <View style={styles.listItem}>
      <View style={styles.dishDetails}>
        <Text style={styles.dishNameText}>{name}</Text>
        <Text>
          <FontAwesome5
            name="coins"
            size={13}
            color="black"
            style={{ paddingRight: 3 }}
          />
          {`${price.toFixed(2)} zł`}
        </Text>
      </View>
      <View style={styles.image}>
        <ImageBackground
          style={styles.ImgBackground}
          source={{
            uri: image,
          }}
        >
          <LinearGradient
            colors={["rgba(255,255,255,1)", "rgba(255,255,255,0.1)"]}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.gradientBackground}
          />
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    //padding: 10,
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
  dishDetails: {
    padding: 10,
    width: "65%",
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  dishNameText: {
    fontSize: 20,
    fontWeight: "400",
    paddingBottom: 10,
  },
  image: {
    height: "100%",
    width: "35%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  ImgBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    overflow: "hidden",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default DishHeader;
