import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as Yup from "yup";

import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import colors from "../config/colors";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import { ScrollView } from "react-native";
import AppButton from "../components/AppButton";
import { AntDesign } from "@expo/vector-icons";
import {
  Button,
  Modal,
  PaperProvider,
  Portal,
  Switch,
} from "react-native-paper";
import {
  getBoid,
  removeAllBoid,
  removeBoid,
  storeBoid,
} from "../config/storage";
import { useToast } from "react-native-toast-notifications";
import client from "../config/client";
import {
  checkIPOAllotment,
  checkIPOAllotmentMultiple,
} from "../utils/checkIPO";

export default function BulkIPOScreen() {
  const toast = useToast();
  const {
    data: ipoCompany,
    loading: ipoCompanyLoading,
    error: ipoCompanyError,
  } = useFetch(`/ipo/companies`);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [boids, setBoids] = useState([]);
  const [allottedStatus, setAllottedStatus] = useState("");
  const [bulkStatus, setBulkStatus] = useState([]);
  const [bulkStatusLoading, setBulkStatusLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [collapsable, setCollapsable] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: colors.dark.primary,
    padding: width(5),
    margin: width(5),
    borderRadius: 10,
  };

  const validationSchema = Yup.object().shape({
    // 16 digit boid
    boid: Yup.string()
      .required()
      .label("BOID")
      .typeError("BOID must be 16 digits")
      .matches(/^[0-9]{16}$/, "Must be exactly 16 digits"),
  });

  const addAccountValidationSchema = Yup.object().shape({
    // 16 digit boid
    boid: Yup.string()
      .required()
      .label("BOID")
      .typeError("BOID must be 16 digits")
      .matches(/^[0-9]{16}$/, "Must be exactly 16 digits"),
    username: Yup.string()
      .required()
      .label("Username")
      .typeError("Username is required"),
  });

  const handleAddAccount = () => {
    showModal();
  };

  const handleSaveBoid = async (values) => {
    try {
      const result = await storeBoid({
        boid: values.boid,
        username: values.username,
      });
      console.log(result);
      if (result) {
        setBoids(result);
        hideModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveBoid = async (boid) => {
    Alert.alert(
      "Remove Account",
      "Are you sure you want to remove this account?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },

        {
          text: "OK",
          onPress: async () => {
            try {
              const result = await removeBoid(boid);
              console.log(result);
              if (result) {
                setBoids(result);
              }
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleViewResult = async (values) => {
    if (!selectedCompany) {
      toast.show("Please select a company", {
        type: "danger",
        placement: "top",
        duration: 3000,
      });
      return;
    }
    const data = {
      company_id: selectedCompany,
      data: [
        {
          boid: values.boid,
          username: "nousername",
        },
      ],
    };

    try {
      const result = await checkIPOAllotment(values.boid, selectedCompany);
      console.log(result);
      // const result = await client.post(`/ipo/bulk-check`, data, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      if (!result?.status && result?.message.includes("Congratulation")) {
        setAllottedStatus(result.message);
      } else {
        setAllottedStatus("Not Allotted");
      }
    } catch (error) {
      toast.show("Something went wrong", {
        type: "danger",
        placement: "top",
        duration: 3000,
      });
      console.log(error);
    }
  };
  const handleBulkcheck = async () => {
    if (!selectedCompany) {
      toast.show("Please select a company", {
        type: "danger",
        placement: "top",
        duration: 3000,
      });
      return;
    }
    const data = {
      company_id: selectedCompany,
      data: boids,
    };

    try {
      setBulkStatusLoading(true);
      // const result = await client.post(`/ipo/bulk-check`, data, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // setBulkStatus(result?.data?.data);
      // setBulkStatusLoading(false);
      const result = await checkIPOAllotmentMultiple(boids, selectedCompany);
      console.log(result);
      setBulkStatus(result);
      setBulkStatusLoading(false);
    } catch (error) {
      toast.show("Something went wrong", {
        type: "danger",
        placement: "top",
        duration: 3000,
      });
      console.log(error);
      setBulkStatusLoading(false);
    }
  };

  useEffect(() => {
    const fetchBoids = async () => {
      const boids = await getBoid();
      if (boids) setBoids(boids);
    };
    fetchBoids();
  }, []);

  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <AppText style={styles.headerTitle}>Check IPO Result in Bulk</AppText>

        <Formik
          initialValues={{ boid: "" }}
          onSubmit={(values) => handleViewResult(values)}
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
              {ipoCompanyLoading ? (
                <Loader />
              ) : (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedCompany}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedCompany(itemValue)
                    }
                    style={styles.picker}
                  >
                    <Picker.Item label="Select Company" value={null} />
                    {ipoCompany &&
                      ipoCompany?.data?.map((company) => (
                        <Picker.Item
                          key={company?.id}
                          label={company?.name}
                          value={company?.id}
                        />
                      ))}
                  </Picker>
                </View>
              )}

              <AppInput
                placeholder="Enter your 16 digit BOID"
                keyboardType="numeric"
                onChangeText={handleChange("boid")}
                onBlur={() => setFieldTouched("boid")}
                value={values.boid}
                squared
              />
              {touched.boid && errors.boid && (
                <AppText style={styles.errorText}>{errors.boid}</AppText>
              )}

              {allottedStatus.length > 0 && (
                <View
                  style={{
                    ...styles.allotedStatus,
                    backgroundColor: allottedStatus.includes("Not Allotted")
                      ? colors.dark.topLoserText
                      : colors.dark.stockIncrease,
                  }}
                >
                  <AppText style={styles.allotedStatusText}>
                    {allottedStatus}
                  </AppText>
                  <AntDesign
                    name="closecircleo"
                    size={24}
                    color={colors.dark.textColor}
                    onPress={() => setAllottedStatus("")}
                  />
                </View>
              )}

              <AppButton squared onPress={handleSubmit}>
                View Result
              </AppButton>
              <AppButton squared onPress={handleBulkcheck}>
                Bulk Check
              </AppButton>
            </>
          )}
        </Formik>

        {bulkStatusLoading && <Loader />}

        {bulkStatus.length > 0 && (
          <View style={styles.bulkStatusContainer}>
            <AntDesign
              name="closecircleo"
              size={24}
              color={colors.dark.textColor}
              onPress={() => setBulkStatus([])}
            />

            {bulkStatus.map((status, index) => (
              <View
                style={{
                  ...styles.bulkStatus,
                  backgroundColor: status.message.includes("Sorry")
                    ? colors.dark.topLoserText
                    : colors.dark.stockIncrease,
                }}
                key={index}
              >
                <AppText style={styles.bulkStatusText}>
                  {status.message.includes("Sorry")
                    ? `${status.message}`
                    : `${status.message}`}
                </AppText>
              </View>
            ))}
          </View>
        )}

        <View style={styles.savedAccountContainer}>
          <AppText style={styles.savedAccountTitle}>Saved Accounts</AppText>
          <View style={styles.collapsableContainer}>
            <Button
              mode="contained"
              onPress={handleAddAccount}
              style={{ marginVertical: height(1) }}
            >
              Add Account
            </Button>
            {boids.length > 0 && (
              <View style={styles.collapsableContainer}>
                <AppText>Show Boid</AppText>
                <Switch
                  value={collapsable}
                  onValueChange={() => setCollapsable(!collapsable)}
                />
              </View>
            )}
          </View>
          {boids.map((boid) => (
            <View style={styles.savedAccount} key={boid.boid}>
              <View style={styles.infoContainer}>
                <AppText style={styles.savedAccountText}>
                  BOID:{" "}
                  {!collapsable
                    ? `${boid.boid.slice(0, 5)}***********`
                    : boid.boid}
                </AppText>
                <AppText style={styles.savedAccountText}>
                  username:{" "}
                  {!collapsable
                    ? `${boid.username.slice(0, 3)}${"*".repeat(
                        boid.username.length - 3
                      )}`
                    : boid.username}
                </AppText>
              </View>
              <AntDesign
                name="delete"
                size={24}
                color={colors.dark.topLoserText}
                style={styles.deleteIcon}
                onPress={() => handleRemoveBoid(boid.boid)}
              />
            </View>
          ))}

          {boids.length === 0 && (
            <AppText style={styles.noAccountText}>No saved account</AppText>
          )}
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <AppText style={styles.modalTitle}>Add Account</AppText>
          <Formik
            initialValues={{ boid: "", username: "" }}
            onSubmit={(values) => handleSaveBoid(values)}
            validationSchema={addAccountValidationSchema}
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
                  placeholder="Enter BOID"
                  squared
                  keyboardType="numeric"
                  onChangeText={handleChange("boid")}
                  onBlur={() => setFieldTouched("boid")}
                  value={values.boid}
                />
                {touched.boid && errors.boid && (
                  <AppText style={styles.errorText}>{errors.boid}</AppText>
                )}

                <AppInput
                  placeholder="Enter username"
                  squared
                  onChangeText={handleChange("username")}
                  onBlur={() => setFieldTouched("username")}
                  value={values.username}
                />
                {touched.username && errors.username && (
                  <AppText style={styles.errorText}>{errors.username}</AppText>
                )}

                <AppButton squared onPress={handleSubmit}>
                  Save
                </AppButton>
              </>
            )}
          </Formik>
        </Modal>
      </Portal>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
  },
  headerTitle: {
    fontSize: totalSize(2),
    marginVertical: height(2),
  },
  picker: {
    color: colors.dark.textColor,
    backgroundColor: colors.dark.secondary,
  },
  allotedStatus: {
    backgroundColor: colors.dark.secondary,
    paddingHorizontal: width(5),
    paddingVertical: height(2),
    marginVertical: height(1),
    borderRadius: width(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  allotedStatusText: {
    color: colors.dark.textColor,
    fontSize: totalSize(1.5),
    textAlign: "center",
  },
  errorText: {
    color: colors.dark.topLoserText,
    fontSize: totalSize(1.5),
    marginVertical: height(0.5),
  },

  // bulk status
  bulkStatusContainer: {
    marginVertical: height(2),
  },
  bulkStatus: {
    backgroundColor: colors.dark.secondary,
    paddingHorizontal: width(5),
    paddingVertical: height(2),
    marginVertical: height(1),
    borderRadius: width(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bulkStatusText: {
    color: colors.dark.textColor,
    fontSize: totalSize(1.5),
    textAlign: "center",
  },

  // saved account
  savedAccountContainer: {
    marginVertical: height(2),
  },
  savedAccountTitle: {
    fontSize: totalSize(2),
    marginVertical: height(2),
  },
  savedAccount: {
    backgroundColor: colors.dark.secondary,
    paddingHorizontal: width(5),
    paddingVertical: height(2),
    marginVertical: height(1),
    borderRadius: width(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  savedAccountText: {
    color: colors.dark.textColor,
    fontSize: totalSize(1.5),
    marginTop: height(0.5),
  },
  deleteIcon: {
    marginLeft: width(2),
  },
  collapsableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noAccountText: {
    color: colors.dark.topLoserText,
    fontSize: totalSize(1.5),
    marginTop: height(0.5),
    textAlign: "center",
  },

  // modal
  modalTitle: {
    fontSize: totalSize(2),
    color: colors.dark.textColor,
    marginBottom: height(1),
  },
});
