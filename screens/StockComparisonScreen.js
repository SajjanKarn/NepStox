import { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { Picker } from "@react-native-picker/picker";

import AppText from "../components/AppText";
import Loader from "../components/Loader";
import colors from "../config/colors";
import useFetch from "../hooks/useFetch";

export default function StockComparisonScreen() {
  const [pickerInput1, setPickerInput1] = useState();
  const [pickerInput2, setPickerInput2] = useState();
  const { data, loading, error } = useFetch(`/nepse/companies`);
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="default" />

      <View style={styles.chooseStockContainer}>
        <AppText style={styles.chooseStockText}>Choose Stock</AppText>

        {loading ? (
          <Loader />
        ) : (
          <View style={styles.chooseStockDropdownContainer}>
            <Picker
              selectedValue={pickerInput1}
              onValueChange={(itemValue, itemIndex) =>
                setPickerInput1(itemValue)
              }
              dropdownIconColor={colors.dark.placeholderText}
              style={{
                color: colors.dark.textColor,
                backgroundColor: colors.dark.secondary,
                marginVertical: height(1),
              }}
            >
              {data?.data?.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.companyname}
                  value={item.symbol}
                />
              ))}
            </Picker>
            <AppText style={styles.versus}>v/s</AppText>
            <Picker
              selectedValue={pickerInput2}
              onValueChange={(itemValue, itemIndex) =>
                setPickerInput2(itemValue)
              }
              dropdownIconColor={colors.dark.placeholderText}
              style={{
                color: colors.dark.textColor,
                backgroundColor: colors.dark.secondary,
                marginVertical: height(1),
              }}
            >
              {data?.data?.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.companyname}
                  value={item.symbol}
                />
              ))}
            </Picker>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
  },
  chooseStockContainer: {
    marginTop: height(2),
  },
  chooseStockText: {
    color: colors.dark.button,
    fontSize: totalSize(2),
    textTransform: "uppercase",
  },
  chooseStockDropdownContainer: {
    marginTop: height(1),
  },
  versus: {
    color: colors.dark.textColor,
    fontSize: totalSize(2),
    textTransform: "uppercase",
    textAlign: "center",
  },
});
