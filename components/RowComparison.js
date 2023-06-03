import { DataTable } from "react-native-paper";
import { StyleSheet } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";

export default function RowComparison({
  title = "LTP",
  value1 = "₹ 1,000",
  value2 = "₹ 1,000",
}) {
  return (
    <DataTable.Row
      style={{
        backgroundColor: colors.dark.secondary,
      }}
    >
      <DataTable.Cell>
        <AppText style={styles.tableValue}>{title}</AppText>
      </DataTable.Cell>
      <DataTable.Cell numeric>
        <AppText style={styles.tableValue} variant="Medium">
          {value1}
        </AppText>
      </DataTable.Cell>
      <DataTable.Cell numeric>
        <AppText style={styles.tableValue} variant="Medium">
          {value2}
        </AppText>
      </DataTable.Cell>
    </DataTable.Row>
  );
}

const styles = StyleSheet.create({});
