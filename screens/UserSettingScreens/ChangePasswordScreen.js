import { useContext, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { Formik } from "formik";
import * as Yup from "yup";
import { useToast } from "react-native-toast-notifications";
import { ActivityIndicator, Switch } from "react-native-paper";

import AppText from "../../components/AppText";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";

import colors from "../../config/colors";

// supabase
import { supabase } from "../../config/supabase";
import AuthProvider from "../../provider/AuthProvider";

export default function ChangePasswordScreen() {
  const toast = useToast();
  const { user } = useContext(AuthProvider);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // validation schema
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required().min(6).label("Old Password"),
    newPassword: Yup.string()
      .required()
      .min(6)
      .label("New Password")
      .notOneOf(
        [Yup.ref("oldPassword"), null],
        "New Password must be different from Old Password"
      ),
    confirmPassword: Yup.string()
      .required()
      .min(6)
      .label("Confirm Password")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const onToggleSwitch = () => setShowPassword(!showPassword);

  // handle submit
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      // first verify old password is correct or not

      const { error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: values.oldPassword,
      });

      if (error) {
        toast.show("The old password is incorrect", {
          type: "danger",
          placement: "top",
          duration: 2000,
        });
        setLoading(false);
        return;
      }

      supabase.auth
        .updateUser({ password: values.newPassword })
        .then((response) => {
          if (response.error) {
            toast.show(response.error.message, {
              type: "danger",
              placement: "top",
              duration: 2000,
            });
            setLoading(false);
          } else {
            toast.show("Password Updated Successfully", {
              type: "success",
              placement: "top",
              duration: 2000,
            });
            setLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
      toast.show("Something went wrong", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <AppText style={styles.headerTitle}>Change Password</AppText>

      <View style={styles.formContainer}>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
          }) => (
            <>
              <AppInput
                placeholder="Old Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={showPassword ? false : true}
                textContentType="password"
                onBlur={() => setFieldTouched("oldPassword")}
                onChangeText={handleChange("oldPassword")}
                squared
              />
              {touched.oldPassword && errors.oldPassword && (
                <AppText style={styles.error} variant="Medium">
                  {errors.oldPassword}
                </AppText>
              )}
              <AppInput
                placeholder="New Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={showPassword ? false : true}
                textContentType="password"
                onBlur={() => setFieldTouched("newPassword")}
                onChangeText={handleChange("newPassword")}
                squared
              />
              {touched.newPassword && errors.newPassword && (
                <AppText style={styles.error} variant="Medium">
                  {errors.newPassword}
                </AppText>
              )}
              <AppInput
                placeholder="Confirm Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={showPassword ? false : true}
                textContentType="password"
                onBlur={() => setFieldTouched("confirmPassword")}
                onChangeText={handleChange("confirmPassword")}
                squared
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <AppText style={styles.error} variant="Medium">
                  {errors.confirmPassword}
                </AppText>
              )}
              <View style={styles.switchContainer}>
                <Switch
                  value={showPassword}
                  onValueChange={onToggleSwitch}
                  color={colors.dark.button}
                />
                <AppText style={styles.showPasswordText}>Show Password</AppText>
              </View>

              {loading ? (
                <ActivityIndicator
                  size="small"
                  color={colors.dark.button}
                  style={{ marginTop: height(2) }}
                />
              ) : (
                <AppButton onPress={handleSubmit} squared>
                  Change Password
                </AppButton>
              )}
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
  },
  headerTitle: {
    color: colors.dark.textColor,
    fontSize: totalSize(2.3),
    marginVertical: height(1.5),
  },
  formContainer: {
    flex: 1,
  },
  error: {
    color: colors.dark.topLoserText,
    fontSize: totalSize(1.5),
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height(1),
  },
  showPasswordText: {
    color: colors.dark.placeholderText,
    fontSize: totalSize(1.6),
    marginLeft: width(2),
  },
});
