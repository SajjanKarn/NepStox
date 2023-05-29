import { AntDesign } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { height, totalSize, width } from "react-native-dimension";

import AppText from "./AppText";
import colors from "../config/colors";

export default function Option({ item }) {
  return (
    <TouchableOpacity onPress={item.onPress}>
      <View style={styles.option} key={item.name}>
        <AntDesign name={item.icon} size={25} color={colors.dark.textColor} />
        <AppText style={styles.optionName} variant="Medium">
          {item.name}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: width(25),
    height: height(12),
    backgroundColor: colors.dark.secondary,
    borderRadius: 10,
  },
  optionName: {
    color: colors.dark.textColor,
    fontSize: totalSize(1.5),
    marginTop: height(1),
    textAlign: "center",
  },
});
