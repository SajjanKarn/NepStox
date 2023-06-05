import { ScrollView, View } from "react-native";
import { DataTable } from "react-native-paper";

import Loader from "../../components/Loader";
import useFetch from "../../hooks/useFetch";
import colors from "../../config/colors";

import styles from "./styles/common";
import AppText from "../../components/AppText";

const TopGainers = () => {
  const { data, loading, error } = useFetch("/nepse/top-gainer");

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header
          style={{
            backgroundColor: colors.dark.topGainerText,
            borderBottomWidth: 1,
            borderBottomColor: colors.dark.secondary,
          }}
        >
          <DataTable.Title>
            <AppText style={styles.tableHeader}>SN</AppText>
          </DataTable.Title>
          <DataTable.Title numeric>
            <AppText style={styles.tableHeader}>Symbol</AppText>
          </DataTable.Title>
          <DataTable.Title numeric>
            <AppText style={styles.tableHeader}>Change</AppText>
          </DataTable.Title>
          <DataTable.Title numeric>
            <AppText style={styles.tableHeader}>CH %</AppText>
          </DataTable.Title>
          <DataTable.Title numeric>
            <AppText style={styles.tableHeader}>LTP</AppText>
          </DataTable.Title>
        </DataTable.Header>
      </DataTable>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView>
          {data?.data?.data?.map((item) => (
            <DataTable.Row key={item.symbol}>
              <DataTable.Cell>
                <AppText style={styles.tableData}>{item.DT_Row_Index}</AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.tableData}>{item.symbol}</AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.tableData}>{item.change_pts}</AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.tableData}>{item.diff_per}%</AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText style={styles.tableData}>{item.close}</AppText>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TopGainers;
