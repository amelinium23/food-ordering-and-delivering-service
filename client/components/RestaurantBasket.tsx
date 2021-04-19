import * as React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Dish as DishType } from "../types/Dish";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import Modal from "react-native-modal";

interface IProps {
  setDishes: React.Dispatch<React.SetStateAction<DishType[]>>;
}

const RestaurantBasket: React.FunctionComponent<IProps> = ({ setDishes }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        coverScreen={true}
        backdropOpacity={0}
        style={{
          margin: 0,
        }}
      >
        <View style={styles.modal}>
          <Text style={{ fontStyle: "italic", color: "grey" }}>
            Twój koszyk jest pusty
          </Text>
        </View>
      </Modal>
      <Pressable
        style={styles.button}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <FontAwesome5 name="shopping-basket" size={24} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 0,
    bottom: 0,
    marginRight: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: "rgb(59, 108, 212)",
    borderRadius: 50,
  },
  modal: {
    position: "absolute",
    width: "80%",
    right: 0,
    bottom: 0,
    marginRight: 20,
    marginBottom: 20,
    paddingVertical: 100,
    backgroundColor: "white",
    borderRadius: 50,
    borderBottomRightRadius: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
    alignContent: "center",
    alignItems: "center",
  },
});

export default RestaurantBasket;
