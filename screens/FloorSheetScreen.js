import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { DataTable } from "react-native-paper";

import AppText from "../components/AppText";
import Loader from "../components/Loader";
import colors from "../config/colors";
import useFetch from "../hooks/useFetch";

export default function FloorSheetScreen() {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const from = page * itemsPerPage;
  const { data, loading, error } = useFetch(`/nepse/floorsheet`);
  const to = Math.min((page + 1) * itemsPerPage, data?.data?.data?.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header
          style={{
            backgroundColor: colors.dark.secondary,
          }}
        >
          <DataTable.Title>
            <AppText style={styles.headerTitle}>S.N.</AppText>
          </DataTable.Title>
          <DataTable.Title>
            <AppText style={styles.headerTitle}>Sym</AppText>
          </DataTable.Title>
          <DataTable.Title>
            <AppText style={styles.headerTitle}>BB</AppText>
          </DataTable.Title>
          <DataTable.Title>
            <AppText style={styles.headerTitle}>SB</AppText>
          </DataTable.Title>
          <DataTable.Title>
            <AppText style={styles.headerTitle}>QTY</AppText>
          </DataTable.Title>
          <DataTable.Title>
            <AppText style={styles.headerTitle}>Rate</AppText>
          </DataTable.Title>
          <DataTable.Title numeric>
            <AppText style={styles.headerTitle}>Amount</AppText>
          </DataTable.Title>
        </DataTable.Header>

        {loading ? (
          <Loader />
        ) : (
          <ScrollView>
            {data?.data?.data?.map((item, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>
                    <AppText style={styles.rowText}>{index + 1}</AppText>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <AppText style={styles.rowText}>{item.Symbol}</AppText>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <AppText style={styles.rowText}>{item.Buyer}</AppText>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <AppText style={styles.rowText}>{item.Seller}</AppText>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <AppText style={styles.rowText}>{item.Quantity}</AppText>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <AppText style={styles.rowText}>{item.Rate}</AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText style={styles.rowText}>{item.Amount}</AppText>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </ScrollView>
        )}

        {!loading && (
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(data?.data?.data?.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${data?.data?.data?.length}`}
            showFastPaginationControls
            numberOfItemsPerPageList={[20, 30, 40, 50, 100]}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            selectPageDropdownLabel="Rows per page"
          />
        )}
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
  },
  headerTitle: {
    color: colors.dark.textColor,
    fontSize: totalSize(1.3),
    textTransform: "uppercase",
  },
  rowText: {
    color: colors.dark.textColor,
    fontSize: totalSize(1.3),
    textTransform: "uppercase",
  },
});
