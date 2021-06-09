import * as React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Dish as DishType } from "../types/Dish";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { useState } from "react";
import Modal from "react-native-modal";
import DishContext from "../contexts/DishContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/RootStackParamList";
import { RouteProp } from "@react-navigation/native";

type RestaurantScreenRouteProp = RouteProp<RootStackParamList, "Restaurant">;

type RestaurantScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Restaurant"
>;

interface IProps {
  route: RestaurantScreenRouteProp;
  navigation: RestaurantScreenNavigationProp;
}

const RestaurantBasket: React.FunctionComponent<IProps> = ({
  route,
  navigation,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dishList, setDishList] = React.useContext(DishContext);
  const deliveryCost = route.params.restaurantInfo.delivery_cost;
  let id = 1;

  const renderDishes = () =>
    dishList.map((dish) => (
      <Text key={`${id++}`} style={{ fontSize: 14, color: "black" }}>
        {dish.dishName}: {dish.totalCost} zł
      </Text>
    ));

  return (
    <View>
      <Modal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="right"
        coverScreen={true}
        backdropOpacity={0}
        style={{
          margin: 0,
        }}
      >
        <View style={styles.modal}>
          <View style={styles.basketList}>
            {dishList.length ? (
              <View>
                {renderDishes()}
                <Text>Dostawa: {deliveryCost.toFixed(2)} zł</Text>
                <View style={styles.summaryContainer}>
                  <Text style={styles.summaryText}>
                    Suma:{" "}
                    {dishList
                      .reduce(
                        (current, e) => current + e.totalCost,
                        deliveryCost
                      )
                      .toFixed(2)}{" "}
                    zł
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={{ fontStyle: "italic", color: "grey" }}>
                Twój koszyk jest pusty{" "}
              </Text>
            )}
          </View>
          <View style={styles.basketControls}>
            <Pressable
              style={styles.exitButton}
              onPress={() => setModalVisible(false)}
            >
              <Entypo name="cross" size={28} color="gray" />
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.4 : 1,
                },
                styles.checkoutButton,
              ]}
              onPress={() => {
                if (dishList.length > 0) {
                  setModalVisible(false);
                  navigation.navigate("Order", {
                    orderInfo: dishList,
                    deliveryCost: route.params.restaurantInfo.cost,
                  });
                }
              }}
            >
              <Text style={styles.checkoutButtonText}>Zamów</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.button}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <FontAwesome5 name="shopping-basket" size={24} color="white" />
        {dishList.length && !modalVisible ? (
          <View style={styles.dishCounter}>
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
  summary: {
    borderTopRightRadius: 10,
    borderTopColor: "grey",
    borderTopLeftRadius: 10,
  },
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
    width: "85%",
    minHeight: 100,
    right: 0,
    bottom: 0,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 25,
    borderBottomRightRadius: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  basketControls: {
    alignContent: "center",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  dishCounter: {
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
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  summaryContainer: {
    borderTopColor: "grey",
    borderTopWidth: 2,
    flex: 1,
  },
  exitButton: {
    alignSelf: "flex-end",
    padding: 7,
  },
  basketList: {
    paddingVertical: 10,
    paddingLeft: 25,
  },
  checkoutButton: {
    backgroundColor: "rgb(59, 108, 212)",
    alignSelf: "flex-end",
    padding: 7,
    margin: 10,
    borderRadius: 10,
  },
  checkoutButtonText: {
    fontSize: 20,
    color: "white",
  },
});

export default RestaurantBasket;
