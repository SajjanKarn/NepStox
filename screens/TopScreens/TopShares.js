import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import Loader from "../../components/Loader";
import GainerTable from "../../components/GainerTable";
import useFetch from "../../hooks/useFetch";
import colors from "../../config/colors";

import styles from "./styles/common";

const TopTradedShares = () => {
  const [topShares, setTopShares] = useState({
    tableHead: ["SN", "Symbol", "Shares", "LTP"],
    tableData: [
      ["1", "NABIL", "10.00", "10.00"],
      ["2", "RBB", "10.00", "10.00"],
      ["3", "NIC ASIA", "10.00", "10.00"],
      ["4", "NICA", "10.00", "10.00"],
    ],
  });
  const { data, loading, error } = useFetch("/nepse/top-share");

  // useeffect for top gainer
  useEffect(() => {
    if (data?.data?.length > 0) {
      const tableData = data?.data?.map((item, index) => [
        index + 1,
        item.symbol,
        item.traded_quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        item.close,
      ]);
      setTopShares((prev) => ({ ...prev, tableData }));
    }
  }, [data, loading, error]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView>
          <GainerTable data={topShares} headColor={colors.dark.secondary} />
        </ScrollView>
      )}
    </View>
  );
};

export default TopTradedShares;
