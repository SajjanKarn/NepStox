import { StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";

import colors from "../config/colors";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width(5),
    backgroundColor: colors.dark.primary,
    // marginTop: StatusBar.currentHeight,
  },
  nepseIndexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: height(2),
    backgroundColor: colors.dark.secondary,
    padding: width(5),
    borderRadius: width(2),
    elevation: 5,
  },
  nepseIndexChange: {
    fontSize: totalSize(1.5),
    color: colors.dark.nepseIndexChange,
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height(2),
  },
  data: {
    alignItems: "center",
  },
  dataTitle: {
    fontSize: totalSize(2),
    color: colors.dark.button,
    textTransform: "uppercase",
    marginVertical: height(0.5),
    letterSpacing: 1,
  },
  dataValue: {
    fontSize: totalSize(1.5),
    color: colors.dark.textColor,
    marginVertical: height(0.5),
  },
  dataChange: {
    fontSize: totalSize(1.5),
    color: colors.dark.topGainerText,
  },
  marketStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height(1),
    backgroundColor: colors.dark.secondary,
    padding: width(5),
    borderRadius: width(2),
  },
  marketStatus: {
    fontSize: totalSize(2),
    color: colors.dark.button,
    textTransform: "uppercase",
    marginVertical: height(0.5),
    letterSpacing: 1,
  },
  marketStatusTitle: {
    fontSize: totalSize(1.8),
    color: colors.dark.button,
    marginVertical: height(0.5),
    textTransform: "uppercase",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height(0.7),
  },
  dot: {
    height: totalSize(1.5),
    width: totalSize(1.5),
    borderRadius: totalSize(1.5),
    marginHorizontal: width(1),
  },
  green: {
    backgroundColor: colors.dark.topGainerText,
  },
  red: {
    backgroundColor: colors.dark.topLoserText,
  },
  marketSummaryContainer: {
    marginBottom: height(2),
    backgroundColor: colors.dark.secondary,
    padding: width(5),
    borderRadius: width(2),
  },
  marketSummaryTitle: {
    fontSize: totalSize(2.3),
    color: colors.dark.button,
    textTransform: "uppercase",
    marginVertical: height(0.7),
    letterSpacing: 1,
  },
  dataRow: {
    marginVertical: height(0.5),
  },
  dataRowTitle: {
    fontSize: totalSize(2),
    textTransform: "uppercase",
    marginVertical: height(0.5),
    color: colors.dark.placeholderText,
    letterSpacing: 1,
  },
  dataRowValue: {
    fontSize: totalSize(1.7),
    color: colors.dark.textColor,
    marginVertical: height(0.5),
  },

  // indicators section
  indicators: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height(1),
    marginBottom: height(2),
  },
  indicatorTile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height(1),
    marginHorizontal: width(1),
    borderRadius: totalSize(1),
  },
  tileIcon: {
    marginTop: height(0.5),
  },
  indicatorTitle: {
    fontSize: totalSize(1.5),
    textAlign: "center",
  },
  advanced: {
    backgroundColor: colors.dark.topGainerText,
  },
  declined: {
    backgroundColor: colors.dark.topLoserText,
  },
  unchanged: {
    backgroundColor: colors.dark.unchanged,
  },

  // chart section
  chartContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: colors.dark.primary,
  },
  gainerContainer: {
    flex: 1,
    marginTop: height(2),
  },
  topGainerTitle: {
    fontSize: totalSize(2),
    fontWeight: "bold",
    marginBottom: height(2),
  },
  gainerTableBorder: {
    borderWidth: 1,
    borderColor: colors.dark.placeholderText,
  },
  gainerTable: {
    marginBottom: height(2),
  },
  head: {
    height: height(7),
    textAlign: "center",
    backgroundColor: colors.dark.topGainerText,
  },
  loserHead: {
    backgroundColor: colors.dark.topLoserText,
  },
  headText: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Riveruta-Bold",
    color: colors.dark.textColor,
  },
  text: {
    padding: totalSize(1.5),
    textAlign: "center",
    color: colors.dark.textColor,
    fontFamily: "Riveruta-Regular",
  },
});
