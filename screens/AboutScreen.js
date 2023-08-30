import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { AntDesign, Entypo } from "@expo/vector-icons";

import AppText from "../components/AppText";
import colors from "../config/colors";

export default function AboutScreen() {
  const contacts = [
    {
      id: 1,
      title: "Email",
      icon: "mail",
      value: "nepstoxs@gmail.com",
      onPress: () =>
        Linking.openURL(
          "mailto:nepstoxs@gmail.com?subject=Mail from NepStox&body=Hi,"
        ),
    },
    {
      id: 2,
      title: "Instagram",
      icon: "instagram",
      value: "@nepstoxs",
      onPress: () => Linking.openURL("https://www.instagram.com/nepstoxs/"),
    },
    {
      id: 3,
      title: "Facebook",
      icon: "facebook-square",
      value: "www.facebook.com/nepstox",
      onPress: () => Linking.openURL("https://www.facebook.com/nepstox"),
    },
  ];
  const developers = [
    {
      id: 1,
      name: "Sajjan Karna",
      email: "karnaa787@gmail.com",
      onPress: () =>
        Linking.openURL(`mailto:karnaa787@gmail.com
        ?subject=Mail from NepStox&body=Hi Sajjan,
      `),
    },
    {
      id: 2,
      name: "Yaman Mandal",
      email: "yaman.sarabariya@gmail.com",
      onPress: () =>
        Linking.openURL(`mailto:yaman.sarabariya@gmail.com
        ?subject=Mail from NepStox&body=Hi Yaman,
      `),
    },
  ];
  const dataSources = [
    {
      id: 1,
      name: "Nepse Data",
      link: "https://www.nepalstock.com.np/",
    },
    {
      id: 4,
      name: "Neplse Alpha",
      link: "https://nepsealpha.com/",
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.productContainer}>
        <Image source={require("../assets/logo-app.png")} style={styles.logo} />
        <View style={styles.productDescription}>
          <AppText style={styles.productDescriptionText} variant="Medium">
            NepStox is a cutting-edge platform offering live trading data and
            insights for investors in Nepal. With its advanced technology and
            comprehensive market coverage, NepStox provides real-time updates on
            stock prices, market trends, and other vital information. Investors
            can access a wide range of data and analysis tools to make informed
            decisions and optimize their trading strategies.
          </AppText>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <AppText style={styles.infoContainerText}>Owned By</AppText>
        <TouchableOpacity
          style={styles.info}
          onPress={() =>
            Linking.openURL(
              "mailto:pradipbhusal126@gmail.com?subject=Mail from NepStox&body=Hi,"
            )
          }
        >
          <View style={styles.logoRight}>
            <AntDesign
              name="user"
              size={30}
              color={colors.dark.placeholderText}
            />
          </View>
          <View style={styles.left}>
            <AppText style={styles.infoContainerText}>Pradip Bhusal</AppText>
            <AppText style={styles.contactValue} variant="Medium">
              pradipbhusal26@gmail.com
            </AppText>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <AppText style={styles.infoContainerText}>Contact Us</AppText>

        {contacts.map((item) => (
          <TouchableOpacity
            style={styles.info}
            key={item.id}
            onPress={item.onPress}
          >
            <View style={styles.logoRight}>
              <AntDesign
                name={item.icon}
                size={30}
                color={colors.dark.placeholderText}
              />
            </View>
            <View style={styles.left}>
              <AppText style={styles.infoContainerText}>{item.title}</AppText>
              <AppText style={styles.contactValue} variant="Medium">
                {item.value}
              </AppText>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoContainer}>
        <AppText style={styles.infoContainerText}>Developed By</AppText>
        {developers.map((item) => (
          <TouchableOpacity
            style={styles.info}
            key={item.id}
            onPress={item.onPress}
          >
            <View style={styles.logoRight}>
              <AntDesign
                name="user"
                size={30}
                color={colors.dark.placeholderText}
              />
            </View>
            <View style={styles.left}>
              <AppText style={styles.infoContainerText}>{item.name}</AppText>
              <AppText style={styles.contactValue} variant="Medium">
                {item.email}
              </AppText>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoContainer}>
        <AppText style={styles.infoContainerText}>Data Sources</AppText>
        {dataSources.map((item) => (
          <TouchableOpacity
            style={styles.info}
            key={item.id}
            onPress={() => Linking.openURL(item.link)}
          >
            <View style={styles.logoRight}>
              <Entypo
                name="globe"
                size={30}
                color={colors.dark.placeholderText}
              />
            </View>
            <View style={styles.left}>
              <AppText style={styles.infoContainerText}>{item.name}</AppText>
              <AppText style={styles.contactValue} variant="Medium">
                {item.link}
              </AppText>
            </View>
          </TouchableOpacity>
        ))}
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
  productContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: width(50),
    height: height(20),
    resizeMode: "contain",
  },
  productName: {
    fontSize: totalSize(3),
  },
  productDescription: {
    marginVertical: height(2),
  },
  productDescriptionText: {
    fontSize: totalSize(1.5),
    color: colors.dark.textColor,
    lineHeight: 20,
  },
  infoContainer: {
    marginTop: height(2),
    paddingBottom: height(2),
  },
  infoContainerText: {
    fontSize: totalSize(2),
    color: colors.dark.textColor,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height(1),
    paddingHorizontal: width(5),
    paddingVertical: height(2),
    backgroundColor: colors.dark.bottomTab,
    borderRadius: 5,
  },
  logoRight: {},
  left: {
    marginLeft: width(5),
  },
  contactValue: {
    fontSize: totalSize(1.6),
    marginTop: height(0.7),
    color: colors.dark.placeholderText,
  },
});
