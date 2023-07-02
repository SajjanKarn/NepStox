import { StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../../config/colors";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
  },
  headerInvestmentContainer: {
    marginTop: height(1),
    paddingHorizontal: width(5),
  },
  headerTitle: {
    fontSize: totalSize(2),
    color: colors.dark.textColor,
    marginBottom: height(1),
  },
  headerTotalReturn: {
    fontSize: totalSize(2.8),
    color: colors.dark.textColor,
    marginBottom: height(0.3),
  },
  netReturnPoint: {
    fontSize: totalSize(1.6),
    color: colors.dark.textColor,
  },
  // chart
  dotSlider: {
    width: totalSize(1.2),
    height: totalSize(1.2),
    borderRadius: totalSize(1.2),
    backgroundColor: colors.dark.button,
  },
  // stocks
  stocks: {
    flex: 1,
    marginTop: height(2),
    paddingHorizontal: width(5),
  },
  stocksContainer: {
    flex: 1,
  },
  stocksContainerTitle: {
    fontSize: totalSize(2.5),
    color: colors.dark.textColor,
    marginBottom: height(1),
  },
  stock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height(1.5),
    paddingHorizontal: width(1),
  },
  stockName: {
    fontSize: totalSize(2),
    color: colors.dark.textColor,
    paddingTop: height(1),
  },
  stockUnit: {
    fontSize: totalSize(1.6),
    color: colors.dark.textColor,
  },
  stockLeft: {
    alignItems: "flex-start",
  },
  stockRight: {
    alignItems: "flex-end",
  },
  stockPrice: {
    fontSize: totalSize(2),
    color: colors.dark.textColor,
    paddingTop: height(1),
  },
  stockReturn: {
    fontSize: totalSize(1.6),
    color: colors.dark.textColor,
  },
  // spacer
  spacer: {
    height: height(10),
  },
});
