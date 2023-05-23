import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Table, Row, Rows } from "react-native-table-component";
import { AntDesign } from "@expo/vector-icons";

// components
import AppText from "../components/AppText";
import colors from "../config/colors";

import useFetch from "../hooks/useFetch";

// styles
import styles from "../styles/HomeScreen.styles";

export default function HomeScreen() {
  const [topGainer, setTopGainer] = useState({
    tableHead: ["Symbol", "Change", "CH %", "LTP"],
    tableData: [
      ["NABIL", "10.00", "10.00", "10.00"],
      ["RBB", "10.00", "10.00", "10.00"],
      ["NIC ASIA", "10.00", "10.00", "10.00"],
      ["NICA", "10.00", "10.00", "10.00"],
    ],
  });
  const [topLoser, setTopLoser] = useState({
    tableHead: ["Symbol", "Change", "CH %", "LTP"],
    tableData: [
      ["NABIL", "10.00", "10.00", "10.00"],
      ["RBB", "10.00", "10.00", "10.00"],
      ["NIC ASIA", "10.00", "10.00", "10.00"],
      ["NICA", "10.00", "10.00", "10.00"],
    ],
  });
  const { data, loading, error } = useFetch("/nepse/top-gainer");
  const {
    data: topLoserData,
    loading: topLoserLoading,
    error: topLoserError,
  } = useFetch("/nepse/top-loser");

  // useeffect for top gainer
  useEffect(() => {
    if (data?.data?.data?.length > 0) {
      // get only 5 data
      const tableData = data.data.data
        .slice(0, 5)
        .map((item) => [
          item.symbol,
          item.change_pts,
          `${item.diff_per}%`,
          item.close,
        ]);
      setTopGainer((prev) => ({ ...prev, tableData }));
    }
  }, [data, loading, error]);

  // useeffect for top loser
  useEffect(() => {
    if (topLoserData?.data?.data?.length > 0) {
      // get only 5 data
      const tableData = topLoserData.data.data
        .slice(0, 5)
        .map((item) => [
          item.symbol,
          item.change_pts,
          `${item.diff_per}%`,
          item.close,
        ]);
      setTopLoser((prev) => ({ ...prev, tableData }));
    }
  }, [topLoserData, topLoserLoading, topLoserError]);

  return (
    <ScrollView style={styles.container}>
      <StatusBar />

      <View style={styles.nepseIndexContainer}>
        <View style={styles.data}>
          <AppText style={styles.dataTitle}>Nepse</AppText>
          <AppText style={styles.dataValue}>678.51</AppText>
          <AppText style={styles.dataChange}>+3.00 (1.00%)</AppText>
        </View>
        <View style={styles.data}>
          <AppText style={styles.dataTitle}>Sensitive</AppText>
          <AppText style={styles.dataValue}>253.66</AppText>
          <AppText style={styles.dataChange}>+1.00 (2.20%)</AppText>
        </View>
        <View style={styles.data}>
          <AppText style={styles.dataTitle}>Float</AppText>
          <AppText style={styles.dataValue}>789.90</AppText>
          <AppText style={styles.dataChange}>+5.00 (5.56%)</AppText>
        </View>
      </View>

      <View style={styles.marketStatusContainer}>
        <View style={styles.marketStatus}>
          <AppText style={styles.marketStatusTitle}>Market Status</AppText>
          <View style={styles.statusContainer}>
            <View style={[styles.dot, styles.red]} />
            <AppText style={styles.marketStatusValue}>Closed</AppText>
          </View>
        </View>
        <View style={styles.marketStatusDate}>
          <AppText style={styles.marketStatusDateTitle}>May 22, 2023</AppText>
        </View>
        <View style={styles.marketStatusTime}>
          <AppText style={styles.marketStatusTimeTitle}>3:00PM</AppText>
        </View>
      </View>

      <View style={styles.indicators}>
        <View style={[styles.indicatorTile, styles.advanced]}>
          <AntDesign
            name="arrowup"
            size={20}
            color="white"
            style={styles.tileIcon}
          />
          <AppText style={styles.indicatorTitle}>Advanced</AppText>
        </View>
        <View style={[styles.indicatorTile, styles.declined]}>
          <AntDesign
            name="arrowdown"
            size={20}
            color="white"
            style={styles.tileIcon}
          />
          <AppText style={styles.indicatorTitle}>Declined</AppText>
        </View>
        <View style={[styles.indicatorTile, styles.unchanged]}>
          <AntDesign
            name="minus"
            size={20}
            color="white"
            style={styles.tileIcon}
          />
          <AppText style={styles.indicatorTitle}>Unchanged</AppText>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={(90 / 100) * Dimensions.get("window").width} // from react-native
          height={220}
          //   yAxisLabel="$"
          //   yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#7d7c39",
            backgroundGradientFrom: "#64632d",
            backgroundGradientTo: "#e0df66",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#aeae4f",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <View style={styles.gainerContainer}>
        <AppText style={styles.topGainerTitle}>Top Gainers</AppText>

        {loading ? (
          <ActivityIndicator size="large" color={colors.dark.button} />
        ) : (
          topGainer.tableData.length > 0 && (
            <Table
              borderStyle={styles.gainerTableBorder}
              style={styles.gainerTable}
            >
              <Row
                data={topGainer.tableHead}
                style={styles.head}
                textStyle={styles.headText}
              />
              <Rows data={topGainer.tableData} textStyle={styles.text} />
            </Table>
          )
        )}
      </View>

      <View style={styles.gainerContainer}>
        <AppText style={styles.topGainerTitle}>Top Loser</AppText>

        {topLoserLoading ? (
          <ActivityIndicator size="large" color={colors.dark.button} />
        ) : (
          topLoser.tableData.length > 0 && (
            <Table
              borderStyle={styles.gainerTableBorder}
              style={styles.gainerTable}
            >
              <Row
                data={topLoser.tableHead}
                style={[styles.head, styles.loserHead]}
                textStyle={styles.headText}
              />
              <Rows data={topLoser.tableData} textStyle={styles.text} />
            </Table>
          )
        )}
      </View>

      <View style={styles.marketSummaryContainer}>
        <View style={styles.marketSummary}>
          <AppText style={styles.marketSummaryTitle}>Market Summary</AppText>

          <View style={styles.marketSummaryCard}>
            <View style={styles.dataRow}>
              <AppText style={styles.dataRowTitle}>Total Turnover</AppText>
              <AppText style={styles.dataRowValue}>Rs. 1,000,000</AppText>
            </View>
            <View style={styles.dataRow}>
              <AppText style={styles.dataRowTitle}>Total Traded Shares</AppText>
              <AppText style={styles.dataRowValue}>1,000,000</AppText>
            </View>
            <View style={styles.dataRow}>
              <AppText style={styles.dataRowTitle}>Total Transaction</AppText>
              <AppText style={styles.dataRowValue}>1,000,000</AppText>
            </View>
            <View style={styles.dataRow}>
              <AppText style={styles.dataRowTitle}>Total Scrips Traded</AppText>
              <AppText style={styles.dataRowValue}>1,000,000</AppText>
            </View>
            <View style={styles.dataRow}>
              <AppText style={styles.dataRowTitle}>
                Market Capitalization
              </AppText>
              <AppText style={styles.dataRowValue}>1,000,000</AppText>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
