import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Loader({ color = colors.dark.button }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} size="large" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
