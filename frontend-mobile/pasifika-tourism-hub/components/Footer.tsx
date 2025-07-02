import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  Dimensions,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../src/types/navigation";

const { width: screenWidth } = Dimensions.get("window");

const snapchat = require("../assets/icons/Snapchat.png");
const instagram = require("../assets/icons/Instagram.png");
const facebook = require("../assets/icons/Facebook.png");
const tiktok = require("../assets/icons/Tik tok.png");

const samoaFlag = require("../assets/flags/sa.png");
const fijiFlag = require("../assets/flags/fi.png");
const tongaFlag = require("../assets/flags/to.png");

const colors = {
  black: "#000",
  white: "#fff",
};

export default function Footer() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const handleSocialPress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const handleCountryPress = (country: string) => {
    navigation.navigate(
      (country.charAt(0).toUpperCase() +
        country.slice(1)) as keyof DrawerParamList
    );
  };

  return (
    <View style={styles.footer}>
      <View style={styles.footerRow}>
        {/* Left: Copyright */}
        <View style={styles.leftSection}>
          <Text style={styles.copyrightText}>
            ©Pasifika Hub — All rights reserved
          </Text>
        </View>

        {/* Center: Social Media */}
        <View style={styles.centerSection}>
          <TouchableOpacity
            onPress={() => handleSocialPress("https://snapchat.com")}
          >
            <Image source={snapchat} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSocialPress("https://instagram.com")}
          >
            <Image source={instagram} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSocialPress("https://facebook.com")}
          >
            <Image source={facebook} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSocialPress("https://tiktok.com")}
          >
            <Image source={tiktok} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        {/* Right: Flags */}
        <View style={styles.rightSection}>
          <TouchableOpacity onPress={() => handleCountryPress("samoa")}>
            <Image source={samoaFlag} style={styles.flagIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCountryPress("fiji")}>
            <Image source={fijiFlag} style={styles.flagIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCountryPress("tonga")}>
            <Image source={tongaFlag} style={styles.flagIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.black,
    paddingVertical: 12,
    paddingHorizontal: 10,
    zIndex: 10,
  } as ViewStyle,

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  } as ViewStyle,

  leftSection: {
    flex: 1,
    alignItems: "flex-start",
  } as ViewStyle,

  centerSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  } as ViewStyle,

  rightSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  } as ViewStyle,

  socialIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 4,
    resizeMode: "contain",
  } as ImageStyle,

  flagIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
    resizeMode: "contain",
  } as ImageStyle,

  copyrightText: {
    color: colors.white,
    fontSize: 10,
    opacity: 0.8,
    marginRight: 20,
  } as TextStyle,
});
