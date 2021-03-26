import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            "https://i.wpimg.pl/730x0/m.fotoblogia.pl/jajko-688cda13e203b23850b3998237.jpg",
        }}
        style={styles.logo}
      />
      <Text style={styles.instructions}>Czemu ja to robię</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
  },
});
