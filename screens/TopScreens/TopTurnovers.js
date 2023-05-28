import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import useFetch from "../../hooks/useFetch";
import colors from "../../config/colors";
import styles from "./styles/common";
import GainerTable from "../../components/GainerTable";
import Loader from "../../components/Loader";

const TopTurnovers = () => {
  const [topTurnovers, setTopTurnovers] = useState({
    tableHead: ["SN", "Symbol", "Turnover", "LTP"],
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
        <Loader />
      ) : (
        <ScrollView>
          <GainerTable data={topTurnovers} headColor={colors.dark.secondary} />
        </ScrollView>
      )}
    </View>
  );
};

export default TopTurnovers;
