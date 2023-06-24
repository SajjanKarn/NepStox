import { View, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";

import colors from "../../config/colors";
import AppText from "../../components/AppText";
import { Area, Chart, Line } from "react-native-responsive-linechart";
import { Dimensions } from "react-native";
import { DataTable } from "react-native-paper";
import { ScrollView } from "react-native";

export default function PortfolioCompany() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <AppText style={styles.headerSymbol} variant="Regular">
          UNLB
        </AppText>
        <AppText style={styles.headerMarketPrice} variant="Medium">
          Rs. 1250
        </AppText>
        <AppText style={styles.headerChange} variant="Medium">
          +15 (+0.5%)
        </AppText>
      </View>

      <View style={styles.chartContainer}>
        <Chart
          style={{
            width: "100%",
            height: Dimensions.get("window").height / 3,
          }}
          data={[
            { x: 0, y: 0 },
            { x: 1, y: 3 },
            { x: 2, y: 5 },
            { x: 3, y: 4 },
            { x: 4, y: 7 },
            { x: 5, y: 9 },
            { x: 6, y: 8 },
            { x: 7, y: 11 },
            { x: 8, y: 13 },
            { x: 9, y: 12 },
            { x: 10, y: 0 },
          ]}
          xDomain={{ min: 0, max: 10 }}
          yDomain={{ min: 0, max: 15 }}
        >
          <Area
            style={{ flex: 1 }}
            data={[
              { x: 0, y: 0 },
              { x: 1, y: 3 },
              { x: 2, y: 5 },
              { x: 3, y: 4 },
              { x: 4, y: 7 },
              { x: 5, y: 9 },
              { x: 6, y: 8 },
              { x: 7, y: 11 },
              { x: 8, y: 13 },
              { x: 9, y: 12 },
              { x: 10, y: 0 },
            ]}
            smoothing="bezier"
            tension={0.2}
            theme={{
              gradient: {
                from: { color: colors.dark.stockIncrease, opacity: 0.08 },
                to: {
                  color: colors.dark.primary,
                  opacity: 0,
                },
              },
            }}
          />
          <Line
            style={{ flex: 1 }}
            data={[
              { x: 0, y: 0 },
              { x: 1, y: 3 },
              { x: 2, y: 5 },
              { x: 3, y: 4 },
              { x: 4, y: 7 },
              { x: 5, y: 9 },
              { x: 6, y: 8 },
              { x: 7, y: 11 },
              { x: 8, y: 13 },
              { x: 9, y: 12 },
              { x: 10, y: 0 },
            ]}
            smoothing="bezier"
            tension={0.2}
            theme={{
              stroke: {
                color: colors.dark.graphLineIncrease,
                width: totalSize(0.3),
              },
            }}
          />
        </Chart>
      </View>

      <View style={styles.userPositionContainer}>
        <AppText style={styles.statsTitle}>Your Position</AppText>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>
              <AppText variant="Medium" style={styles.rowTitle}>
                Shares
              </AppText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <AppText variant="Medium" style={styles.rowValue}>
                100
              </AppText>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <AppText variant="Medium" style={styles.rowTitle}>
                Equity
              </AppText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <AppText variant="Medium" style={styles.rowValue}>
                Rs. 125000
              </AppText>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <AppText variant="Medium" style={styles.rowTitle}>
                AVG Cost
              </AppText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <AppText variant="Medium" style={styles.rowValue}>
                Rs. 1250
              </AppText>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <AppText variant="Medium" style={styles.rowTitle}>
                Portfolio Diversity
              </AppText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <AppText variant="Medium" style={styles.rowValue}>
                10%
              </AppText>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <AppText variant="Medium" style={styles.rowTitle}>
                Today's Return
              </AppText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <AppText variant="Medium" style={styles.rowValue}>
                Rs. 1250
              </AppText>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <AppText variant="Medium" style={styles.rowTitle}>
                Total Return
              </AppText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <AppText variant="Medium" style={styles.rowValue}>
                Rs. 1250
              </AppText>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>

      <View style={styles.statsContainer}>
        <AppText style={styles.statsTitle}>Today's Stats</AppText>
        <View style={styles.statsRow}>
          <DataTable>
            <DataTable.Row style={styles.statsTableRow}>
              <DataTable.Cell>
                <AppText variant="Medium" style={styles.rowTitle}>
                  Open
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText variant="Medium" style={styles.rowValue}>
                  Rs. 1250
                </AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.statsTableRow}>
              <DataTable.Cell>
                <AppText variant="Medium" style={styles.rowTitle}>
                  High
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText variant="Medium" style={styles.rowValue}>
                  Rs. 1250
                </AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.statsTableRow}>
              <DataTable.Cell>
                <AppText variant="Medium" style={styles.rowTitle}>
                  Low
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText variant="Medium" style={styles.rowValue}>
                  Rs. 1250
                </AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.statsTableRow}>
              <DataTable.Cell>
                <AppText variant="Medium" style={styles.rowTitle}>
                  52 Week High
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText variant="Medium" style={styles.rowValue}>
                  Rs. 1250
                </AppText>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
        <View style={styles.statsRow}>
          <DataTable>
            <DataTable.Row style={styles.statsTableRow}>
              <DataTable.Cell>
                <AppText variant="Medium" style={styles.rowTitle}>
                  Volume
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText variant="Medium" style={styles.rowValue}>
                  Rs. 1250
                </AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.statsTableRow}>
              <DataTable.Cell>
                <AppText variant="Medium" style={styles.rowTitle}>
                  Avg Price
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText variant="Medium" style={styles.rowValue}>
                  Rs. 1250
                </AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.statsTableRow}>
              <DataTable.Cell>
                <AppText variant="Medium" style={styles.rowTitle}>
                  Prev. Price
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText variant="Medium" style={styles.rowValue}>
                  Rs. 1250
                </AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.statsTableRow}>
              <DataTable.Cell>
                <AppText variant="Medium" style={styles.rowTitle}>
                  MKT Cap
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText variant="Medium" style={styles.rowValue}>
                  Rs. 1250
                </AppText>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
      </View>

      <View style={styles.tradeHistoryContainer}>
        <AppText style={styles.statsTitle}>Trade History</AppText>
        <View style={styles.tradeHistory}>
          <View style={styles.row1}>
            <AppText style={styles.tradePurchaseTitle} variant="Regular">
              6/23/2023
            </AppText>
            <AppText style={styles.tradeSource} variant="Medium">
              from IPO
            </AppText>
          </View>
          <View style={styles.row2}>
            <AppText style={styles.tradePurchasePrice} variant="Medium">
              Rs. 1000
            </AppText>
            <AppText style={styles.tradeUnits} variant="Regular">
              10 units
            </AppText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
