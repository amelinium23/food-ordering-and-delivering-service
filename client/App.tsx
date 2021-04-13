import * as React from "react";
import { StyleSheet, View } from "react-native";
import Dish from "./components/Dish";
import Restaurant from "./components/Restaurant";

const App: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Dish />
      <Restaurant />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
