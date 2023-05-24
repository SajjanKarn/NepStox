import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

import useFetch from "../../hooks/useFetch";
import colors from "../../config/colors";
import styles from "./styles/common";

const TopLosers = () => {
  const [topLoser, setTopLoser] = useState({
    tableHead: ["SN", "Symbol", "Change", "CH %", "LTP"],
    tableData: [
      ["NABIL", "10.00", "10.00", "10.00"],
      ["RBB", "10.00", "10.00", "10.00"],
      ["NIC ASIA", "10.00", "10.00", "10.00"],
      ["NICA", "10.00", "10.00", "10.00"],
    ],
  });
  const { data, loading, error } = useFetch("/nepse/top-loser");

  // useeffect for top gainer
  useEffect(() => {
    if (data?.data?.data?.length > 0) {
      // get only 5 data
      const tableData = data.data.data.map((item, index) => [
        index + 1,
        item.symbol,
        item.change_pts,
        `${item.diff_per}%`,
        item.close,
      ]);
      setTopLoser((prev) => ({ ...prev, tableData }));
    }
  }, [data, loading, error]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.dark.button} />
        </View>
      ) : (
        topLoser.tableData.length > 0 && (
          <ScrollView>
            <Table
              borderStyle={styles.gainerTableBorder}
              style={styles.gainerTable}
            >
              <Row
                data={topLoser.tableHead}
                style={styles.head}
                textStyle={styles.headText}
              />
              <Rows data={topLoser.tableData} textStyle={styles.text} />
            </Table>
          </ScrollView>
        )
      )}
    </View>
  );
};

export default TopLosers;
