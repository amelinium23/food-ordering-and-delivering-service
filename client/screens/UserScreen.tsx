import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

const UserScreen: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Text>Tu powstaną informacje o użytkowniku</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserScreen;
