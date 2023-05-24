import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

import useFetch from "../../hooks/useFetch";
import colors from "../../config/colors";
import styles from "./styles/common";

const TopTurnovers = () => {
  const [topTurnovers, setTopTurnovers] = useState({
    tableHead: ["SN", "Symbol", "Tunover", "LTP"],
    tableData: [
      ["1", "NABIL", "10.00", "10.00"],
      ["2", "RBB", "10.00", "10.00"],
      ["3", "NIC ASIA", "10.00", "10.00"],
      ["4", "NICA", "10.00", "10.00"],
    ],
  });
  const { data, loading, error } = useFetch("/nepse/top-turnover");

  // useeffect for top gainer
  useEffect(() => {
    if (data?.data?.data?.length > 0) {
      // get only 5 data
      const tableData = data.data.data.map((item, index) => [
        index + 1,
        item.symbol,
        "Random",
        item.close,
      ]);
      setTopTurnovers((prev) => ({ ...prev, tableData }));
    }
  }, [data, loading, error]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.dark.button} />
        </View>
      ) : (
        topTurnovers.tableData.length > 0 && (
          <ScrollView>
            <Table
              borderStyle={styles.gainerTableBorder}
              style={styles.gainerTable}
            >
              <Row
                data={topTurnovers.tableHead}
                style={styles.head}
                textStyle={styles.headText}
              />
              <Rows data={topTurnovers.tableData} textStyle={styles.text} />
            </Table>
          </ScrollView>
        )
      )}
    </View>
  );
};

export default TopTurnovers;
