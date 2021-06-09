import * as React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ExtrasGroup as ExtrasGroupType } from "../types/ApiResponseTypes";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNPickerSelect from "react-native-picker-select";

interface IProps {
  group: ExtrasGroupType;
  price: number;
  setPrice: (price: number) => void;
}

const ExtraPicker: React.FunctionComponent<IProps> = ({
  group,
  price,
  setPrice,
}) => {
  return (
    <View>
      {group.extra_type === 1 ? (
        <RNPickerSelect
          style={customPickerStyles}
          placeholder={{}}
          useNativeAndroidPickerStyle={false}
          items={group.extras.map((e) => ({
            label: `${e.name} (+${e.added_price.toFixed(2)} zł)`,
            value: e.added_price,
            key: e.name,
          }))}
          onValueChange={(item) => setPrice(item)}
        />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={group.extras}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.checkbox}>
                <BouncyCheckbox
                  onPress={(isChecked) => {
                    isChecked
                      ? setPrice(price + item.added_price)
                      : setPrice(price - item.added_price);
                  }}
                  fillColor="rgb(59, 108, 212)"
                  iconStyle={{ borderColor: "rgb(59, 108, 212)" }}
                />
                <Text>{`${item.name} (+${item.added_price.toFixed(
                  2
                )} zł)`}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8,
    color: "black",
  },
  checkbox: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
});

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8,
    color: "black",
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default ExtraPicker;
