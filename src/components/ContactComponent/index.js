import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { COLORS, FONTS, IMAGES } from "../../constants";

const ContactCard = ({ contactTitle, value, icon, onPress }) => {
  return (
    <View style={styles.contactDetailsContainer}>
      <View style={styles.contactDetail}>
        <View style={styles.iconContainer}>
          <Image
            source={icon}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        <Pressable onPress={onPress} style={styles.textContainer}>
          <Text style={styles.label}>{contactTitle}</Text>
          <Text style={styles.value}>+{value}</Text>
        </Pressable>
      </View>
      <View style={styles.separator} />
    </View>
  )
}

const styles = StyleSheet.create({
  contactDetailsContainer: {
    backgroundColor: COLORS.textFieldColor,
    borderRadius: 15,
    marginTop: 10,
  },
  contactDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 50,
    padding: 10,
    marginRight: 15,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: COLORS.appColor,
  },

  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#8A8A8A',
    fontFamily: FONTS.poppinsRegular,
    marginBottom: 3,
  },
  value: {
    fontSize: 15,
    color: '#333333',
    fontFamily: FONTS.poppinsMedium,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },

  phoneText: {
    // fontSize: 16,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.black,
  },
})
export default ContactCard;
