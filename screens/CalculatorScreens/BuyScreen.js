import { View, ScrollView, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";

import AppText from "../../components/AppText";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";

export default function BuyScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Units</AppText>
        <AppInput placeholder="Eg: 100" keyboardType="numeric" squared />
      </View>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Buying Price (Per Unit)</AppText>
        <AppInput placeholder="Eg: 500" keyboardType="numeric" squared />
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
    fontSize: totalSize(2),
    textTransform: "uppercase",
  },
});
