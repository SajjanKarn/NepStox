import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import useFetch from "../../hooks/useFetch";
import colors from "../../config/colors";
import styles from "./styles/common";
import GainerTable from "../../components/GainerTable";
import Loader from "../../components/Loader";

const TopTurnovers = () => {
  const [topTurnovers, setTopTurnovers] = useState({
    tableHead: ["Symbol", "Turnover", "LTP"],
    tableData: [
      ["NABIL", "10.00", "10.00"],
      ["RBB", "10.00", "10.00"],
      ["NIC ASIA", "10.00", "10.00"],
      ["NICA", "10.00", "10.00"],
    ],
  });
  const { data, loading, error } = useFetch("/nepse/top-turnover");

  // useeffect for top gainer
  useEffect(() => {
    if (data?.data?.data?.length > 0) {
      const tableData = data.data.data.map((item, index) => [
        item.symbol,
        item.traded_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        item.close,
      ]);
      setTopTurnovers((prev) => ({ ...prev, tableData }));
    }
  }, [data, loading, error]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <GainerTable
          data={topTurnovers}
          headColor={colors.dark.secondary}
          headScroll
        />
      )}
    </View>
  );
};

export default TopTurnovers;
