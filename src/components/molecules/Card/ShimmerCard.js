import React from "react";
import { View, StyleSheet } from "react-native";
import ShimmerPlaceholder from "../../Layout/Shimmer/ShimmerPlaceholder";
import { COLORS } from "../../../constants";

const ShimmerCardItem = () => {
  return (
    <View style={styles.locationContainer}>
      <ShimmerPlaceholder style={styles.locationImage} />
      <View style={styles.locationInfo}>
        <ShimmerPlaceholder style={styles.locationName} />
        <ShimmerPlaceholder style={styles.locationLocation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 5,
    shadowColor: COLORS.lightTextColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    width: 200,
  },
  locationImage: {
    height: 250,
    width: '100%',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  locationInfo: {
    padding: 10,
  },
  locationName: {
    height: 20,
    width: '80%',
    marginBottom: 5,
  },
  locationLocation: {
    height: 15,
    width: '60%',
  },
});

export default ShimmerCardItem;