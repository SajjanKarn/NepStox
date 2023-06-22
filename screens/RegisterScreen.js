import { useState } from "react";
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { useToast } from "react-native-toast-notifications";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";

// components
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";

import colors from "../config/colors";

import { supabase } from "../config/supabase";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required").label("Email"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .label("Password"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .label("Confirm Password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleRegister = async (values) => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.show(error.message, {
          type: "danger",
          duration: 1000,
          placement: "top",
        });
        setLoading(false);
        return;
      }
      setLoading(false);

      toast.show("Account created, check your email for verification", {
        type: "success",
        duration: 3000,
        placement: "top",
      });
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error);
      toast.show("Something went wrong", {
        type: "danger",
        duration: 1000,
        placement: "top",
      });
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="default" />
      <AppText style={styles.screenTitle} variant="Bold">
        Sign Up An Account
      </AppText>

      <View style={styles.formContainer}>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          onSubmit={(values) => handleRegister(values)}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
            values,
          }) => (
            <>
              <AppInput
                placeholder="abc@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <AppText style={styles.error}>{errors.email}</AppText>
              )}
              <AppInput
                placeholder="Enter Password"
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <AppText style={styles.error}>{errors.password}</AppText>
              )}
              <AppInput
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={handleChange("confirmPassword")}
                onBlur={() => setFieldTouched("confirmPassword")}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <AppText style={styles.error}>{errors.confirmPassword}</AppText>
              )}

              <View style={{ height: height(1) }} />
              {loading ? (
                <ActivityIndicator color={colors.dark.button} size="small" />
              ) : (
                <AppButton onPress={handleSubmit}>Sign Up</AppButton>
              )}

              <View style={styles.loginTextContainer}>
                <AppText
                  style={styles.loginText}
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  Already Have an Account? Login
                </AppText>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
    paddingVertical: height(5),
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
  loginTextContainer: {
    alignItems: "center",
    marginTop: height(1),
  },
  loginText: {
    color: colors.dark.placeholderText,
    fontFamily: "Riveruta-Medium",
    fontSize: totalSize(1.8),
  },
  error: {
    color: colors.dark.topLoserText,
    fontSize: totalSize(1.5),
    marginVertical: height(0.5),
  },
});
