import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

import useFetch from "../../hooks/useFetch";
import colors from "../../config/colors";
import styles from "./styles/common";

const TopTransactions = () => {
  const [topTransactions, setTopTransactions] = useState({
    tableHead: ["SN", "Symbol", "Transactions", "LTP"],
    tableData: [
      ["1", "NABIL", "10.00", "10.00"],
      ["2", "RBB", "10.00", "10.00"],
      ["3", "NIC ASIA", "10.00", "10.00"],
      ["4", "NICA", "10.00", "10.00"],
    ],
  });
  const { data, loading, error } = useFetch("/nepse/top-transaction");

  // useeffect for top gainer
  useEffect(() => {
    if (data?.data?.data?.length > 0) {
      // get only 5 data
      const tableData = data.data.data.map((item, index) => [
        index + 1,
        item.symbol,
        item.no_trade.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        item.close,
      ]);
      setTopTransactions((prev) => ({ ...prev, tableData }));
    }
  }, [data, loading, error]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.dark.button} />
        </View>
      ) : (
        topTransactions.tableData.length > 0 && (
          <ScrollView>
            <Table
              borderStyle={styles.gainerTableBorder}
              style={styles.gainerTable}
            >
              <Row
                data={topTransactions.tableHead}
                style={styles.head}
                textStyle={styles.headText}
                flexArr={[1, 1, 2, 1]}
              />
              <Rows
                data={topTransactions.tableData}
                textStyle={styles.text}
                flexArr={[1, 1, 2, 1]}
              />
            </Table>
          </ScrollView>
        )
      )}
    </View>
  );
};

export default TopTransactions;
