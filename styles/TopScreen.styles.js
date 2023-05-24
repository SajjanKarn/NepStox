import { StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../config/colors";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
  },
  indicator: { backgroundColor: colors.dark.button },
  tabBar: { backgroundColor: colors.dark.secondary, padding: totalSize(1.1) },
  tabTitle: {
    color: colors.dark.button,
    fontSize: totalSize(1.7),
    textAlign: "center",
    textTransform: "capitalize",
  },
});
