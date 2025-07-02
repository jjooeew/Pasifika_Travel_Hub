import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../src/types/navigation";



export type Country = {
  name: string;
  image: any;
  flag: any;
  href: string;
};

export default function CountryCard({ name, image, flag, href }: Country) {
const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ThingsToDo")}
    >
      <Text style={styles.name}>{name}</Text>
      <View style={styles.imageWrap}>
        <Image source={image} style={styles.image} />
        <View style={styles.flagWrap}>
          <Image source={flag} style={styles.flag} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginVertical: 16,
  },
  name: {
    fontFamily: 'GreatVibes',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
    color: '#0B5968',
  },
  imageWrap: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 18,
  },
  flagWrap: {
    position: 'absolute',
    top: -16,
    left: -6,
    width: 64,
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  flag: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
