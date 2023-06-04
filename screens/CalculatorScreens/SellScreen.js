import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";

import AppText from "../../components/AppText";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";

export default function SellScreen() {
  const [buyType, setBuyType] = useState("secondary");
  const [checked, setChecked] = useState("individual");
  const [cgt, setCgt] = useState("7.5");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Buy Type</AppText>
        <Picker
          selectedValue={buyType}
          onValueChange={(itemValue, itemIndex) => setBuyType(itemValue)}
          dropdownIconColor={colors.dark.placeholderText}
          style={{
            color: colors.dark.textColor,
            backgroundColor: colors.dark.secondary,
            marginVertical: height(1),
          }}
        >
          <Picker.Item label="Secondary" value="secondary" />
          <Picker.Item label="IPO" value="ipo" />
        </Picker>
      </View>

      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Units</AppText>
        <AppInput placeholder="Eg: 100" keyboardType="numeric" squared />
      </View>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Purchased Price (Per Unit)</AppText>
        <AppInput placeholder="Eg: 2000" keyboardType="numeric" squared />
      </View>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Selling Price (Per Unit)</AppText>
        <AppInput placeholder="Eg: 2500" keyboardType="numeric" squared />
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.radioContainer}>
          <RadioButton
            value="individual"
            status={checked === "individual" ? "checked" : "unchecked"}
            onPress={() => setChecked("individual")}
            color={colors.dark.placeholderText}
          />
          <AppText style={styles.inputLabel}>Individual</AppText>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            value="Instutional"
            status={checked === "instutional" ? "checked" : "unchecked"}
            onPress={() => setChecked("instutional")}
            color={colors.dark.placeholderText}
          />
          <AppText style={styles.inputLabel}>Instutional</AppText>
        </View>
      </View>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>CGT %</AppText>
        <View style={styles.radioContainer}>
          <RadioButton
            value="7.5"
            status={cgt === "7.5" ? "checked" : "unchecked"}
            onPress={() => setCgt("7.5")}
            color={colors.dark.placeholderText}
          />
          <AppText style={styles.inputLabel}>7.5%</AppText>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            value="5"
            status={cgt === "5" ? "checked" : "unchecked"}
            onPress={() => setCgt("5")}
            color={colors.dark.placeholderText}
          />
          <AppText style={styles.inputLabel}>5%</AppText>
        </View>
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
