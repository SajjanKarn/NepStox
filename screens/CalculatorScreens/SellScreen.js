import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { Picker } from "@react-native-picker/picker";
import { DataTable, RadioButton } from "react-native-paper";

import AppText from "../../components/AppText";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";

import colors from "../../config/colors";
import { sell_result } from "../../utils/formula";

export default function SellScreen() {
  const [units, setUnits] = useState("0");
  const [purchasePrice, setPurchasePrice] = useState("0");
  const [sellingPrice, setSellingPrice] = useState("0");
  const [buyType, setBuyType] = useState("secondary");
  const [checked, setChecked] = useState("individual");
  const [cgt, setCgt] = useState("7.5");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (checked === "instutional") {
      setCgt("10");
      const data_result = sell_result(
        Number(units),
        Number(purchasePrice),
        Number(sellingPrice),
        10
      );

      setResult({ ...data_result });
    } else {
      const data_result = sell_result(
        Number(units),
        Number(purchasePrice),
        Number(sellingPrice),
        Number(cgt)
      );

      setResult({ ...data_result });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Buy Type</AppText>
        <Picker
          selectedValue={buyType}
          onValueChange={(itemValue, itemIndex) => setBuyType(itemValue)}
          dropdownIconColor={colors.dark.placeholderText}
          style={{
            color: colors.dark.textColor,
            backgroundColor: colors.dark.secondary,
            marginVertical: height(1),
          }}
        >
          <Picker.Item label="Secondary" value="secondary" />
          <Picker.Item label="IPO" value="ipo" />
        </Picker>
      </View>

      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Units</AppText>
        <AppInput
          placeholder="Eg: 100"
          keyboardType="numeric"
          squared
          onChangeText={(text) => setUnits(text)}
          value={units}
        />
      </View>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Purchased Price (Per Unit)</AppText>
        <AppInput
          placeholder="Eg: 2000"
          keyboardType="numeric"
          squared
          onChangeText={(text) => setPurchasePrice(text)}
          value={purchasePrice}
        />
      </View>
      <View style={styles.inputGroup}>
        <AppText style={styles.inputLabel}>Selling Price (Per Unit)</AppText>
        <AppInput
          placeholder="Eg: 2500"
          keyboardType="numeric"
          squared
          onChangeText={(text) => setSellingPrice(text)}
          value={sellingPrice}
        />
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.radioContainer}>
          <RadioButton
            value="individual"
            status={checked === "individual" ? "checked" : "unchecked"}
            onPress={() => {
              setChecked("individual");
              setResult(null);
            }}
            color={colors.dark.placeholderText}
          />
          <AppText style={styles.inputLabel}>Individual</AppText>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            value="Instutional"
            status={checked === "instutional" ? "checked" : "unchecked"}
            onPress={() => {
              setChecked("instutional");
              setResult(null);
            }}
            color={colors.dark.placeholderText}
          />
          <AppText style={styles.inputLabel}>Instutional</AppText>
        </View>
      </View>

      {checked === "individual" && (
        <View style={styles.inputGroup}>
          <AppText style={styles.inputLabel}>CGT %</AppText>
          <View style={styles.radioContainer}>
            <RadioButton
              value="7.5"
              status={cgt === "7.5" ? "checked" : "unchecked"}
              onPress={() => {
                setCgt("7.5");
                setResult(null);
              }}
              color={colors.dark.placeholderText}
            />
            <AppText style={styles.inputLabel}>7.5%</AppText>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton
              value="5"
              status={cgt === "5" ? "checked" : "unchecked"}
              onPress={() => {
                setCgt("5");
                setResult(null);
              }}
              color={colors.dark.placeholderText}
            />
            <AppText style={styles.inputLabel}>5%</AppText>
          </View>
        </View>
      )}

      <AppButton
        squared
        disabled={
          !Number(units) ||
          !Number(purchasePrice) ||
          !Number(sellingPrice) ||
          !Number(cgt)
        }
        onPress={handleCalculate}
      >
        Calculate
      </AppButton>

      {result && (
        <DataTable
          style={{
            paddingVertical: height(2),
          }}
        >
          <DataTable.Row>
            <DataTable.Cell>
              <AppText style={styles.dataTitle}>Share Amount</AppText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <AppText style={styles.dataValue} variant="Medium">
                Rs. {result?.shareAmount?.toLocaleString()}
              </AppText>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <AppText style={styles.dataTitle}>Purchased Price</AppText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <AppText style={styles.dataValue} variant="Medium">
                Rs. {result?.purchasedPrice?.toLocaleString()}
              </AppText>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <AppText style={styles.dataTitle}>SEBON Commission</AppText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <AppText style={styles.dataValue} variant="Medium">
                Rs. {result?.sebonCommission?.toLocaleString()}
              </AppText>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <AppText style={styles.dataTitle}>Broker Commission</AppText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <AppText style={styles.dataValue} variant="Medium">
                Rs. {Number(result?.brokerCommission)?.toLocaleString()}
              </AppText>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <AppText style={styles.dataTitle}>DP Fee</AppText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <AppText style={styles.dataValue} variant="Medium">
                Rs. {result?.dpFee}
              </AppText>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <AppText style={styles.dataTitle}>
                Capital Gain Tax({cgt}%)
              </AppText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <AppText style={styles.dataValue} variant="Medium">
                Rs. {result?.cgt?.toLocaleString()}
              </AppText>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <AppText style={styles.dataTitle}>Receivable Amount</AppText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <AppText style={styles.dataValue} variant="Medium">
                Rs. {Number(result?.receivableAmount)?.toLocaleString()}
              </AppText>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <AppText style={styles.dataTitle}>Profit</AppText>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <AppText style={styles.dataValue} variant="Medium">
                Rs. {result?.netProfit?.toLocaleString()}
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
    fontSize: totalSize(1.6),
    textTransform: "uppercase",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height(0.5),
  },
});
