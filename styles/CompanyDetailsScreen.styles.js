import { StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../config/colors";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
  },
  companyInfoCard: {
    backgroundColor: colors.dark.secondary,
    borderRadius: totalSize(1),
    padding: totalSize(1),
    marginVertical: totalSize(1),
  },
  companyInfoCardHeader: {
    marginVertical: totalSize(1.5),
  },
  companyInfoCardHeaderText: {
    fontSize: totalSize(2),
    color: colors.dark.button,
    textTransform: "uppercase",
  },
  cardBodyText: {
    fontSize: totalSize(1.7),
    color: colors.dark.placeholderText,
  },
  todayDataContainer: {
    marginVertical: totalSize(1),
  },
  headerTitle: {
    fontSize: totalSize(2),
    color: colors.dark.button,
    textTransform: "uppercase",
    marginVertical: totalSize(1),
  },
  errorText: {
    fontSize: totalSize(2),
    color: colors.dark.button,
    textTransform: "uppercase",
    marginVertical: totalSize(5),
    textAlign: "center",
  },

  // chart section
  chartContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
