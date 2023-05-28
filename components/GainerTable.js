import { ScrollView, StyleSheet, View } from "react-native";
import { DataTable } from "react-native-paper";
import { height, totalSize, width } from "react-native-dimension";

import AppText from "./AppText";
import colors from "../config/colors";

export default function GainerTable({
  title,
  data,
  headColor,
  headScroll = false,
  loading = false,
}) {
  return (
    <View style={styles.dataTable}>
      {title && <AppText style={styles.topGainerTitle}>{title}</AppText>}
      <DataTable>
        <DataTable.Header
          style={[
            styles.tableHeader,
            {
              backgroundColor: headColor ? headColor : colors.dark.topLoserText,
            },
          ]}
        >
          {data?.tableHead?.map((item, index) => (
            <DataTable.Title
              key={index}
              style={styles.tableHeadText}
              numeric={index !== 0}
            >
              <AppText style={styles.tableHeadText}>{item}</AppText>
            </DataTable.Title>
          ))}
        </DataTable.Header>

        {headScroll ? (
          <ScrollView>
            {data?.tableData?.map((item, index) => (
              <DataTable.Row key={index} style={styles.tableRow}>
                {item.map((item, index) => (
                  <DataTable.Cell key={index} numeric={index !== 0}>
                    <AppText style={styles.tableRowText} variant="Medium">
                      {item}
                    </AppText>
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </ScrollView>
        ) : (
          data?.tableData?.map((item, index) => (
            <DataTable.Row key={index} style={styles.tableRow}>
              {item.map((item, index) => (
                <DataTable.Cell key={index} numeric={index !== 0}>
                  <AppText style={styles.tableRowText} variant="Medium">
                    {item}
                  </AppText>
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          ))
        )}
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  dataTable: {
    marginBottom: height(2),
  },
  topGainerTitle: {
    fontSize: totalSize(2),
    marginBottom: height(2),
  },
  tableHeader: {
    backgroundColor: colors.dark.topLoserText,
    borderTopStartRadius: width(2),
    borderTopEndRadius: width(2),
    borderBottomColor: colors.dark.placeholderText,
    borderBottomWidth: 0.5,
  },
  tableHeaderGainer: {
    backgroundColor: colors.dark.topGainerText,
  },
  tableRow: {
    backgroundColor: colors.dark.secondary,
    borderBottomColor: colors.dark.placeholderText,
    borderBottomWidth: 1,
  },
  tableHeadText: {
    fontSize: totalSize(1.5),
  },
});
