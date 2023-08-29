import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function PrivacyPolicyScreen() {
  return (
    <WebView
      style={styles.container}
      source={{
        uri: "https://www.app-privacy-policy.com/live.php?token=lOTKzoZXcC53UfvtWmE8Rdi2gveSwQIY",
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
