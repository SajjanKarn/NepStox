import { useRef, useState } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { Picker } from "@react-native-picker/picker";
import { DataTable, RadioButton } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import AppText from "../../components/AppText";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";

import { calculate_sip_result } from "../../utils/formula";
import { PieChart } from "react-native-chart-kit";

export default function SIPScreen() {
  const scrollRef = useRef(null);
  const [investmentPeriod, setInvestmentPeriod] = useState("MONTHLY");
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);

  const validationSchema = Yup.object().shape({
    investmentAmount: Yup.number()
      .required()
      .min(1)
      .label("Investment Amount")
      .typeError("Investment Amount must be a number"),
    expectedAnnualReturns: Yup.number()
      .required()
      .min(1)
      .label("Expected Annual Returns")
      .typeError("Expected Annual Returns must be a number"),
    investmentPeriodYears: Yup.number()
      .required()
      .min(1)
      .label("Investment Period (Years)")
      .typeError("Investment Period (Years) must be a number"),
  });

  const handleCalculate = (values) => {
    const data_result = calculate_sip_result(
      investmentPeriod,
      Number(values.investmentAmount),
      Number(values.expectedAnnualReturns),
      Number(values.investmentPeriodYears)
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
    scrollRef.current.scrollToEnd();
  };

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <Formik
        initialValues={{
          investmentAmount: "",
          expectedAnnualReturns: "",
          investmentPeriodYears: "",
        }}
        onSubmit={(values) => handleCalculate(values)}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          setFieldTouched,
          touched,
          values,
        }) => (
          <>
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
              <AppText style={styles.inputLabel}>
                Investment Amount (monthly)
              </AppText>
              <AppInput
                placeholder="Eg: 400"
                keyboardType="numeric"
                squared
                onChangeText={handleChange("investmentAmount")}
                onBlur={() => setFieldTouched("investmentAmount")}
                value={values.investmentAmount}
              />
              {touched.investmentAmount && errors.investmentAmount && (
                <AppText style={styles.error}>
                  {errors.investmentAmount}
                </AppText>
              )}
            </View>
            <View style={styles.inputGroup}>
              <AppText style={styles.inputLabel}>
                Expected Annual Returns (%)
              </AppText>
              <AppInput
                placeholder="Eg: 10"
                keyboardType="numeric"
                squared
                onChangeText={handleChange("expectedAnnualReturns")}
                onBlur={() => setFieldTouched("expectedAnnualReturns")}
                value={values.expectedAnnualReturns}
              />
              {touched.expectedAnnualReturns &&
                errors.expectedAnnualReturns && (
                  <AppText style={styles.error}>
                    {errors.expectedAnnualReturns}
                  </AppText>
                )}
            </View>
            <View style={styles.inputGroup}>
              <AppText style={styles.inputLabel}>
                Investment Period (Years)
              </AppText>
              <AppInput
                placeholder="Eg: 10"
                keyboardType="numeric"
                squared
                onChangeText={handleChange("investmentPeriodYears")}
                onBlur={() => setFieldTouched("investmentPeriodYears")}
                value={values.investmentPeriodYears}
              />
              {touched.investmentPeriodYears &&
                errors.investmentPeriodYears && (
                  <AppText style={styles.error}>
                    {errors.investmentPeriodYears}
                  </AppText>
                )}
            </View>

            <AppButton squared onPress={handleSubmit}>
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
                        Rs.{" "}
                        {Number(result?.totalAmountInvested).toLocaleString()}
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
                        Rs.{" "}
                        {Number(result?.totalAmountExpected).toLocaleString()}
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
                        Rs.{" "}
                        {Number(result?.totalGainPercentage).toLocaleString()}%
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
                        color: (opacity = 1) =>
                          `rgba(26, 255, 146, ${opacity})`,
                        strokeWidth: 1, // optional, default 3
                      }}
                      accessor="value"
                      backgroundColor="transparent"
                    />
                  </View>
                )}
              </View>
            )}
          </>
        )}
      </Formik>
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
  error: {
    color: colors.dark.topLoserText,
    fontSize: totalSize(1.5),
    marginTop: height(0.5),
  },
});
