import { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
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
  console.log(companyData1);
  console.log(companyData2);

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
                  <RowComparison
                    title="LTP"
                    value1={`Rs. ${companyData1?.data?.todaySharePrice[0]?.Close}`}
                    value2={`Rs. ${companyData2?.data?.todaySharePrice[0]?.Close}`}
                  />
                  <RowComparison
                    title="Change"
                    value1={companyData1?.data?.todaySharePrice[0]?.Diff}
                    value2={companyData2?.data?.todaySharePrice[0]?.Diff}
                  />
                  <RowComparison
                    title="Change %"
                    value1={`${companyData1?.data?.todaySharePrice[0]["Diff %"]}%`}
                    value2={`${companyData2?.data?.todaySharePrice[0]["Diff %"]}%`}
                  />
                  <RowComparison
                    title="Pr. Close"
                    value1={`Rs. ${companyData1?.data?.todaySharePrice[0]["Prev. Close"]}`}
                    value2={`Rs. ${companyData2?.data?.todaySharePrice[0]["Prev. Close"]}`}
                  />
                  <RowComparison
                    title="Open Price"
                    value1={`Rs. ${companyData1?.data?.todaySharePrice[0]?.Open}`}
                    value2={`Rs. ${companyData2?.data?.todaySharePrice[0]?.Open}`}
                  />
                  <RowComparison
                    title="High Price"
                    value1={`Rs. ${companyData1?.data?.todaySharePrice[0]?.High}`}
                    value2={`Rs. ${companyData2?.data?.todaySharePrice[0]?.High}`}
                  />
                  <RowComparison
                    title="Low Price"
                    value1={`Rs. ${companyData1?.data?.todaySharePrice[0]?.Low}`}
                    value2={`Rs. ${companyData2?.data?.todaySharePrice[0]?.Low}`}
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
