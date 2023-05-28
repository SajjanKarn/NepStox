import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import GainerTable from "../../components/GainerTable";
import Loader from "../../components/Loader";
import useFetch from "../../hooks/useFetch";
import colors from "../../config/colors";

import styles from "./styles/common";

const TopGainers = () => {
  const [topGainer, setTopGainer] = useState({
    tableHead: ["SN", "Symbol", "Change", "CH %", "LTP"],
    tableData: [
      ["NABIL", "10.00", "10.00", "10.00"],
      ["RBB", "10.00", "10.00", "10.00"],
      ["NIC ASIA", "10.00", "10.00", "10.00"],
      ["NICA", "10.00", "10.00", "10.00"],
    ],
  });
  const { data, loading, error } = useFetch("/nepse/top-gainer");

  // useeffect for top gainer
  useEffect(() => {
    if (data?.data?.data?.length > 0) {
      const tableData = data.data.data.map((item, index) => [
        index + 1,
        item.symbol,
        item.change_pts,
        `${item.diff_per}%`,
        item.close,
      ]);
      setTopGainer((prev) => ({ ...prev, tableData }));
    }
  }, [data, loading, error]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <GainerTable
          data={topGainer}
          headColor={colors.dark.topGainerText}
          headScroll
        />
      )}
    </View>
  );
};

export default TopGainers;
