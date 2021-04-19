import * as React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Dish as DishType } from "../types/Dish";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import Modal from "react-native-modal";
import DishContext from "../contexts/DishContext";

interface IProps {
  setDishes: React.Dispatch<React.SetStateAction<DishType[]>>;
}

const RestaurantBasket: React.FunctionComponent<IProps> = ({ setDishes }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dishList, setDishList] = React.useContext(DishContext);
  let id = 1;

  const renderDishes = (dishes: DishType[]) =>
    dishes.map((dish) => <Text key={`${dish.name}${id++}`}>{dish.name}</Text>);

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
          {dishList.length ? (
            renderDishes(dishList)
          ) : (
            <Text style={{ fontStyle: "italic", color: "grey" }}>
              Twój koszyk jest pusty{" "}
            </Text>
          )}
        </View>
      </Modal>
      <Pressable
        style={styles.button}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <FontAwesome5 name="shopping-basket" size={24} color="white" />
        {dishList.length && !modalVisible ? (
          <View
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              marginTop: -5,
              marginRight: -5,
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: "rgb(239, 68, 68)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15, color: "white" }}>
              {dishList.length}
            </Text>
          </View>
        ) : null}
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
