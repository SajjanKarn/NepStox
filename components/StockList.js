import { View, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";

import colors from "../config/colors";

import AppText from "./AppText";

export default function StockList({ stock }) {
  return (
    <View
      style={[
        styles.stock,
        {
          backgroundColor:
            Math.ceil(parseInt(stock.change_pts)) === 0
              ? colors.dark.secondary
              : stock.change_pts[0] === "-"
              ? colors.dark.declined
              : colors.dark.advanced,
        },
      ]}
    >
      <View style={styles.stockInfo}>
        <AppText style={styles.companySymbol}>{stock.symbol}</AppText>
        <AppText style={styles.ltp}>{stock.ltp}</AppText>
      </View>
      <View style={styles.stockInfo}>
        <AppText style={styles.companyName}>{stock.companyName}</AppText>
        <AppText style={styles.change}>{stock.change_pts}</AppText>
      </View>
      <AppText style={styles.change}>{stock.change_per}%</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  stock: {
    marginVertical: height(1),
    backgroundColor: colors.dark.secondary,
    padding: width(5),
    borderRadius: width(2),
  },
  stockInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: height(0.8),
  },
  companySymbol: {
    fontSize: totalSize(2),
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  ltp: {
    fontSize: totalSize(2),
    color: colors.dark.textColor,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  companyName: {
    fontSize: totalSize(1.2),
    color: colors.dark.textColor,
    textTransform: "uppercase",
  },
  change: {
    fontSize: totalSize(1.5),
  },
});
