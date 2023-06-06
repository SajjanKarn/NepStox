import { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { Picker } from "@react-native-picker/picker";
import { DataTable } from "react-native-paper";

import AppText from "../components/AppText";
import Loader from "../components/Loader";
import colors from "../config/colors";
import useFetch from "../hooks/useFetch";
import RowComparison from "../components/RowComparison";

export default function StockComparisonScreen() {
  const { data, loading, error } = useFetch(`/nepse/companies`);
  const [pickerInput1, setPickerInput1] = useState("NABIL");
  const [pickerInput2, setPickerInput2] = useState("ADBL");
  const {
    data: companyData1,
    loading: companyLoading1,
    error: companyError1,
  } = useFetch(`/nepse/company-details/${pickerInput1}`);
  const {
    data: companyData2,
    loading: companyLoading2,
    error: companyError2,
  } = useFetch(`/nepse/company-details/${pickerInput2}`);

  useEffect(() => {
    if (!companyLoading1 && !companyData1?.data) {
      ToastAndroid.show("Company 1 data not found!", ToastAndroid.SHORT);
      return;
    }
    if (!companyLoading2 && !companyData2?.data) {
      ToastAndroid.show("Company 2 data not found!", ToastAndroid.SHORT);
      return;
    }
  }, [companyData1, companyData2]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="default" />

      <View style={styles.chooseStockContainer}>
        <AppText style={styles.chooseStockText}>Choose Stock</AppText>

        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.chooseStockDropdownContainer}>
              <Picker
                selectedValue={pickerInput1}
                onValueChange={(itemValue, itemIndex) =>
                  setPickerInput1(itemValue)
                }
                dropdownIconColor={colors.dark.placeholderText}
                style={{
                  color: colors.dark.textColor,
                  backgroundColor: colors.dark.secondary,
                  marginVertical: height(1),
                }}
              >
                {data?.data?.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={item.companyname}
                    value={item.symbol}
                  />
                ))}
              </Picker>
              <AppText style={styles.versus}>v/s</AppText>
              <Picker
                selectedValue={pickerInput2}
                onValueChange={(itemValue, itemIndex) =>
                  setPickerInput2(itemValue)
                }
                dropdownIconColor={colors.dark.placeholderText}
                style={{
                  color: colors.dark.textColor,
                  backgroundColor: colors.dark.secondary,
                  marginVertical: height(1),
                }}
              >
                {data?.data?.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={item.companyname}
                    value={item.symbol}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.dataTableContainerComparison}>
              <AppText style={styles.comparisonTitle}>Today's Data</AppText>

              {companyLoading1 || companyLoading2 ? (
                <Loader />
              ) : (
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>
                      <AppText style={styles.tableHeader}> Factor </AppText>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                      <AppText style={styles.tableHeader}>
                        {companyData1?.data?.companyInfo.symbol}
                      </AppText>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                      <AppText style={styles.tableHeader}>
                        {companyData2?.data?.companyInfo.symbol}
                      </AppText>
                    </DataTable.Title>
                  </DataTable.Header>

                  <RowComparison
                    title="LTP"
                    value1={`Rs. ${
                      companyData1?.data?.todaySharePrice[0]?.Close || "N/A"
                    }`}
                    value2={`Rs. ${
                      companyData2?.data?.todaySharePrice[0]?.Close || "N/A"
                    }`}
                  />
                  <RowComparison
                    title="Change"
                    value1={
                      companyData1?.data?.todaySharePrice[0]?.Diff || "N/A"
                    }
                    value2={
                      companyData2?.data?.todaySharePrice[0]?.Diff || "N/A"
                    }
                  />
                  <RowComparison
                    title="Change %"
                    value1={`${
                      companyData1?.data?.todaySharePrice[0]?.["Diff %"] ||
                      "N/A"
                    }%`}
                    value2={`${
                      companyData2?.data?.todaySharePrice[0]?.["Diff %"] ||
                      "N/A"
                    }%`}
                  />
                  <RowComparison
                    title="Pr. Close"
                    value1={`Rs. ${
                      companyData1?.data?.todaySharePrice[0]?.["Prev. Close"] ||
                      "N/A"
                    }`}
                    value2={`Rs. ${
                      companyData2?.data?.todaySharePrice[0]?.["Prev. Close"] ||
                      "N/A"
                    }`}
                  />
                  <RowComparison
                    title="Open Price"
                    value1={`Rs. ${
                      companyData1?.data?.todaySharePrice[0]?.Open || "N/A"
                    }`}
                    value2={`Rs. ${
                      companyData2?.data?.todaySharePrice[0]?.Open || "N/A"
                    }`}
                  />
                  <RowComparison
                    title="High Price"
                    value1={`Rs. ${
                      companyData1?.data?.todaySharePrice[0]?.High || "N/A"
                    }`}
                    value2={`Rs. ${
                      companyData2?.data?.todaySharePrice[0]?.High || "N/A"
                    }`}
                  />
                  <RowComparison
                    title="Low Price"
                    value1={`Rs. ${
                      companyData1?.data?.todaySharePrice[0]?.Low || "N/A"
                    }`}
                    value2={`Rs. ${
                      companyData2?.data?.todaySharePrice[0]?.Low || "N/A"
                    }`}
                  />
                </DataTable>
              )}
            </View>
            <View style={styles.dataTableContainerComparison}>
              <AppText style={styles.comparisonTitle}>
                Performance Values
              </AppText>

              {companyLoading1 || companyLoading2 ? (
                <Loader />
              ) : (
                <DataTable>
                  <RowComparison title="EPS" value1="N/A" value2="N/A" />
                  <RowComparison title="PE Ratio" value1="N/A" value2="N/A" />
                  <RowComparison title="Book Value" value1="N/A" value2="N/A" />
                </DataTable>
              )}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
  },
  chooseStockContainer: {
    marginTop: height(2),
  },
  chooseStockText: {
    color: colors.dark.button,
    fontSize: totalSize(2),
    textTransform: "uppercase",
  },
  chooseStockDropdownContainer: {
    marginTop: height(1),
  },
  versus: {
    color: colors.dark.textColor,
    fontSize: totalSize(2),
    textTransform: "uppercase",
    textAlign: "center",
  },
  dataTableContainerComparison: {
    paddingBottom: height(5),
  },
  comparisonTitle: {
    color: colors.dark.button,
    fontSize: totalSize(2),
    textTransform: "uppercase",
    marginVertical: height(1),
  },
});
