import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, FONTS, IMAGES } from "../../constants";

const ContactCard = ({ contactTitle, value, icon }) => {
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
        <View style={styles.textContainer}>
          <Text style={styles.label}>{contactTitle}</Text>
          <Text style={styles.value}>+{value}</Text>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  )
}

const styles = StyleSheet.create({
  contactDetailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginTop: 10,
  },
  contactDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  iconContainer: {
    backgroundColor: '#F0F4F8',
    borderRadius: 50,
    padding: 10,
    marginRight: 15,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#4A90E2',
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
