import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { AntDesign } from "@expo/vector-icons";
import { totalSize } from "react-native-dimension";

// components
import AppText from "../components/AppText";
import GainerTable from "../components/GainerTable";
import Loader from "../components/Loader";

import colors from "../config/colors";

import useFetch from "../hooks/useFetch";

// styles
import styles from "../styles/HomeScreen.styles";
import { DataTable } from "react-native-paper";
import Gainer from "../components/Gainer";

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
  const {
    data: indices,
    loading: indicesLoading,
    error: indicesError,
  } = useFetch("/nepse/indices");
  const { data, loading, error } = useFetch("/nepse/top-gainer");
  const {
    data: topLoserData,
    loading: topLoserLoading,
    error: topLoserError,
  } = useFetch("/nepse/top-loser");
  const {
    data: marketSummary,
    loading: marketSummaryLoading,
    error: marketSummaryError,
  } = useFetch("/nepse/market-summary");
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
      <SafeAreaView>
        <StatusBar />

        <View style={styles.nepseIndexContainer}>
          {indicesLoading ? (
            <Loader />
          ) : (
            <>
              <View style={styles.data}>
                <AppText style={styles.dataTitle}>Nepse</AppText>
                <AppText style={styles.dataValue}>
                  {indices?.data?.data[0]?.Close}
                </AppText>
                <AppText
                  style={{
                    fontSize: totalSize(1.5),
                    color:
                      indices?.data?.data[0]["Point Change"] > 0
                        ? colors.dark.topGainerText
                        : colors.dark.topLoserText,
                  }}
                >
                  {indices?.data?.data[0]["Point Change"]} (
                  {indices?.data?.data[0]["% Change"]}%)
                </AppText>
              </View>
              <View style={styles.data}>
                <AppText style={styles.dataTitle}>Sensitive</AppText>
                <AppText style={styles.dataValue}>
                  {indices?.data?.data[1]?.Close}
                </AppText>
                <AppText
                  style={{
                    fontSize: totalSize(1.5),
                    color:
                      indices?.data?.data[1]["Point Change"] > 0
                        ? colors.dark.topGainerText
                        : colors.dark.topLoserText,
                  }}
                >
                  {indices?.data?.data[1]["Point Change"]} (
                  {indices?.data?.data[1]["% Change"]}%)
                </AppText>
              </View>
              <View style={styles.data}>
                <AppText style={styles.dataTitle}>Float</AppText>
                <AppText style={styles.dataValue}>
                  {indices?.data?.data[2]?.Close}
                </AppText>
                <AppText
                  style={{
                    fontSize: totalSize(1.5),
                    color:
                      indices?.data?.data[2]["Point Change"] > 0
                        ? colors.dark.topGainerText
                        : colors.dark.topLoserText,
                  }}
                >
                  {" "}
                  {indices?.data?.data[2]["Point Change"]} (
                  {indices?.data?.data[2]["% Change"]}%)
                </AppText>
              </View>
            </>
          )}
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
            <AppText style={styles.marketStatusDateTitle}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </AppText>
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
            <AppText style={styles.indicatorValue}>0</AppText>
            <AppText style={styles.indicatorTitle}>Advanced</AppText>
          </View>
          <View style={[styles.indicatorTile, styles.declined]}>
            <AntDesign
              name="arrowdown"
              size={20}
              color="white"
              style={styles.tileIcon}
            />
            <AppText style={styles.indicatorValue}>0</AppText>
            <AppText style={styles.indicatorTitle}>Declined</AppText>
          </View>
          <View style={[styles.indicatorTile, styles.unchanged]}>
            <AntDesign
              name="minus"
              size={20}
              color="white"
              style={styles.tileIcon}
            />
            <AppText style={styles.indicatorValue}>0</AppText>
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

        <Gainer
          title="Top Gainers"
          data={data?.data?.data?.slice(0, 5)}
          loading={loading}
        />

        <Gainer
          title="Top Losers"
          data={topLoserData?.data?.data?.slice(0, 5)}
          loading={topLoserLoading}
          headerColor={colors.dark.topLoserText}
        />

        <View style={styles.marketSummaryContainer}>
          {marketSummaryLoading ? (
            <Loader />
          ) : marketSummaryError ? (
            <AppText>Error Loading Data</AppText>
          ) : (
            <View style={styles.marketSummary}>
              <AppText style={styles.marketSummaryTitle}>
                Market Summary
              </AppText>

              <View style={styles.marketSummaryCard}>
                <View style={styles.dataRow}>
                  <AppText style={styles.dataRowTitle}>Total Turnover</AppText>
                  <AppText style={styles.dataRowValue}>
                    Rs. {marketSummary?.data["Total Turnovers (Rs.)"]}
                  </AppText>
                </View>
                <View style={styles.dataRow}>
                  <AppText style={styles.dataRowTitle}>
                    Total Traded Shares
                  </AppText>
                  <AppText style={styles.dataRowValue}>
                    {marketSummary?.data["Total Traded Shares "]}
                  </AppText>
                </View>
                <View style={styles.dataRow}>
                  <AppText style={styles.dataRowTitle}>
                    Total Transaction
                  </AppText>
                  <AppText style={styles.dataRowValue}>
                    {marketSummary?.data["Total Transaction "]}
                  </AppText>
                </View>
                <View style={styles.dataRow}>
                  <AppText style={styles.dataRowTitle}>
                    Total Scrips Traded
                  </AppText>
                  <AppText style={styles.dataRowValue}>
                    {marketSummary?.data["Total Scrips Traded "]}
                  </AppText>
                </View>
                <View style={styles.dataRow}>
                  <AppText style={styles.dataRowTitle}>
                    Market Capitalization
                  </AppText>
                  <AppText style={styles.dataRowValue}>
                    {
                      marketSummary?.data["Total Market Cap (Rs.)"].split(
                        "Millions"
                      )[0]
                    }
                  </AppText>
                </View>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
