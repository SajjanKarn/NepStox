import { View, ScrollView, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { FAB, TextInput } from "react-native-paper";

import AppText from "../components/AppText";

import colors from "../config/colors";
import { useState } from "react";

export default function WatchListScreen() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <AppText style={styles.searchTitle}>Search</AppText>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={colors.dark.textColor}
            onChangeText={(text) => setSearchInput(text)}
            value={searchInput}
            activeUnderlineColor={colors.dark.placeholderText}
            textColor={colors.dark.textColor}
          />
        </View>
      </View>

      <View style={styles.marketStatusContainer}>
        <View style={styles.marketStatus}>
          <AppText style={styles.marketStatusTitle}>Market Status</AppText>
          <View style={styles.statusContainer}>
            <View style={[styles.dot, styles.red]} />
            <AppText style={styles.marketStatusValue}>Closed</AppText>
          </View>
        </View>
        <View style={styles.marketStatusDate}>
          <AppText style={styles.marketStatusDateTitle}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </AppText>
        </View>
        <View style={styles.marketStatusTime}>
          <AppText style={styles.marketStatusTimeTitle}>3:00PM</AppText>
        </View>
      </View>

      <FAB
        style={styles.fab}
        size="medium"
        icon="plus"
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
    paddingTop: height(2),
  },

  // search bar
  searchContainer: {
    marginVertical: height(0.5),
  },
  searchTitle: {
    fontSize: totalSize(2),
    color: colors.dark.button,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  searchInput: {
    backgroundColor: colors.dark.secondary,
    marginVertical: height(0.5),
    borderTopEndRadius: width(1),
    borderTopStartRadius: width(1),
  },

  // market status
  marketStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height(1),
    backgroundColor: colors.dark.secondary,
    padding: width(5),
    borderRadius: width(2),
  },
  marketStatus: {
    fontSize: totalSize(2),
    color: colors.dark.button,
    textTransform: "uppercase",
    marginVertical: height(0.5),
    letterSpacing: 1,
  },
  marketStatusTitle: {
    fontSize: totalSize(1.8),
    color: colors.dark.button,
    marginVertical: height(0.5),
    textTransform: "uppercase",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height(0.7),
  },
  dot: {
    height: totalSize(1.5),
    width: totalSize(1.5),
    borderRadius: totalSize(1.5),
    marginHorizontal: width(1),
  },
  green: {
    backgroundColor: colors.dark.topGainerText,
  },
  red: {
    backgroundColor: colors.dark.topLoserText,
  },

  // fab
  fab: {
    position: "absolute",
    backgroundColor: colors.dark.button,
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
