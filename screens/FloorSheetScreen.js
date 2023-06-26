import { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { DataTable, PaperProvider } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";

import AppText from "../components/AppText";
import Loader from "../components/Loader";
import colors from "../config/colors";
import useFetch from "../hooks/useFetch";

const numberOfItemsPerPageList = [30];

const HeaderComponent = () => (
  <DataTable.Header style={styles.tableHeader}>
    <DataTable.Title style={{ flex: 1 }}>
      <AppText style={styles.headerTitle}>SYM</AppText>
    </DataTable.Title>
    <DataTable.Title style={{ flex: 1 }}>
      <AppText style={styles.headerTitle}>BB</AppText>
    </DataTable.Title>
    <DataTable.Title style={{ flex: 1 }}>
      <AppText style={styles.headerTitle}>SB</AppText>
    </DataTable.Title>
    <DataTable.Title style={{ flex: 1 }}>
      <AppText style={styles.headerTitle}>QTY</AppText>
    </DataTable.Title>
    <DataTable.Title style={{ flex: 1 }}>
      <AppText style={styles.headerTitle}>Rate</AppText>
    </DataTable.Title>
    <DataTable.Title style={{ flex: 1.5 }} numeric>
      <AppText style={styles.headerTitle}>Amount</AppText>
    </DataTable.Title>
  </DataTable.Header>
);

export default function FloorSheetScreen() {
  const flashListRef = useRef(null);
  const {
    data: floorsheet,
    loading: floorsheetLoading,
    error: floorsheetError,
  } = useFetch("/nepse/floorsheet");
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items?.length);

  useEffect(() => {
    if (floorsheet) {
      setItems(floorsheet.data.data);
    }
  }, [floorsheet]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <DataTable style={{ flex: 1 }}>
          {floorsheetLoading ? (
            <Loader color={colors.dark.primary} />
          ) : (
            <FlashList
              ref={flashListRef}
              ListHeaderComponent={() => <HeaderComponent />}
              data={items?.slice(from, to)}
              renderItem={({ item }) => (
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell style={{ flex: 1 }}>
                    <AppText style={styles.rowText} variant="Medium">
                      {item.Symbol}
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1 }}>
                    <AppText style={styles.rowText} variant="Medium">
                      {item.Buyer}
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1 }}>
                    <AppText style={styles.rowText} variant="Medium">
                      {item.Seller}
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1 }}>
                    <AppText style={styles.rowText} variant="Medium">
                      {item.Quantity}
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1 }}>
                    <AppText style={styles.rowText} variant="Medium">
                      {item.Rate}
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1.5 }} numeric>
                    <AppText style={styles.rowText} variant="Medium">
                      {item.Amount}
                    </AppText>
                  </DataTable.Cell>
                </DataTable.Row>
              )}
              keyExtractor={(item) => item.id}
              estimatedItemSize={items?.slice(from, to).length}
              ListFooterComponent={() => (
                <DataTable.Pagination
                  page={page}
                  numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
                  onPageChange={(page) => {
                    setPage(page);
                    // scroll to top when page changes
                    flashListRef.current.scrollToOffset({ offset: 0 });
                  }}
                  label={`${from + 1}-${to} of ${items.length}`}
                  showFastPaginationControls
                  numberOfItemsPerPageList={numberOfItemsPerPageList}
                  numberOfItemsPerPage={numberOfItemsPerPage}
                  onItemsPerPageChange={onItemsPerPageChange}
                  selectPageDropdownLabel={"Rows per page"}
                  style={styles.pagination}
                />
              )}
            />
          )}
        </DataTable>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.dark.primary,
    // paddingHorizontal: width(5),
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
  tableHeader: {
    backgroundColor: colors.dark.primary,
  },
  tableRow: {
    backgroundColor: colors.dark.secondary,
  },
});
