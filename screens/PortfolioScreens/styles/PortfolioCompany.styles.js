import { StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../../../config/colors";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
  },
  headerContainer: {
    paddingHorizontal: width(5),
    marginTop: height(2),
  },
  headerSymbol: {
    fontSize: totalSize(2.3),
    color: colors.dark.textColor,
  },
  headerMarketPrice: {
    fontSize: totalSize(2.7),
    color: colors.dark.textColor,
  },
  headerChange: {
    fontSize: totalSize(1.5),
    color: colors.dark.textColor,
  },
  flexCentre: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // graph interval
  graphIntervalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width(5),
    marginTop: height(2),
  },
  rowButton: {
    paddingHorizontal: width(5),
    paddingVertical: height(1.5),
    borderRadius: 5,
    backgroundColor: colors.dark.secondary,
  },
  rowButtonText: {
    fontSize: totalSize(1.3),
    color: colors.dark.textColor,
  },

  // table
  userPositionContainer: {
    paddingHorizontal: width(5),
    marginTop: height(2),
  },
  rowTitle: {
    fontSize: totalSize(1.5),
    color: "#737574",
    textTransform: "uppercase",
  },
  rowValue: {
    fontSize: totalSize(1.5),
    color: colors.dark.textColor,
  },
  statsContainer: {
    paddingHorizontal: width(5),
    marginTop: height(2),
  },
  statsTitle: {
    fontSize: totalSize(2),
    color: colors.dark.textColor,
    marginBottom: height(2),
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsTableRow: {
    borderBottomWidth: 0,
  },

  // trade history
  tradeHistoryContainer: {
    paddingHorizontal: width(5),
    marginTop: height(2),
    paddingBottom: height(2),
  },
  tradeHistory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height(2),
    paddingHorizontal: width(5),
    backgroundColor: colors.dark.secondary,
    borderRadius: 10,
  },
  row1: {
    alignItems: "flex-start",
  },
  row2: {
    alignItems: "flex-end",
  },
  tradePurchaseTitle: {
    fontSize: totalSize(1.8),
    color: colors.dark.textColor,
  },
  tradeSource: {
    fontSize: totalSize(1.7),
    color: colors.dark.placeholderText,
    marginTop: height(1),
  },
  tradePurchasePrice: {
    fontSize: totalSize(2),
    color: colors.dark.textColor,
  },
  tradeUnits: {
    fontSize: totalSize(1.7),
    color: colors.dark.textColor,
    marginTop: height(1),
  },
});
