import { View, StyleSheet, ScrollView } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { DataTable, FAB } from "react-native-paper";

import colors from "../config/colors";
import AppText from "../components/AppText";

export default function PortfolioScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText style={styles.headerTitle}>My Portfolio Summary</AppText>
        <View style={styles.userInvestmentContainer}>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>
                <AppText style={styles.rowTitle} variant="Medium">
                  Total Investment
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.rowValue}>Rs. 0.00</AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <AppText style={styles.rowTitle} variant="Medium">
                  Current Value
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.rowValue}>Rs. 0.00</AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <AppText style={styles.rowTitle} variant="Medium">
                  Unrealized Gain/Loss
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.rowValue}>Rs. 0.00</AppText>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>

        <View style={styles.userUnitsContainer}>
          <AppText style={styles.headerTitle}>My Units Summary</AppText>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>
                <AppText style={styles.rowTitle} variant="Medium">
                  Current Units
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.rowValue}>0.000</AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <AppText style={styles.rowTitle} variant="Medium">
                  Sold Units
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.rowValue}>0.000</AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <AppText style={styles.rowTitle} variant="Medium">
                  Sold Amount
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.rowValue}>Rs. 0.00</AppText>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>

        <View style={styles.receivableAmountCard}>
          <View style={styles.cardLeft}>
            <AppText style={styles.receivableAmountCardTitle} variant="Medium">
              Total Receivable Amount
            </AppText>
            <AppText style={styles.receivableAmountCardValue}>Rs. 0.00</AppText>
          </View>
          <View style={styles.cardRight}>
            <AppText style={styles.receivableAmountCardTitle} variant="Medium">
              Est. Profit: Rs. 0.00
            </AppText>
            <AppText style={styles.percentageChange}>0.00%</AppText>
          </View>
        </View>

        <View style={styles.stockContainerCard}>
          <View style={styles.receivableAmountCard}>
            <View style={styles.cardLeft}>
              <AppText style={styles.stockCardTitle} variant="Medium">
                UNLB
              </AppText>
              <AppText style={styles.stockCardValue}>
                10 Shares | LTP: Rs. 0.00
              </AppText>
            </View>
            <View style={styles.cardRight}>
              <AppText style={styles.stockCardTitle} variant="Medium">
                Rs. 12500
              </AppText>
              <AppText style={styles.percentageChange}>Rs. 150</AppText>
            </View>
          </View>

          <DataTable>
            <DataTable.Row style={styles.stockCardRow}>
              <DataTable.Cell>
                <AppText style={styles.stockCardRowTitle} variant="Medium">
                  Investment
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.stockCardRowValue}>Rs. 1000</AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.stockCardRow}>
              <DataTable.Cell>
                <AppText style={styles.stockCardRowTitle} variant="Medium">
                  WACC
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.stockCardRowValue}>Rs. 1000</AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.stockCardRow}>
              <DataTable.Cell>
                <AppText style={styles.stockCardRowTitle} variant="Medium">
                  Net Profit
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.stockCardRowValue}>Rs. 1000</AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.stockCardRow}>
              <DataTable.Cell>
                <AppText style={styles.stockCardRowTitle} variant="Medium">
                  Profit %
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.stockCardRowValue}>Rs. 1000</AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.stockCardRow}>
              <DataTable.Cell>
                <AppText style={styles.stockCardRowTitle} variant="Medium">
                  Sold Units
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.stockCardRowValue}>Rs. 1000</AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.stockCardRow}>
              <DataTable.Cell>
                <AppText style={styles.stockCardRowTitle} variant="Medium">
                  Sold Value
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.stockCardRowValue}>Rs. 1000</AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.stockCardRow}>
              <DataTable.Cell>
                <AppText style={styles.stockCardRowTitle} variant="Medium">
                  Cash Dividend
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.stockCardRowValue}>Rs. 1000</AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row
              style={{
                borderBottomWidth: 0,
              }}
            >
              <DataTable.Cell>
                <AppText style={styles.stockCardRowTitle} variant="Medium">
                  Receivable Amount
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.stockCardRowValue}>Rs. 1000</AppText>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
        <View style={styles.spacer} />
      </ScrollView>

      <FAB
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
          backgroundColor: colors.dark.button,
        }}
        icon="plus"
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
  },
  headerTitle: {
    fontSize: totalSize(2.3),
    color: colors.dark.textColor,
    marginTop: height(2),
    marginBottom: height(2),
  },
  userInvestmentContainer: {
    marginBottom: height(2),
  },

  // card
  receivableAmountCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.dark.secondary,
    padding: width(5),
    borderRadius: 10,
    marginVertical: height(1),
  },
  cardLeft: {},
  cardRight: {
    alignItems: "flex-end",
  },
  receivableAmountCardTitle: {
    fontSize: totalSize(1.3),
    color: colors.dark.textColor,
    marginBottom: height(1),
  },
  receivableAmountCardValue: {
    fontSize: totalSize(2),
    color: colors.dark.textColor,
  },
  percentageChange: {
    fontSize: totalSize(1.5),
    color: colors.dark.textColor,
  },

  // stock card
  stockContainerCard: {
    backgroundColor: colors.dark.secondary,
    borderRadius: 10,
  },
  stockCardRow: {
    borderBottomColor: colors.dark.placeholderText,
    borderBottomWidth: 0.4,
  },
  stockCardTitle: {
    fontSize: totalSize(1.3),
    color: colors.dark.textColor,
    marginBottom: height(1),
  },
  stockCardValue: {
    fontSize: totalSize(1.5),
    color: colors.dark.textColor,
  },
  stockCardRowTitle: {
    fontSize: totalSize(1.5),
    color: colors.dark.textColor,
  },
  stockCardRowValue: {
    fontSize: totalSize(1.5),
    color: colors.dark.textColor,
  },

  // spacer
  spacer: {
    height: height(10),
  },
});
