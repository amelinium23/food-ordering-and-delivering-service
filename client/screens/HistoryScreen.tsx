import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const HistoryScreen: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Text>To jest mój kawałek podłogi, dziękuje kochani</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 14,
    flex: 1,
  },
});

export default HistoryScreen;
