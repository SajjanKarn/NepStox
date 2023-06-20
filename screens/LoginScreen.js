import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { ActivityIndicator } from "react-native-paper";
import { StatusBar } from "react-native";

// components
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";

import colors from "../config/colors";

// supabase ⚡
import { supabase } from "../config/supabase";

export default function LoginScreen() {
  const navigation = useNavigation();
  const toast = useToast();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    if (!credentials.email || !credentials.password) {
      toast.show("Please fill all the fields", {
        type: "danger",
        duration: 1000,
        placement: "top",
      });
      return;
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(credentials.email)) {
      toast.show("Please enter a valid email", {
        type: "danger",
        duration: 1000,
        placement: "top",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error)
      toast.show(error.message, {
        type: "danger",
        duration: 1000,
        placement: "top",
      });
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="default" />
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
          autoCapitalize="none"
        />
        <AppInput
          placeholder="Enter Password"
          onChangeText={(text) =>
            setCredentials({ ...credentials, password: text })
          }
          secureTextEntry={true}
        />

        <View style={{ height: height(1) }} />
        {loading ? (
          <ActivityIndicator color={colors.dark.button} size="small" />
        ) : (
          <AppButton onPress={handlePress}>Login</AppButton>
        )}

        <View style={styles.forgotPasswordContainer}>
          <AppText style={styles.forgotText}>Forgot Password?</AppText>
        </View>

        <View style={styles.forgotPasswordContainer}>
          <AppText
            style={styles.forgotText}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            Don't have an account? Register
          </AppText>
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
