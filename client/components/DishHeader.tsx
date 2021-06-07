import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  FlatList,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Dish as DishType } from "../types/Dish";
import ExtraPicker from "../components/ExtraPicker";

interface IProps extends DishType {
  isExtendable?: boolean;
}

const DishHeader: React.FunctionComponent<IProps> = ({
  name,
  price,
  image,
  extras_group,
  isExtendable,
}) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const [addedPrice, setAddedPrice] = React.useState(0);

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.listItem}
        onPress={isExtendable ? () => setIsPressed(!isPressed) : () => null}
      >
        <View style={styles.dishDetails}>
          <Text style={styles.dishNameText}>{name}</Text>
          <Text>
            <FontAwesome5
              name="coins"
              size={13}
              color="black"
              style={{ paddingRight: 3 }}
            />
            {`${(price + addedPrice).toFixed(2)} zł`}
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
      </Pressable>
      {isPressed ? (
        <View style={styles.extraGroup}>
          <FlatList
            data={extras_group}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.extraText}>{item.name}:</Text>
                <ExtraPicker
                  group={item}
                  price={addedPrice}
                  setPrice={setAddedPrice}
                />
              </View>
            )}
          />
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.4 : 1,
              },
              styles.checkoutButton,
            ]}
            onPress={() => {}}
          >
            <Text style={styles.checkoutButtonText}>Dodaj</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

DishHeader.defaultProps = { isExtendable: false };

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
  },
  wrapper: {
    padding: 0,
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
    paddingBottom: 20,
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
  extraGroup: {
    padding: 8,
  },
  extraText: {
    fontSize: 20,
    color: "rgb(59, 108, 212)",
  },
  checkoutButton: {
    backgroundColor: "rgb(59, 108, 212)",
    alignSelf: "flex-end",
    padding: 7,
    marginTop: 5,
    borderRadius: 10,
  },
  checkoutButtonText: {
    fontSize: 17,
    color: "white",
  },
});

export default DishHeader;
