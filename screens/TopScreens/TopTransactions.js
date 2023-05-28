import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import Loader from "../../components/Loader";
import GainerTable from "../../components/GainerTable";
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
        <Loader />
      ) : (
        <ScrollView>
          <GainerTable
            data={topTransactions}
            headColor={colors.dark.secondary}
            numeric={false}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default TopTransactions;
