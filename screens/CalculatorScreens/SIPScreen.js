import { useState } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { Picker } from "@react-native-picker/picker";
import { DataTable, RadioButton } from "react-native-paper";

import AppText from "../../components/AppText";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";

import { calculate_sip_result } from "../../utils/formula";
import { PieChart } from "react-native-chart-kit";

export default function SIPScreen() {
  const [investmentPeriod, setInvestmentPeriod] = useState("MONTHLY");
  const [investmentAmount, setInvestmentAmount] = useState("0");
  const [expectedAnnualReturns, setExpectedAnnualReturns] = useState("0");
  const [investmentPeriodYears, setInvestmentPeriodYears] = useState("0");
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);

  const handleCalculate = () => {
    const data_result = calculate_sip_result(
      investmentPeriod,
      Number(investmentAmount),
      Number(expectedAnnualReturns),
      Number(investmentPeriodYears)
    );
    setResult(data_result);
    setChartData([
      {
        name: "Invested",
        value: Number(data_result?.totalAmountInvested),
        color: colors.dark.textColor,
        legendFontColor: "#7F7F7F",
        legendFontSize: totalSize(1.5),
      },
      {
        name: "Gain",
        value: Number(data_result?.totalGain),
        color: colors.dark.stockIncrease,
        legendFontColor: "#7F7F7F",
        legendFontSize: totalSize(1.5),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Investment Period</AppText>
        <Picker
          selectedValue={investmentPeriod}
          onValueChange={(itemValue, itemIndex) =>
            setInvestmentPeriod(itemValue)
          }
          dropdownIconColor={colors.dark.placeholderText}
          style={{
            color: colors.dark.textColor,
            backgroundColor: colors.dark.secondary,
            marginVertical: height(1),
          }}
        >
          <Picker.Item label="Monthly" value="MONTHLY" />
          <Picker.Item label="Quarterly" value="QUARTERLY" />
          <Picker.Item label="Semi Annually" value="SEMI_ANNUALLY" />
          <Picker.Item label="Annually" value="ANNUALLY" />
        </Picker>
      </View>

      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Investment Amount (monthly)</AppText>
        <AppInput
          placeholder="Eg: 400"
          keyboardType="numeric"
          squared
          onChangeText={(text) => setInvestmentAmount(text)}
          value={investmentAmount}
        />
      </View>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Expected Annual Returns (%)</AppText>
        <AppInput
          placeholder="Eg: 10"
          keyboardType="numeric"
          squared
          onChangeText={(text) => setExpectedAnnualReturns(text)}
          value={expectedAnnualReturns}
        />
      </View>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Investment Period (Years)</AppText>
        <AppInput
          placeholder="Eg: 10"
          keyboardType="numeric"
          squared
          onChangeText={(text) => setInvestmentPeriodYears(text)}
          value={investmentPeriodYears}
        />
      </View>

      <AppButton
        squared
        disabled={
          !Number(investmentAmount) ||
          !Number(expectedAnnualReturns) ||
          !Number(investmentPeriodYears)
        }
        onPress={handleCalculate}
      >
        Calculate
      </AppButton>

      {result && chartData && (
        <View style={styles.resultContainer}>
          <DataTable
            style={{
              paddingVertical: height(2),
            }}
          >
            <DataTable.Row>
              <DataTable.Cell>
                <AppText style={styles.dataTitle}>
                  Total Amount Invested
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.dataValue} variant="Medium">
                  Rs. {Number(result?.totalAmountInvested).toLocaleString()}
                </AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <AppText style={styles.dataTitle}>
                  Total Amount Expected
                </AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.dataValue} variant="Medium">
                  Rs. {Number(result?.totalAmountExpected).toLocaleString()}
                </AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <AppText style={styles.dataTitle}>Total Gain</AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.dataValue} variant="Medium">
                  Rs. {Number(result?.totalGain).toLocaleString()}
                </AppText>
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>
                <AppText style={styles.dataTitle}>Total Gain %</AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.dataValue} variant="Medium">
                  Rs. {Number(result?.totalGainPercentage).toLocaleString()}%
                </AppText>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
          {chartData && (
            <View style={styles.chartContainer}>
              <PieChart
                data={chartData}
                width={Dimensions.get("window").width}
                height={200}
                chartConfig={{
                  backgroundGradientFrom: "#1E2923",
                  backgroundGradientTo: "#08130D",
                  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                  strokeWidth: 1, // optional, default 3
                }}
                accessor="value"
                backgroundColor="transparent"
              />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
    paddingTop: height(1),
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputGroup: {
    marginVertical: height(1),
  },
  inputLabel: {
    color: colors.dark.textColor,
    fontSize: totalSize(1.6),
    textTransform: "uppercase",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height(0.5),
  },
  infoCard: {
    backgroundColor: colors.dark.secondary,
    padding: width(5),
    marginVertical: height(2),
    borderRadius: 10,
  },
  resultText: {
    color: colors.dark.textColor,
    fontSize: totalSize(1.8),
    textAlign: "center",
  },
});
