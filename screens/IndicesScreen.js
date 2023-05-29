import { View, StyleSheet, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import { totalSize } from "react-native-dimension";

import AppText from "../components/AppText";
import Loader from "../components/Loader";

import colors from "../config/colors";
import useFetch from "../hooks/useFetch";

export default function IndicesScreen() {
  const {
    data: indices,
    loading: indicesLoading,
    error: indicesError,
  } = useFetch(`/nepse/indices`);

  const {
    data: subIndices,
    loading: subIndicesLoading,
    error: subIndicesError,
  } = useFetch(`/nepse/subindices`);

  return (
    <ScrollView style={styles.container}>
      {/* data table for indices */}
      <DataTable>
        <DataTable.Header
          style={{
            backgroundColor: colors.dark.secondary,
          }}
        >
          <DataTable.Title
            style={{
              flex: 2,
            }}
          >
            <AppText style={styles.tableHeadText}>Indices</AppText>
          </DataTable.Title>
          <DataTable.Title numeric>
            <AppText style={styles.tableHeadText}>Value</AppText>
          </DataTable.Title>
          <DataTable.Title numeric>
            <AppText style={styles.tableHeadText}>Change</AppText>
          </DataTable.Title>
          <DataTable.Title numeric>
            <AppText style={styles.tableHeadText}>CH %</AppText>
          </DataTable.Title>
        </DataTable.Header>

        {indicesLoading ? (
          <View style={styles.loaderContainer}>
            <Loader />
          </View>
        ) : (
          indices?.data?.data?.map((index) => (
            <DataTable.Row
              key={index.Index}
              style={{
                backgroundColor:
                  index["% Change"] > 0
                    ? colors.dark.topGainerText
                    : colors.dark.stockDecrease,
              }}
            >
              <DataTable.Cell
                style={{
                  flex: 2,
                }}
              >
                <AppText>{index["Index"].split("Index")[0]}</AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText>{index["Close"]}</AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText>{index["Point Change"]}</AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText>{index["% Change"]}</AppText>
              </DataTable.Cell>
            </DataTable.Row>
          ))
        )}
      </DataTable>

      {/* data table for sub indices */}
      <DataTable>
        <DataTable.Header
          style={{
            backgroundColor: colors.dark.secondary,
          }}
        >
          <DataTable.Title
            style={{
              flex: 2,
            }}
          >
            <AppText style={styles.tableHeadText}>Sub Indices</AppText>
          </DataTable.Title>
          <DataTable.Title numeric>
            <AppText style={styles.tableHeadText}>Value</AppText>
          </DataTable.Title>
          <DataTable.Title numeric>
            <AppText style={styles.tableHeadText}>Change</AppText>
          </DataTable.Title>
          <DataTable.Title numeric>
            <AppText style={styles.tableHeadText}>CH %</AppText>
          </DataTable.Title>
        </DataTable.Header>

        {subIndicesLoading ? (
          <View style={styles.loaderContainer}>
            <Loader />
          </View>
        ) : (
          subIndices?.data?.data?.map((index) => (
            <DataTable.Row
              key={index["Sub Index"]}
              style={{
                backgroundColor:
                  index["% Change"] > 0
                    ? colors.dark.topGainerText
                    : colors.dark.stockDecrease,
              }}
            >
              <DataTable.Cell
                style={{
                  flex: 2,
                }}
              >
                <AppText>{index["Sub Index"]}</AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText>{index["Close"]}</AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText>{index["Point"]}</AppText>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AppText>{index["% Change"]}</AppText>
              </DataTable.Cell>
            </DataTable.Row>
          ))
        )}
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
  },
  tableHeadText: {
    color: colors.dark.textColor,
    fontSize: totalSize(1.5),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
