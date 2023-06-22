import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { DataTable } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import AppText from "../../components/AppText";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";

import {
  broker_commission,
  cost_per_share,
  sebon_commission,
  share_amount,
  total_paying_amount,
} from "../../utils/formula";

import colors from "../../config/colors";

export default function BuyScreen() {
  const [shareAmount, setShareAmount] = useState(0);
  const [sebonCommission, setSebonCommission] = useState(0);
  const [brokerCommission, setBrokerCommission] = useState(0);
  const [dpFee, setDpFee] = useState(0);
  const [costPerShare, setCostPerShare] = useState(0);
  const [totalPayingAmount, setTotalPayingAmount] = useState(0);

  const [visible, setVisible] = useState(false);

  const validationSchema = Yup.object().shape({
    units: Yup.number()
      .required()
      .min(1)
      .label("Units")
      .typeError("Units must be a number"),
    buyingPrice: Yup.number()
      .required()
      .min(1)
      .label("Buying Price")
      .typeError("Buying Price must be a number"),
  });

  const handleOnSubmit = (values) => {
    const shareAmount = share_amount(
      Number(values.units),
      Number(values.buyingPrice)
    );
    const sebonCommission = Number(sebon_commission(Number(shareAmount)));
    const brokerCommission = Number(broker_commission(Number(shareAmount)));
    const dpFee = 25;
    const costPerShare = Number(
      cost_per_share(
        Number(shareAmount),
        Number(sebonCommission),
        Number(brokerCommission),
        Number(dpFee),
        Number(values.units)
      )
    );

    const totalPayingAmount = Number(
      total_paying_amount(
        Number(shareAmount),
        Number(sebonCommission),
        Number(brokerCommission),
        Number(dpFee)
      )
    );

    setShareAmount(shareAmount.toLocaleString());
    setSebonCommission(sebonCommission.toLocaleString());
    setBrokerCommission(brokerCommission.toLocaleString());
    setDpFee(dpFee.toLocaleString());
    setCostPerShare(costPerShare.toLocaleString());
    setTotalPayingAmount(totalPayingAmount.toLocaleString());

    setVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{ units: "", buyingPrice: "" }}
        onSubmit={(values) => {
          handleOnSubmit(values);
        }}
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
              <AppText style={styles.inputLabel}>Units</AppText>
              <AppInput
                placeholder="Eg: 100"
                keyboardType="numeric"
                squared
                onChangeText={handleChange("units")}
                onBlur={() => setFieldTouched("units")}
                value={values.units}
              />
              {touched.units && errors.units && (
                <AppText style={styles.error}>{errors.units}</AppText>
              )}
            </View>
            <View style={styles.inputGroup}>
              <AppText style={styles.inputLabel}>
                Buying Price (Per Unit)
              </AppText>
              <AppInput
                placeholder="Eg: 500"
                keyboardType="numeric"
                squared
                onChangeText={handleChange("buyingPrice")}
                onBlur={() => setFieldTouched("buyingPrice")}
                value={values.buyingPrice}
              />
              {touched.buyingPrice && errors.buyingPrice && (
                <AppText style={styles.error}>{errors.buyingPrice}</AppText>
              )}
            </View>
            <AppButton squared onPress={handleSubmit}>
              Calculate
            </AppButton>

            {visible && (
              <DataTable>
                <DataTable.Row>
                  <DataTable.Cell>
                    <AppText style={styles.dataTitle}>Share Amount</AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText style={styles.dataValue} variant="Medium">
                      Rs. {shareAmount}
                    </AppText>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>
                    <AppText style={styles.dataTitle}>SEBON Commission</AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText style={styles.dataValue} variant="Medium">
                      Rs. {sebonCommission}
                    </AppText>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>
                    <AppText style={styles.dataTitle}>
                      Broker Commission
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText style={styles.dataValue} variant="Medium">
                      Rs. {brokerCommission}
                    </AppText>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>
                    <AppText style={styles.dataTitle}>DP Fee</AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText style={styles.dataValue} variant="Medium">
                      Rs. {dpFee}
                    </AppText>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>
                    <AppText style={styles.dataTitle}>Cost Per Share</AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText style={styles.dataValue} variant="Medium">
                      Rs. {costPerShare}
                    </AppText>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>
                    <AppText style={styles.dataTitle}>
                      Total Paying Amount
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText style={styles.dataValue} variant="Medium">
                      Rs. {totalPayingAmount}
                    </AppText>
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
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
  inputGroup: {
    marginVertical: height(1),
  },
  inputLabel: {
    color: colors.dark.textColor,
    fontSize: totalSize(2),
    textTransform: "uppercase",
  },
  error: {
    color: colors.dark.topLoserText,
    fontSize: totalSize(1.5),
    marginTop: height(0.5),
  },
});
