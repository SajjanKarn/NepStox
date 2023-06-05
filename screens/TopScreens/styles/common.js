import { StyleSheet } from "react-native";
import colors from "../../../config/colors";
import { width, height, totalSize } from "react-native-dimension";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
  },

  tableHeader: {
    color: colors.dark.textColor,
    fontSize: totalSize(1.5),
    textTransform: "uppercase",
  },
  tableData: {
    color: colors.dark.textColor,
    fontSize: totalSize(1.5),
  },
});
