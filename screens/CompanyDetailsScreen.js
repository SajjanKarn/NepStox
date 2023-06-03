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

export default function CompanyDetailsScreen() {
  const { symbol } = useRoute().params;
  const { data, loading, error } = useFetch(`/nepse/company-details/${symbol}`);

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
                  {data?.data?.companyInfo?.companyName}
                </AppText>
              </View>
              <View style={styles.companyInfoCardBody}>
                <AppText style={styles.cardBodyText} variant="Medium">
                  Sector: {data?.data?.companyInfo?.sector}
                </AppText>
                <AppText style={styles.cardBodyText} variant="Medium">
                  Instrument Type: Equity
                </AppText>
              </View>
            </View>

            {/* chart  */}
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
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
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

            {/* today's data  */}
            <View style={styles.todayDataContainer}>
              <AppText style={styles.headerTitle}>Today's Data</AppText>

              <RowCard
                leftText="As Of"
                rightText={new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "Asia/Kathmandu",
                  hour: "numeric",
                  minute: "numeric",
                })}
              />
              <RowCard
                leftText="Last Traded Price"
                rightText={`Rs. ${data?.data?.todaySharePrice[0]?.Close}`}
              />
              <RowCard
                leftText="Point Change"
                rightText={data?.data?.todaySharePrice[0]?.Diff}
              />
              <RowCard
                leftText="Percentage Change"
                rightText={`${data?.data?.todaySharePrice[0]["Diff %"]} %`}
              />
              <RowCard
                leftText="Previous Close"
                rightText={`Rs. ${data?.data?.todaySharePrice[0]["Prev. Close"]}`}
              />
              <RowCard
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
              />
              <RowCard
                leftText="52 Week High"
                rightText={`Rs. ${data?.data?.todaySharePrice[0]["52 Weeks High"]}`}
              />
              <RowCard
                leftText="52 Week Low"
                rightText={`Rs. ${data?.data?.todaySharePrice[0]["52 Weeks Low"]}`}
              />
            </View>

            <View style={styles.todayDataContainer}>
              <AppText style={styles.headerTitle}>Performance Values</AppText>

              <RowCard
                leftText="EPS"
                rightText={`Rs. ${data?.data?.todaySharePrice[0]?.Close}`}
              />
              <RowCard
                leftText="PE Ratio"
                rightText={data?.data?.todaySharePrice[0]?.Diff}
              />
              <RowCard
                leftText="Book Value Per Share"
                rightText={`${data?.data?.todaySharePrice[0]["Diff %"]} %`}
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
