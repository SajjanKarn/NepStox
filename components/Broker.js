import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { height, totalSize } from "react-native-dimension";
import { AntDesign } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";

export default function Broker({ broker }) {
  return (
    <View key={broker.number} style={styles.brokerContainer}>
      <View style={styles.brokerInfo}>
        <AppText style={styles.brokerName}>{broker.name}</AppText>
        <AppText style={styles.brokerNumber}>
          Broker No: {broker.number}
        </AppText>
      </View>
      <TouchableOpacity
        style={styles.callBroker}
        onPress={() => Linking.openURL(`tel:${broker.contact_number}`)}
      >
        <AntDesign
          name="phone"
          size={25}
          color={colors.dark.button}
          style={styles.phone}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  brokerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: height(1.5),
    paddingBottom: height(2),
    borderBottomColor: colors.dark.placeholderText,
    borderBottomWidth: 0.3,
  },
  brokerInfo: {
    flex: 1,
  },
  brokerName: {
    fontSize: totalSize(1.8),
    color: colors.dark.textColor,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  brokerNumber: {
    fontSize: totalSize(1.5),
    marginTop: height(0.5),
    color: colors.dark.placeholderText,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  callBroker: {
    width: totalSize(6),
    height: totalSize(6),
    borderRadius: totalSize(3),
    backgroundColor: colors.dark.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  phone: {
    justifyContent: "center",
    alignItems: "center",
  },
});
