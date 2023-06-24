import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useRoute } from "@react-navigation/native";

import AppText from "../components/AppText";
import Loader from "../components/Loader";
import RowCard from "../components/RowCard";

import useFetch from "../hooks/useFetch";

import styles from "../styles/CompanyDetailsScreen.styles";
import { useEffect, useState } from "react";
import {
  Area,
  Chart,
  HorizontalAxis,
  Line,
  Tooltip,
  VerticalAxis,
} from "react-native-responsive-linechart";
import { getTimeStamp, getTimeStampOfDate } from "../utils/time";

export default function CompanyDetailsScreen() {
  const { symbol } = useRoute().params;
  const [displayData, setDisplayData] = useState([]);
  const { data, loading, error } = useFetch(`/nepse/company-details/${symbol}`);
  const {
    data: chartData,
    loading: chartLoading,
    error: chartError,
  } = useFetch(
    `/nepse/graph/${symbol.toUpperCase()}/${getTimeStampOfDate(
      "2023-06-19",
      10
    )}/${getTimeStamp(new Date().getHours())}/1`
  );

  useEffect(() => {
    if (chartData?.data?.t) {
      const data = chartData?.data?.t?.map((item, index) => ({
        x: Number(item),
        y: Number(chartData?.data?.c[index]),
      }));

      setDisplayData(data);
    }
  }, [chartData]);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <StatusBar barStyle="default" />
        {loading ? (
          <Loader />
        ) : error ? (
          <AppText style={styles.errorText}>
            Sorry, something went wrong.
          </AppText>
        ) : data?.data ? (
          <>
            {/* company info card  */}
            <View style={styles.companyInfoCard}>
              <View style={styles.companyInfoCardHeader}>
                <AppText style={styles.companyInfoCardHeaderText}>
                  {data?.data?.["Company Name"]}
                </AppText>
              </View>
              <View style={styles.companyInfoCardBody}>
                <AppText style={styles.cardBodyText} variant="Medium">
                  Sector: {data?.data?.["Sector"]}
                </AppText>
                {/* <AppText style={styles.cardBodyText} variant="Medium">
                  Instrument Type: Equity
                </AppText> */}
              </View>
            </View>

            {chartLoading ? (
              <Loader />
            ) : (
              displayData.length > 0 && (
                <View style={styles.chartContainer}>
                  <Chart
                    style={{
                      height: (35 / 100) * Dimensions.get("screen").height,
                      width: "100%",
                    }}
                    data={displayData}
                    padding={{ left: 45, bottom: 20, right: 1, top: 20 }}
                    xDomain={
                      displayData.length > 0
                        ? {
                            min: displayData[0].x,
                            max: displayData[displayData.length - 1].x,
                          }
                        : { min: 0, max: 0 }
                    }
                  >
                    <VerticalAxis
                      tickCount={7}
                      theme={{
                        grid: {
                          stroke: {
                            color: colors.dark.placeholderText,
                            width: 0.5,
                          },
                        },
                        labels: {
                          formatter: (v) => v.toFixed(2),
                          label: { color: colors.dark.textColor },
                        },
                      }}
                    />
                    <HorizontalAxis
                      tickCount={5}
                      theme={{
                        grid: {
                          stroke: {
                            color: colors.dark.placeholderText,
                            width: 0.5,
                          },
                        },
                        labels: {
                          visible: false,
                          label: {
                            color: colors.dark.textColor,
                          },
                        },
                      }}
                    />
                    <Area
                      // smoothing="cubic-spline"
                      theme={{
                        gradient: {
                          from: { color: colors.dark.topGainerText },
                          to: {
                            color: colors.dark.stockIncrease,
                            opacity: 0.09,
                          },
                        },
                      }}
                    />
                    <Line
                      // smoothing="cubic-spline"
                      theme={{
                        stroke: {
                          color: colors.dark.button,
                          width: 1.3,
                          opacity: 0.7,
                        },
                        // scatter: {
                        //   default: {
                        //     width: 4,
                        //     height: 4,
                        //     rx: 2,
                        //     color: colors.dark.unchanged,
                        //   },
                        // },
                      }}
                      tension={0.3}
                      hideTooltipAfter={500}
                      tooltipComponent={
                        <Tooltip
                          theme={{
                            formatter: ({ y }) => y.toFixed(2),
                          }}
                        />
                      }
                    />
                  </Chart>
                </View>
              )
            )}

            {/* today's data  */}
            <View style={styles.todayDataContainer}>
              <AppText style={styles.headerTitle}>Today's Data</AppText>

              <RowCard
                leftText="As Of"
                rightText={data?.data?.["Last Traded On"]}
                increased={
                  Number(data?.data?.["% Change"].split(" %")[0]) > 0
                    ? true
                    : Number(data?.data?.["% Change"].split(" %")[0]) < 0
                    ? false
                    : null
                }
              />
              <RowCard
                leftText="Last Traded Price"
                rightText={`Rs. ${data?.data?.["Market Price"]}`}
                increased={
                  Number(data?.data?.["% Change"].split(" %")[0]) > 0
                    ? true
                    : Number(data?.data?.["% Change"].split(" %")[0]) < 0
                    ? false
                    : null
                }
              />
              {/* <RowCard
                leftText="Point Change"
                rightText={data?.data?.todaySharePrice[0]?.Diff}
              /> */}
              <RowCard
                leftText="Percentage Change"
                rightText={data?.data?.["% Change"]}
                increased={
                  Number(data?.data?.["% Change"].split(" %")[0]) > 0
                    ? true
                    : Number(data?.data?.["% Change"].split(" %")[0]) < 0
                    ? false
                    : null
                }
              />
              {/* <RowCard
                leftText="Previous Close"
                rightText={`Rs. ${data?.data?.todaySharePrice[0]["Prev. Close"]}`}
              /> */}
              {/* <RowCard
                leftText="Open"
                rightText={`Rs. ${data?.data?.todaySharePrice[0]?.Open}`}
              />
              <RowCard
                leftText="High"
                rightText={`Rs. ${data?.data?.todaySharePrice[0]?.High}`}
              />
              <RowCard
                leftText="Low"
                rightText={`Rs. ${data?.data?.todaySharePrice[0]?.Low}`}
              /> */}
              <RowCard
                leftText="52 Week High"
                rightText={`Rs. ${
                  data?.data?.["52 Weeks High - Low"].split("-")[0]
                }`}
              />
              <RowCard
                leftText="52 Week Low"
                rightText={`Rs. ${
                  data?.data?.["52 Weeks High - Low"].split("-")[1]
                }`}
              />
            </View>

            <View style={styles.todayDataContainer}>
              <AppText style={styles.headerTitle}>Performance Values</AppText>

              <RowCard
                leftText="EPS"
                rightText={`Rs. ${data?.data?.["EPS"]}`}
              />
              <RowCard
                leftText="PE Ratio"
                rightText={data?.data?.["P/E Ratio"]}
              />
              <RowCard
                leftText="Book Value Per Share"
                rightText={`${data?.data?.["Book Value"]}`}
              />
            </View>
          </>
        ) : (
          <AppText style={styles.errorText}>
            Sorry, no data available for this company.
          </AppText>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
