import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { width, height, totalSize } from "react-native-dimension";

// components
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";

import colors from "../config/colors";

export default function LoginScreen() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  return (
    <ScrollView style={styles.container}>
      <AppText style={styles.screenTitle} variant="Bold">
        Login
      </AppText>

      <View style={styles.formContainer}>
        <AppInput
          placeholder="abc@example.com"
          onChangeText={(text) =>
            setCredentials({ ...credentials, email: text })
          }
          keyboardType="email-address"
        />
        <AppInput
          placeholder="Enter Password"
          onChangeText={(text) =>
            setCredentials({ ...credentials, password: text })
          }
          secureTextEntry={true}
        />

        <View style={{ height: height(1) }} />
        <AppButton onPress={() => console.log(credentials)}>Login</AppButton>

        <View style={styles.forgotPasswordContainer}>
          <AppText style={styles.forgotText}>Forgot Password?</AppText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
    paddingVertical: height(10),
  },
  screenTitle: {
    fontSize: totalSize(3),
    color: colors.dark.textColor,
  },
  formContainer: {
    marginTop: height(5),
  },
  textInput: {
    backgroundColor: colors.dark.secondary,
    color: colors.dark.textColor,
    fontSize: totalSize(2),
    paddingHorizontal: width(5),
    paddingVertical: height(2),
    borderRadius: totalSize(5),
    marginVertical: height(1),
    fontFamily: "Riveruta-Medium",
  },
  forgotPasswordContainer: {
    alignItems: "center",
    marginTop: height(1),
  },
  forgotText: {
    color: colors.dark.placeholderText,
    fontFamily: "Riveruta-Medium",
    fontSize: totalSize(1.8),
  },
});
