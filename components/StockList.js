import { View, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";

import colors from "../config/colors";

import AppText from "./AppText";

export default function StockList({ stock }) {
  return (
    <View style={styles.stock}>
      <View style={styles.stockInfo}>
        <AppText style={styles.companySymbol}>{stock.symbol}</AppText>
        <AppText style={styles.ltp}>Rs. {stock.ltp}</AppText>
      </View>
      <View style={styles.stockInfo}>
        <AppText style={styles.companyName}>{stock.companyName}</AppText>
        <AppText
          style={{
            fontSize: totalSize(1.8),
            color:
              parseInt(stock.change_pts) > 0
                ? colors.dark.topGainerText
                : parseInt(stock.change_pts) < 0
                ? colors.dark.topLoserText
                : colors.dark.textColor,
          }}
        >
          {stock.change_pts}
        </AppText>
      </View>
      <AppText
        style={{
          fontSize: totalSize(1.3),
          alignSelf: "flex-end",
          color:
            parseInt(stock.change_pts) > 0
              ? colors.dark.topGainerText
              : parseInt(stock.change_pts) < 0
              ? colors.dark.topLoserText
              : colors.dark.textColor,
        }}
      >
        {stock.change_per}%
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  stock: {
    marginVertical: height(0.2),
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
    fontSize: totalSize(1.7),
    color: colors.dark.textColor,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  companyName: {
    fontSize: totalSize(1.2),
    color: colors.dark.placeholderText,
    textTransform: "uppercase",
  },
  change_per: {},
});
