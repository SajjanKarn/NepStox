import { ScrollView, StyleSheet, View } from "react-native";
import { height, totalSize } from "react-native-dimension";
import { DataTable } from "react-native-paper";

import AppText from "../components/AppText";
import Loader from "../components/Loader";
import useFetch from "../hooks/useFetch";
import colors from "../config/colors";

export default function ForeignExchangeScreen() {
  const { data, loading, error } = useFetch(`/nepse/forex`);
  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : error ? (
        <AppText style={styles.errorText}>
          Something went wrong. Please try again later.
        </AppText>
      ) : (
        <DataTable>
          <DataTable.Header
            style={{
              backgroundColor: colors.dark.secondary,
            }}
          >
            <DataTable.Title
              style={{
                flex: 3,
              }}
            >
              <AppText style={styles.headerTitle}>Currency</AppText>
            </DataTable.Title>
            <DataTable.Title numeric>
              <AppText style={styles.headerTitle}>Unit</AppText>
            </DataTable.Title>
            <DataTable.Title numeric>
              <AppText style={styles.headerTitle}>Buy</AppText>
            </DataTable.Title>
            <DataTable.Title numeric>
              <AppText style={styles.headerTitle}>Sell</AppText>
            </DataTable.Title>
          </DataTable.Header>

          <ScrollView>
            {data?.data?.map((item) => (
              <DataTable.Row key={item.Currency}>
                <DataTable.Cell
                  style={{
                    flex: 3,
                  }}
                >
                  <AppText style={styles.title} variant="Medium">
                    {item.Currency.toUpperCase()}
                  </AppText>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <AppText style={styles.title} variant="Medium">
                    {item.Unit}
                  </AppText>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <AppText style={styles.title} variant="Medium">
                    {item.Buy}
                  </AppText>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <AppText style={styles.title} variant="Medium">
                    {item.Sell}
                  </AppText>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
        </DataTable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
  },
  errorText: {
    color: colors.dark.textColor,
    fontSize: totalSize(2),
    textAlign: "center",
    marginTop: height(2),
  },
  headerTitle: {
    color: colors.dark.textColor,
    fontSize: totalSize(1.5),
    textTransform: "uppercase",
  },
  title: {
    color: colors.dark.textColor,
    fontSize: totalSize(1.5),
  },
});
