import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import AppText from "../../components/AppText";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";
import { bonus_share, right_share } from "../../utils/formula";

export default function AdjustmentScreen() {
  const [checked, setChecked] = useState("right");
  const [paidup, setPaidup] = useState(100);
  const [result, setResult] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const validationSchema = Yup.object().shape({
    marketPrice: Yup.number()
      .required()
      .min(1)
      .label("Market Price")
      .typeError("Market Price must be a number"),
    rightSharePercentage: Yup.number()
      .required()
      .min(1)
      .label("Right Share Percentage")
      .typeError("Right Share Percentage must be a number"),
  });

  const handleCalculate = (values) => {
    if (checked === "right") {
      const result = right_share(
        Number(values.marketPrice),
        Number(values.rightSharePercentage),
        Number(paidup)
      );
      setResult(result);
      setShowResult(true);
      return;
    }

    const result = bonus_share(
      Number(values.marketPrice),
      Number(values.rightSharePercentage)
    );
    setResult(result);
    setShowResult(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{ marketPrice: "", rightSharePercentage: "" }}
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
              <View style={styles.flexRow}>
                <View style={styles.radioContainer}>
                  <RadioButton
                    value="right"
                    status={checked === "right" ? "checked" : "unchecked"}
                    onPress={() => setChecked("right")}
                    color={colors.dark.placeholderText}
                  />
                  <AppText style={styles.inputLabel}>Right Share</AppText>
                </View>
                <View style={styles.radioContainer}>
                  <RadioButton
                    value="bonus"
                    status={checked === "bonus" ? "checked" : "unchecked"}
                    onPress={() => setChecked("bonus")}
                    color={colors.dark.placeholderText}
                  />
                  <AppText style={styles.inputLabel}>Bonus Share</AppText>
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <AppText style={styles.inputLabel}>
                Market Price (Before Book Closure)
              </AppText>
              <AppInput
                placeholder="Eg: 400"
                keyboardType="numeric"
                squared
                onChangeText={handleChange("marketPrice")}
                onBlur={() => setFieldTouched("marketPrice")}
                value={values.marketPrice}
              />
              {touched.marketPrice && errors.marketPrice && (
                <AppText style={styles.errorText}>{errors.marketPrice}</AppText>
              )}
            </View>
            <View style={styles.inputGroup}>
              <AppText style={styles.inputLabel}>
                {checked === "right" ? "Right" : "Bonus"} Share Percentage
              </AppText>
              <AppInput
                placeholder="Eg: 10"
                keyboardType="numeric"
                squared
                onChangeText={handleChange("rightSharePercentage")}
                onBlur={() => setFieldTouched("rightSharePercentage")}
                value={values.rightSharePercentage}
              />
              {touched.rightSharePercentage && errors.rightSharePercentage && (
                <AppText style={styles.errorText}>
                  {errors.rightSharePercentage}
                </AppText>
              )}
            </View>

            {checked === "right" && (
              <View style={styles.inputGroup}>
                <AppText style={styles.inputLabel}>
                  Paid-up Value Per Share
                </AppText>
                <Picker
                  selectedValue={paidup}
                  onValueChange={(itemValue, itemIndex) => setPaidup(itemValue)}
                  dropdownIconColor={colors.dark.placeholderText}
                  style={{
                    color: colors.dark.textColor,
                    backgroundColor: colors.dark.secondary,
                    marginVertical: height(1),
                  }}
                >
                  <Picker.Item label="100" value={100} />
                  <Picker.Item label="10" value={10} />
                </Picker>
              </View>
            )}

            <AppButton squared onPress={handleSubmit}>
              Calculate
            </AppButton>

            {showResult && (
              <View style={styles.infoCard}>
                <AppText style={styles.resultText}>
                  The price after adjustment is {result}
                </AppText>
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
  errorText: {
    color: colors.dark.topLoserText,
    fontSize: totalSize(1.5),
    marginVertical: height(0.5),
  },
});
