import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { DataTable } from "react-native-paper";

import AppText from "../../components/AppText";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";

import { broker_commission } from "../../utils/formula";

import colors from "../../config/colors";

export default function BuyScreen() {
  const [units, setUnits] = useState(0);
  const [buyingPrice, setBuyingPrice] = useState(0);
  const [shareAmount, setShareAmount] = useState(0);
  const [sebonCommission, setSebonCommission] = useState(0);
  const [brokerCommission, setBrokerCommission] = useState(0);
  const [dpFee, setDpFee] = useState(0);
  const [costPerShare, setCostPerShare] = useState(0);
  const [totalPayingAmount, setTotalPayingAmount] = useState(0);

  const [visible, setVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Units</AppText>
        <AppInput
          placeholder="Eg: 100"
          keyboardType="numeric"
          squared
          onChangeText={(text) => setUnits(text)}
          value={units.toString()}
        />
      </View>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Buying Price (Per Unit)</AppText>
        <AppInput
          placeholder="Eg: 500"
          keyboardType="numeric"
          squared
          onChangeText={(text) => setBuyingPrice(text)}
          value={buyingPrice.toString()}
        />
      </View>
      <AppButton
        squared
        onPress={() => {
          const shareAmount = Number(units) * Number(buyingPrice);
          const sebonCommission = ((0.015 / 100) * shareAmount).toFixed(2);
          const brokerCommission = broker_commission(
            Number(shareAmount)
          ).toFixed(2);
          const dpFee = 25;
          const costPerShare = (
            (Number(shareAmount) +
              Number(sebonCommission) +
              Number(brokerCommission) +
              Number(dpFee)) /
            Number(units)
          ).toFixed(2);
          const totalPayingAmount = (
            Number(shareAmount) +
            Number(sebonCommission) +
            Number(brokerCommission) +
            Number(dpFee)
          ).toFixed(2);

          setShareAmount(
            shareAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
          setSebonCommission(
            sebonCommission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
          setBrokerCommission(
            brokerCommission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
          setDpFee(dpFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
          setCostPerShare(
            costPerShare.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
          setTotalPayingAmount(
            totalPayingAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );

          setVisible(true);
        }}
        disabled={Number(units) === 0 || Number(buyingPrice) === 0}
      >
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
              <AppText style={styles.dataTitle}>Broker Commission</AppText>
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
              <AppText style={styles.dataTitle}>Total Paying Amount</AppText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <AppText style={styles.dataValue} variant="Medium">
                Rs. {totalPayingAmount}
              </AppText>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
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
  inputGroup: {
    marginVertical: height(1),
  },
  inputLabel: {
    color: colors.dark.textColor,
    fontSize: totalSize(2),
    textTransform: "uppercase",
  },
});
