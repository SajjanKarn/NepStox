import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";

import AppText from "../../components/AppText";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";

export default function AdjustmentScreen() {
  const [checked, setChecked] = useState("right");
  const [paidup, setPaidup] = useState(10);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <View style={styles.flexRow}>
          <View style={styles.radioContainer}>
            <RadioButton
              value="right"
              status={checked === "right" ? "checked" : "unchecked"}
              onPress={() => setChecked("right")}
              color={colors.dark.placeholderText}
            />
            <AppText style={styles.inputLabel}>Right Share</AppText>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              value="bonus"
              status={checked === "bonus" ? "checked" : "unchecked"}
              onPress={() => setChecked("bonus")}
              color={colors.dark.placeholderText}
            />
            <AppText style={styles.inputLabel}>Bonus Share</AppText>
          </View>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>
          Market Price (Before Book Closure)
        </AppText>
        <AppInput placeholder="Eg: 400" keyboardType="numeric" squared />
      </View>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Right Share Percentage</AppText>
        <AppInput placeholder="Eg: 10" keyboardType="numeric" squared />
      </View>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Paid-up Value Per Share</AppText>
        <Picker
          selectedValue={paidup}
          onValueChange={(itemValue, itemIndex) => setPaidup(itemValue)}
          dropdownIconColor={colors.dark.placeholderText}
          style={{
            color: colors.dark.textColor,
            backgroundColor: colors.dark.secondary,
            marginVertical: height(1),
          }}
        >
          <Picker.Item label="10" value="10" />
          <Picker.Item label="100" value="100" />
        </Picker>
      </View>

      <AppButton squared>Calculate</AppButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
    paddingTop: height(1),
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputGroup: {
    marginVertical: height(1),
  },
  inputLabel: {
    color: colors.dark.textColor,
    fontSize: totalSize(1.6),
    textTransform: "uppercase",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height(0.5),
  },
});
