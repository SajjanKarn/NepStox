import { DataTable } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { height, totalSize } from "react-native-dimension";

import AppText from "./AppText";
import colors from "../config/colors";
import Loader from "./Loader";
import { useNavigation } from "@react-navigation/native";

export default function Gainer({
  title = "Gainer",
  data,
  loading,
  headerColor = false,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.tableContainer}>
      <AppText style={styles.tableHeaderTitle}>{title}</AppText>
      {loading ? (
        <Loader />
      ) : (
        <DataTable style={styles.table}>
          <DataTable.Header
            style={[
              styles.tableHeader,
              {
                backgroundColor: headerColor
                  ? headerColor
                  : colors.dark.topGainerText,
              },
            ]}
          >
            <DataTable.Title>
              <AppText style={styles.tableTitle}>Symbol</AppText>
            </DataTable.Title>
            <DataTable.Title numeric>
              <AppText style={styles.tableTitle}>Change</AppText>
            </DataTable.Title>
            <DataTable.Title numeric>
              <AppText style={styles.tableTitle}>CH %</AppText>
            </DataTable.Title>
            <DataTable.Title numeric>
              <AppText style={styles.tableTitle}>LTP</AppText>
            </DataTable.Title>
          </DataTable.Header>

          {data?.map((item) => (
            <DataTable.Row
              key={item.symbol}
              style={styles.tableRow}
              onPress={() =>
                navigation.navigate("CompanyDetailsScreen", {
                  symbol: item.symbol,
                })
              }
            >
              <DataTable.Cell>
                <AppText style={styles.tableData}>{item.symbol}</AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.tableData}>{item.change_pts}</AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.tableData}>{item.diff_per}</AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.tableData}>{item.close}</AppText>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    marginVertical: height(2),
  },
  tableHeaderTitle: {
    fontSize: totalSize(2),
    color: colors.dark.textColor,
    marginBottom: height(1),
  },
  tableHeader: {
    backgroundColor: colors.dark.topGainerText,
    borderBottomColor: colors.dark.secondary,
    borderTopEndRadius: totalSize(1),
    borderTopStartRadius: totalSize(1),
  },
  tableTitle: {
    fontSize: totalSize(1.5),
  },
  tableRow: {
    backgroundColor: colors.dark.secondary,
  },
  tableData: {
    fontSize: totalSize(1.6),
  },
});
