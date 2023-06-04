import { View, ScrollView, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../config/colors";
import AppText from "../../components/AppText";

export default function AdjustmentScreen() {
  return (
    <ScrollView style={styles.container}>
      <AppText>AdjustmentScreen</AppText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
  },
});
